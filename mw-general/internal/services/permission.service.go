package services

import (
	"context"
	"mwgeneral/internal/customErrors"
	db "mwgeneral/internal/db/sqlc"
	"mwgeneral/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IPermissionRepository interface {
	GetIsUserHavingPermissionsForDayReport(ctx context.Context, arg db.GetIsUserHavingPermissionsForDayReportParams) (db.GetIsUserHavingPermissionsForDayReportRow, error)
	GetIsUserHavingPermissionsForProblem(ctx context.Context, arg db.GetIsUserHavingPermissionsForProblemParams) (db.GetIsUserHavingPermissionsForProblemRow, error)
	GetIsUserHavingPermissionsForJobDone(ctx context.Context, arg db.GetIsUserHavingPermissionsForJobDoneParams) (db.GetIsUserHavingPermissionsForJobDoneRow, error)
	GetIsUserHavingPermissionsForComment(ctx context.Context, arg db.GetIsUserHavingPermissionsForCommentParams) (db.GetIsUserHavingPermissionsForCommentRow, error)
	GetIsUserHavingPermissionsForPlan(ctx context.Context, arg db.GetIsUserHavingPermissionsForPlanParams) (db.GetIsUserHavingPermissionsForPlanRow, error)
}

type PermissionService struct {
	permissionRepository IPermissionRepository
}

func NewPermissionService(permissionRepository IPermissionRepository) *PermissionService {
	return &PermissionService{permissionRepository}
}

func (ps *PermissionService) CheckIsUserHavingPermissionsForDayReport(ctx context.Context, userID, dayReportID string) error {
	params := db.GetIsUserHavingPermissionsForDayReportParams{
		UserUuid:      pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		DayReportUuid: pgtype.UUID{Bytes: uuid.MustParse(dayReportID), Valid: true},
	}

	userPermission, err := ps.permissionRepository.GetIsUserHavingPermissionsForDayReport(ctx, params)
	if err != nil {
		return err
	}

	if !userPermission.IsPermissionGiven.Bool {
		wayID := util.ConvertPgUUIDToUUID(userPermission.WayUuid).String()
		return customErrors.MakeNoRightToChangeDayReportError(wayID)
	}

	return nil
}

func (ps *PermissionService) CheckIsUserHavingPermissionsForJobDone(ctx context.Context, userID, jobDoneID string) error {
	params := db.GetIsUserHavingPermissionsForJobDoneParams{
		UserUuid:     pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		JobDonesUuid: pgtype.UUID{Bytes: uuid.MustParse(jobDoneID), Valid: true},
	}

	userPermission, err := ps.permissionRepository.GetIsUserHavingPermissionsForJobDone(ctx, params)
	if err != nil {
		return err
	}

	if !userPermission.IsPermissionGiven.Bool {
		wayID := util.ConvertPgUUIDToUUID(userPermission.WayUuid).String()
		return customErrors.MakeNoRightToChangeDayReportError(wayID)
	}

	return nil
}

func (ps *PermissionService) CheckIsUserHavingPermissionsForComment(ctx context.Context, userID, commentID string) error {
	params := db.GetIsUserHavingPermissionsForCommentParams{
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		CommentUuid: pgtype.UUID{Bytes: uuid.MustParse(commentID), Valid: true},
	}

	userPermission, err := ps.permissionRepository.GetIsUserHavingPermissionsForComment(ctx, params)
	if err != nil {
		return err
	}

	if !userPermission.IsPermissionGiven.Bool {
		wayID := util.ConvertPgUUIDToUUID(userPermission.WayUuid).String()
		return customErrors.MakeNoRightToChangeDayReportError(wayID)
	}

	return nil
}

func (ps *PermissionService) CheckIsUserHavingPermissionsForPlan(ctx context.Context, userID, planID string) error {
	params := db.GetIsUserHavingPermissionsForPlanParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		PlanUuid: pgtype.UUID{Bytes: uuid.MustParse(planID), Valid: true},
	}

	userPermission, err := ps.permissionRepository.GetIsUserHavingPermissionsForPlan(ctx, params)
	if err != nil {
		return err
	}

	if !userPermission.IsPermissionGiven.Bool {
		wayID := util.ConvertPgUUIDToUUID(userPermission.WayUuid).String()
		return customErrors.MakeNoRightToChangeDayReportError(wayID)
	}

	return nil
}

func (ps *PermissionService) CheckIsUserHavingPermissionsForProblem(ctx context.Context, userID, problemID string) error {
	params := db.GetIsUserHavingPermissionsForProblemParams{
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		ProblemUuid: pgtype.UUID{Bytes: uuid.MustParse(problemID), Valid: true},
	}

	userPermission, err := ps.permissionRepository.GetIsUserHavingPermissionsForProblem(ctx, params)
	if err != nil {
		return nil
	}

	if !userPermission.IsPermissionGiven.Bool {
		wayID := util.ConvertPgUUIDToUUID(userPermission.WayUuid).String()
		return customErrors.MakeNoRightToChangeDayReportError(wayID)
	}

	return nil
}
