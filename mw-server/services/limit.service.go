package services

import (
	"context"
	"fmt"
	db "mwserver/db/sqlc"

	"github.com/google/uuid"
)

const (
	MaxOwnWays           LimitName = "Max own ways"
	MaxPrivateWays       LimitName = "Max private ways"
	MaxMentoringsWays    LimitName = "Max mentorings ways"
	MaxUserTags          LimitName = "Max user tags"
	MaxCustomCollections LimitName = "Max custom collections"
	MaxCompositeWayDeps  LimitName = "Max composite way deps"
	MaxDayReports        LimitName = "Max day reports"
)

var limitMap = map[LimitName]map[db.PricingPlanType]uint16{
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
		db.PricingPlanTypeFree:    100,
		db.PricingPlanTypeStarter: 200,
		db.PricingPlanTypePro:     365,
	},
}

type LimitName string
type LimitParamName string

type LimitService struct {
	db  *db.Queries
	ctx context.Context
}

func NewLimitService(db *db.Queries, ctx context.Context) *LimitService {
	return &LimitService{db, ctx}
}

func (ls *LimitService) IsLimitReachedByPricingPlan(limitName LimitName, limitParams map[LimitParamName]uuid.UUID) error {
	// Проверка на существование user_uuid
	userID, ok := limitParams["userID"]
	if !ok {
		return fmt.Errorf("missing parameter: userID")
	}

	var count int64
	var err error

	// Получение количества элементов по условию лимита
	switch limitName {
	case MaxOwnWays:
		count, err = ls.db.GetOwnWaysCountByUserId(ls.ctx, userID)
	case MaxPrivateWays:
		count, err = ls.db.GetPrivateWaysCountByUserId(ls.ctx, userID)
	case MaxMentoringsWays:
		count, err = ls.db.GetMentoringWaysCountByUserId(ls.ctx, userID)
	case MaxUserTags:
		count, err = ls.db.GetTagsCountByUserId(ls.ctx, userID)
	case MaxCustomCollections:
		count, err = ls.db.GetWayCollectionsCountByUserId(ls.ctx, userID)
	case MaxDayReports:
		// Проверка на существование way_uuid
		wayID, ok := limitParams["wayID"]
		if !ok {
			return fmt.Errorf("missing parameter: wayID")
		}
		count, err = ls.db.GetDayReportsCountByWayId(ls.ctx, wayID)
	default:
		return fmt.Errorf("invalid limit name: %s", limitName)
	}
	// Ошибка получения количества элементов по условию лимита
	if err != nil {
		return fmt.Errorf("failed to get count for %s: %w", limitName, err)
	}

	// Ошибка получения количества элементов по условию лимита
	userPricingPlan, err := ls.db.GetPricingPlanByUserId(ls.ctx, userID)
	if err != nil {
		return fmt.Errorf("failed to get pricing plan for userID: %w", err)
	}

	// Проверка на существование лимита по названию и pricing plan пользователя
	limit, ok := limitMap[limitName][userPricingPlan]
	if !ok {
		return fmt.Errorf("limit not defined for %s in pricing plan %s", limitName, userPricingPlan)
	}

	if limit > uint16(count) {
		return nil
	}

	return fmt.Errorf("user has reached the limit for %s", limitName)
}
