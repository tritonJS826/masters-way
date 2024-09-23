package services

import (
	"context"
	"fmt"
	db "mwserver/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type LimitNameType string

const (
	MaxOwnWays           LimitNameType = "Max own ways"
	MaxPrivateWays       LimitNameType = "Max private ways"
	MaxMentoringsWays    LimitNameType = "Max mentorings ways"
	MaxUserTags          LimitNameType = "Max user tags"
	MaxCustomCollections LimitNameType = "Max custom collections"
	MaxCompositeWayDeps  LimitNameType = "Max composite way deps"
	MaxDayReports        LimitNameType = "Max day reports"
)

var limitMap = map[LimitNameType]map[db.PricingPlanType]uint16{
	MaxOwnWays: {
		db.PricingPlanTypeFree:    10,
		db.PricingPlanTypeStarter: 20,
		db.PricingPlanTypePro:     30,
	},
	MaxPrivateWays: {
		db.PricingPlanTypeFree:    1,
		db.PricingPlanTypeStarter: 10,
		db.PricingPlanTypePro:     10,
	},
	MaxMentoringsWays: {
		db.PricingPlanTypeFree:    3,
		db.PricingPlanTypeStarter: 20,
		db.PricingPlanTypePro:     30,
	},
	MaxUserTags: {
		db.PricingPlanTypeFree:    3,
		db.PricingPlanTypeStarter: 5,
		db.PricingPlanTypePro:     5,
	},
	MaxCustomCollections: {
		db.PricingPlanTypeFree:    4,
		db.PricingPlanTypeStarter: 8,
		db.PricingPlanTypePro:     10,
	},
	MaxCompositeWayDeps: {
		db.PricingPlanTypeFree:    2,
		db.PricingPlanTypeStarter: 3,
		db.PricingPlanTypePro:     3,
	},
	MaxDayReports: {
		db.PricingPlanTypeFree:    190,
		db.PricingPlanTypeStarter: 360,
		db.PricingPlanTypePro:     1000,
	},
}

type ILimitRepository interface {
	GetOwnWaysCountByUserId(ctx context.Context, userUuid pgtype.UUID) (int64, error)
	GetPrivateWaysCountByUserId(ctx context.Context, userUuid pgtype.UUID) (int64, error)
	GetMentoringWaysCountByUserId(ctx context.Context, userUuid pgtype.UUID) (int64, error)
	GetTagsCountByUserId(ctx context.Context, userUuid pgtype.UUID) (int64, error)
	GetWayCollectionsCountByUserId(ctx context.Context, userUuid pgtype.UUID) (int64, error)
	GetDayReportsCountByWayId(ctx context.Context, wayUuid pgtype.UUID) (int64, error)
	GetPricingPlanByUserId(ctx context.Context, userUuid pgtype.UUID) (db.PricingPlanType, error)
}

type LimitService struct {
	limitRepository ILimitRepository
}

func NewLimitService(db *db.Queries) *LimitService {
	return &LimitService{db}
}

type LimitReachedParams struct {
	LimitName LimitNameType
	UserID    string
	WayID     *string
}

func (ls *LimitService) CheckIsLimitReachedByPricingPlan(ctx context.Context, params *LimitReachedParams) error {
	var count int64
	var err error

	switch params.LimitName {
	case MaxOwnWays:
		count, err = ls.limitRepository.GetOwnWaysCountByUserId(ctx, pgtype.UUID{Bytes: uuid.MustParse(params.UserID), Valid: true})
	case MaxPrivateWays:
		count, err = ls.limitRepository.GetPrivateWaysCountByUserId(ctx, pgtype.UUID{Bytes: uuid.MustParse(params.UserID), Valid: true})
	case MaxMentoringsWays:
		count, err = ls.limitRepository.GetMentoringWaysCountByUserId(ctx, pgtype.UUID{Bytes: uuid.MustParse(params.UserID), Valid: true})
	case MaxUserTags:
		count, err = ls.limitRepository.GetTagsCountByUserId(ctx, pgtype.UUID{Bytes: uuid.MustParse(params.UserID), Valid: true})
	case MaxCustomCollections:
		count, err = ls.limitRepository.GetWayCollectionsCountByUserId(ctx, pgtype.UUID{Bytes: uuid.MustParse(params.UserID), Valid: true})
	case MaxDayReports:
		count, err = ls.limitRepository.GetDayReportsCountByWayId(ctx, pgtype.UUID{Bytes: uuid.MustParse(*params.WayID), Valid: true})
	default:
		return fmt.Errorf("invalid limit name: %s", params.LimitName)
	}
	if err != nil {
		return fmt.Errorf("failed to get count for %s: %w", params.LimitName, err)
	}

	userPricingPlan, err := ls.limitRepository.GetPricingPlanByUserId(ctx, pgtype.UUID{Bytes: uuid.MustParse(params.UserID), Valid: true})
	if err != nil {
		return fmt.Errorf("failed to get pricing plan for userID: %w", err)
	}

	limit, ok := limitMap[params.LimitName][userPricingPlan]
	if !ok {
		return fmt.Errorf("limit not defined for %s in pricing plan %s", params.LimitName, userPricingPlan)
	}

	if limit > uint16(count) {
		return nil
	}

	return fmt.Errorf("user has reached the limit for %s", params.LimitName)
}

func (ls *LimitService) GetMaxCompositeWayDepthByUserID(ctx context.Context, userID uuid.UUID) (int, error) {
	userPricingPlan, err := ls.limitRepository.GetPricingPlanByUserId(ctx, pgtype.UUID{Bytes: userID, Valid: true})
	if err != nil {
		return 0, fmt.Errorf("failed to get pricing plan for userID: %w", err)
	}

	return int(limitMap[MaxCompositeWayDeps][userPricingPlan]), nil
}
