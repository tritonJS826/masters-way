package services

import (
	"context"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/samber/lo"
)

type ProfileSettingRepository interface {
	GetProfileSettingUserId(ctx context.Context, userUuid pgtype.UUID) (db.GetProfileSettingUserIdRow, error)
	UpdateProfileSettingByUserId(ctx context.Context, arg db.UpdateProfileSettingByUserIdParams) (db.UpdateProfileSettingByUserIdRow, error)
	RefillCoinsForAll(ctx context.Context) ([]db.RefillCoinsForAllRow, error)
	ReduceCoinsByUserId(ctx context.Context, args db.ReduceCoinsByUserIdParams) (db.ReduceCoinsByUserIdRow, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type ProfileSettingService struct {
	pool                     *pgxpool.Pool
	profileSettingRepository ProfileSettingRepository
}

func NewProfileSettingService(pool *pgxpool.Pool, profileSettingRepository ProfileSettingRepository) *ProfileSettingService {
	return &ProfileSettingService{pool, profileSettingRepository}
}

func (ps *ProfileSettingService) GetProfileSettingUserId(ctx context.Context, userUuid pgtype.UUID) (*schemas.ProfileSetting, error) {
	tx, err := ps.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	var profileSettingRepositoryTx ProfileSettingRepository = ps.profileSettingRepository.WithTx(tx)

	profileSetting, err := profileSettingRepositoryTx.GetProfileSettingUserId(ctx, userUuid)
	if err != nil {
		return nil, err
	}

	tx.Commit(ctx)

	return &schemas.ProfileSetting{
		Uuid:           util.ConvertPgUUIDToUUID(profileSetting.Uuid).String(),
		PricingPlan:    string(profileSetting.PricingPlan),
		Coins:          profileSetting.Coins,
		ExpirationDate: profileSetting.ExpirationDate.Time.Format(util.DEFAULT_STRING_LAYOUT),
	}, nil
}

type UpdateProfileSettingByUserIdParams struct {
	userUuid    string
	Coins       *int32
	PricingPlan *string
	// amount months - usually 1, maybe 12 for a year subscription
	ExpirationMonths *int32
}

func (ps *ProfileSettingService) UpdateProfileSettingByUserId(ctx context.Context, params *UpdateProfileSettingByUserIdParams) (*schemas.ProfileSetting, error) {
	var expirationTime pgtype.Timestamp
	if params.ExpirationMonths != nil {
		expirationDuration := time.Duration(*params.ExpirationMonths) * 30 * 24 * time.Hour
		expirationTimeRaw := time.Now().Add(expirationDuration)
		expirationTime = pgtype.Timestamp{Time: expirationTimeRaw, Valid: params.ExpirationMonths != nil}
	}

	updateProjectParams := db.UpdateProfileSettingByUserIdParams{
		UserUuid:       pgtype.UUID{Bytes: uuid.MustParse(params.userUuid), Valid: true},
		Coins:          pgtype.Int4{Int32: *params.Coins, Valid: params.Coins != nil},
		PricingPlan:    db.NullPricingPlanType{PricingPlanType: db.PricingPlanType(*params.PricingPlan), Valid: params.PricingPlan != nil},
		ExpirationDate: expirationTime,
	}
	profileSetting, err := ps.profileSettingRepository.UpdateProfileSettingByUserId(ctx, updateProjectParams)
	if err != nil {
		return nil, err
	}

	return &schemas.ProfileSetting{
		Uuid:           util.ConvertPgUUIDToUUID(profileSetting.Uuid).String(),
		PricingPlan:    string(profileSetting.PricingPlan),
		Coins:          profileSetting.Coins,
		ExpirationDate: profileSetting.ExpirationDate.Time.Format(util.DEFAULT_STRING_LAYOUT),
	}, nil
}

type RefillCoinsResponse struct {
	Uuid           string
	PricingPlan    string
	Coins          int32
	ExpirationDate string
}

func (ps *ProfileSettingService) RefillCoins(ctx context.Context) ([]RefillCoinsResponse, error) {
	tx, err := ps.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	var profileSettingRepositoryTx ProfileSettingRepository = ps.profileSettingRepository.WithTx(tx)

	refilledProfilesDb, err := profileSettingRepositoryTx.RefillCoinsForAll(ctx)
	if err != nil {
		return nil, err
	}

	tx.Commit(ctx)

	refilledProfiles := lo.Map(refilledProfilesDb, func(profile db.RefillCoinsForAllRow, _ int) RefillCoinsResponse {
		return RefillCoinsResponse{
			Uuid:           util.ConvertPgUUIDToUUID(profile.Uuid).String(),
			PricingPlan:    string(profile.PricingPlan),
			Coins:          profile.Coins,
			ExpirationDate: profile.ExpirationDate.Time.Format(util.DEFAULT_STRING_LAYOUT),
		}
	})

	return refilledProfiles, nil
}

type ReduceCoinsByUserIdParams struct {
	UserUuid string
	Coins    int32
}

func (ps *ProfileSettingService) ReduceCoinsByUserId(ctx context.Context, params ReduceCoinsByUserIdParams) (*RefillCoinsResponse, error) {
	tx, err := ps.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	var profileSettingRepositoryTx ProfileSettingRepository = ps.profileSettingRepository.WithTx(tx)

	refilledProfileDb, err := profileSettingRepositoryTx.ReduceCoinsByUserId(ctx, db.ReduceCoinsByUserIdParams{
		OwnerUuid: pgtype.UUID{Bytes: uuid.MustParse(params.UserUuid), Valid: true},
		Coins:     params.Coins,
	})
	if err != nil {
		return nil, err
	}

	tx.Commit(ctx)

	refilledProfile := &RefillCoinsResponse{
		Uuid:           util.ConvertPgUUIDToUUID(refilledProfileDb.Uuid).String(),
		PricingPlan:    string(refilledProfileDb.PricingPlan),
		Coins:          refilledProfileDb.Coins,
		ExpirationDate: refilledProfileDb.ExpirationDate.Time.Format(util.DEFAULT_STRING_LAYOUT),
	}

	return refilledProfile, nil
}
