package services

import (
	"context"

	db "mwsurvey/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type ISurveyRepository interface {
	CreateUserIntroSurvey(ctx context.Context, arg db.CreateUserIntroSurveyParams) (db.UserIntro, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type SurveyService struct {
	surveyRepository ISurveyRepository
}

func NewSurveyService(surveyRepository ISurveyRepository) *SurveyService {
	return &SurveyService{surveyRepository}
}

type SaveUserIntroSurveyParams struct {
	UserUuid                   uuid.UUID
	DeviceUuid                 uuid.UUID
	Role                       string
	PreferredInterfaceLanguage string
	StudentGoals               string
	StudentExperience          string
	WhyRegistered              string
	Source                     string
}

func (fs *SurveyService) CreateUserIntroSurvey(ctx context.Context, userInfoSurveyParams *SaveUserIntroSurveyParams) error {

	args := db.CreateUserIntroSurveyParams{
		UserUuid:                   pgtype.UUID{Bytes: userInfoSurveyParams.UserUuid, Valid: true},
		DeviceUuid:                 pgtype.UUID{Bytes: userInfoSurveyParams.DeviceUuid, Valid: true},
		Role:                       userInfoSurveyParams.Role,
		PreferredInterfaceLanguage: userInfoSurveyParams.PreferredInterfaceLanguage,
		StudentGoals:               userInfoSurveyParams.StudentGoals,
		StudentExperience:          userInfoSurveyParams.StudentExperience,
		WhyRegistered:              userInfoSurveyParams.WhyRegistered,
		Source:                     userInfoSurveyParams.Source,
	}

	_, err := fs.surveyRepository.CreateUserIntroSurvey(ctx, args)

	return err
}
