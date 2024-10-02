package controllers

import (
	"mwsurvey/internal/auth"
	"mwsurvey/internal/schemas"
	"mwsurvey/internal/services"
	"mwsurvey/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type SurveyController struct {
	surveyService *services.SurveyService
}

func NewSurveyController(surveyService *services.SurveyService) *SurveyController {
	return &SurveyController{surveyService}
}

// @Summary Post survey user intro
// @Description Post survey user intro
// @Tags survey
// @ID survey-user-intro
// @Accept  json
// @Produce  json
// @Param request body schemas.PostSurveyUserIntroPayload true "query params"
// @Success 204
// @Router /user-intro [post]
func (sc *SurveyController) PostSurveyUserIntro(ctx *gin.Context) {
	var payload *schemas.PostSurveyUserIntroPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := &services.SaveUserIntroSurveyParams{
		UserUUID:                   uuid.MustParse(userID),
		DeviceUUID:                 uuid.MustParse(payload.DeviceUuid),
		Role:                       payload.Role,
		PreferredInterfaceLanguage: payload.PreferredInterfaceLanguage,
		StudentGoals:               payload.StudentGoals,
		StudentExperience:          payload.StudentExperience,
		WhyRegistered:              payload.WhyRegistered,
		Source:                     payload.Source,
	}

	err := sc.surveyService.CreateUserIntroSurvey(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}

// @Summary Post survey looking for mentor
// @Description Post survey looking for mentor
// @Tags survey
// @ID survey-looking-for-mentor
// @Accept json
// @Produce json
// @Param request body schemas.PostSurveyLookingForMentorPayload true "query params"
// @Success 204
// @Router /looking-for-mentor [post]
func (sc *SurveyController) PostSurveyLookingForMentor(ctx *gin.Context) {
	var payload *schemas.PostSurveyLookingForMentorPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := &services.SaveLookingForMentorSurveyParams{
		UserUUID:          uuid.MustParse(userID),
		UserEmail:         payload.UserEmail,
		SkillsToLearn:     payload.SkillsToLearn,
		CurrentExperience: payload.CurrentExperience,
		MentorDescription: payload.MentorDescription,
	}

	err := sc.surveyService.CreateLookingForMentorSurvey(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
