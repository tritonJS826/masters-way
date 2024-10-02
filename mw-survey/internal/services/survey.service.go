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
	CreateLookingForMentorSurvey(ctx context.Context, arg db.CreateLookingForMentorSurveyParams) (db.LookingForMentor, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type SurveyService struct {
	surveyRepository ISurveyRepository
}

func NewSurveyService(surveyRepository ISurveyRepository) *SurveyService {
	return &SurveyService{surveyRepository}
}

type SaveUserIntroSurveyParams struct {
	UserUUID                   uuid.UUID
	DeviceUUID                 uuid.UUID
	Role                       string
	PreferredInterfaceLanguage string
	StudentGoals               string
	StudentExperience          string
	WhyRegistered              string
	Source                     string
}

func (ss *SurveyService) CreateUserIntroSurvey(ctx context.Context, userInfoSurveyParams *SaveUserIntroSurveyParams) error {
	args := db.CreateUserIntroSurveyParams{
		UserUuid:                   pgtype.UUID{Bytes: userInfoSurveyParams.UserUUID, Valid: true},
		DeviceUuid:                 pgtype.UUID{Bytes: userInfoSurveyParams.DeviceUUID, Valid: true},
		Role:                       userInfoSurveyParams.Role,
		PreferredInterfaceLanguage: userInfoSurveyParams.PreferredInterfaceLanguage,
		StudentGoals:               userInfoSurveyParams.StudentGoals,
		StudentExperience:          userInfoSurveyParams.StudentExperience,
		WhyRegistered:              userInfoSurveyParams.WhyRegistered,
		Source:                     userInfoSurveyParams.Source,
	}

	_, err := ss.surveyRepository.CreateUserIntroSurvey(ctx, args)
	if err != nil {
		return err
	}

	return nil
}

type SaveLookingForMentorSurveyParams struct {
	UserUUID          uuid.UUID `json:"userId" validate:"required"`
	UserEmail         string    `json:"userEmail" validate:"required"`
	SkillsToLearn     string    `json:"skillsToLearn" validate:"required"`
	CurrentExperience string    `json:"currentExperience" validate:"required"`
	MentorDescription string    `json:"mentorDescription" validate:"required"`
}

func (ss *SurveyService) CreateLookingForMentorSurvey(ctx context.Context, lookingForMentorSurveyParams *SaveLookingForMentorSurveyParams) error {
	createLookingForMentorSurveyParams := db.CreateLookingForMentorSurveyParams{
		UserUuid:          pgtype.UUID{Bytes: lookingForMentorSurveyParams.UserUUID, Valid: true},
		UserEmail:         lookingForMentorSurveyParams.UserEmail,
		SkillsToLearn:     lookingForMentorSurveyParams.SkillsToLearn,
		CurrentExperience: lookingForMentorSurveyParams.CurrentExperience,
		MentorDescription: lookingForMentorSurveyParams.MentorDescription,
	}

	_, err := ss.surveyRepository.CreateLookingForMentorSurvey(ctx, createLookingForMentorSurveyParams)
	if err != nil {
		return err
	}

	return nil
}
