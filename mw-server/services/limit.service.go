package services

import (
	"context"
	"fmt"
	dbPGX "mwserver/db_pgx/sqlc"

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

var limitMap = map[LimitNameType]map[dbPGX.PricingPlanType]uint16{
	MaxOwnWays: {
		dbPGX.PricingPlanTypeFree:    10,
		dbPGX.PricingPlanTypeStarter: 20,
		dbPGX.PricingPlanTypePro:     30,
	},
	MaxPrivateWays: {
		dbPGX.PricingPlanTypeFree:    1,
		dbPGX.PricingPlanTypeStarter: 10,
		dbPGX.PricingPlanTypePro:     10,
	},
	MaxMentoringsWays: {
		dbPGX.PricingPlanTypeFree:    3,
		dbPGX.PricingPlanTypeStarter: 20,
		dbPGX.PricingPlanTypePro:     30,
	},
	MaxUserTags: {
		dbPGX.PricingPlanTypeFree:    3,
		dbPGX.PricingPlanTypeStarter: 5,
		dbPGX.PricingPlanTypePro:     5,
	},
	MaxCustomCollections: {
		dbPGX.PricingPlanTypeFree:    4,
		dbPGX.PricingPlanTypeStarter: 8,
		dbPGX.PricingPlanTypePro:     10,
	},
	MaxCompositeWayDeps: {
		dbPGX.PricingPlanTypeFree:    2,
		dbPGX.PricingPlanTypeStarter: 3,
		dbPGX.PricingPlanTypePro:     3,
	},
	MaxDayReports: {
		dbPGX.PricingPlanTypeFree:    190,
		dbPGX.PricingPlanTypeStarter: 360,
		dbPGX.PricingPlanTypePro:     1000,
	},
}

type LimitReachedParams struct {
	LimitName LimitNameType
	UserID    uuid.UUID
	WayID     *uuid.UUID
}

type LimitService struct {
	dbPGX *dbPGX.Queries
	ctx   context.Context
}

func NewLimitService(dbPGX *dbPGX.Queries, ctx context.Context) *LimitService {
	return &LimitService{dbPGX, ctx}
}

func (ls *LimitService) CheckIsLimitReachedByPricingPlan(lrp *LimitReachedParams) error {
	var count int64
	var err error

	switch lrp.LimitName {
	case MaxOwnWays:
		count, err = ls.dbPGX.GetOwnWaysCountByUserId(ls.ctx, pgtype.UUID{Bytes: lrp.UserID, Valid: true})
	case MaxPrivateWays:
		count, err = ls.dbPGX.GetPrivateWaysCountByUserId(ls.ctx, pgtype.UUID{Bytes: lrp.UserID, Valid: true})
	case MaxMentoringsWays:
		count, err = ls.dbPGX.GetMentoringWaysCountByUserId(ls.ctx, pgtype.UUID{Bytes: lrp.UserID, Valid: true})
	case MaxUserTags:
		count, err = ls.dbPGX.GetTagsCountByUserId(ls.ctx, pgtype.UUID{Bytes: lrp.UserID, Valid: true})
	case MaxCustomCollections:
		count, err = ls.dbPGX.GetWayCollectionsCountByUserId(ls.ctx, pgtype.UUID{Bytes: lrp.UserID, Valid: true})
	case MaxDayReports:
		count, err = ls.dbPGX.GetDayReportsCountByWayId(ls.ctx, pgtype.UUID{Bytes: *lrp.WayID, Valid: true})
	default:
		return fmt.Errorf("invalid limit name: %s", lrp.LimitName)
	}
	if err != nil {
		return fmt.Errorf("failed to get count for %s: %w", lrp.LimitName, err)
	}

	userPricingPlan, err := ls.dbPGX.GetPricingPlanByUserId(ls.ctx, pgtype.UUID{Bytes: lrp.UserID, Valid: true})
	if err != nil {
		return fmt.Errorf("failed to get pricing plan for userID: %w", err)
	}

	limit, ok := limitMap[lrp.LimitName][userPricingPlan]
	if !ok {
		return fmt.Errorf("limit not defined for %s in pricing plan %s", lrp.LimitName, userPricingPlan)
	}

	if limit > uint16(count) {
		return nil
	}

	return fmt.Errorf("user has reached the limit for %s", lrp.LimitName)
}
