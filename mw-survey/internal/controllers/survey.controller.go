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
// @Success 200
// @Router /user-intro [post]
func (fc *SurveyController) PostSurveyUserIntro(ctx *gin.Context) {
	var payload *schemas.PostSurveyUserIntroPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := &services.SaveUserIntroSurveyParams{
		UserUuid:                   uuid.MustParse(userID),
		DeviceUuid:                 uuid.MustParse(payload.DeviceUuid),
		Role:                       payload.Role,
		PreferredInterfaceLanguage: payload.PreferredInterfaceLanguage,
		StudentGoals:               payload.StudentGoals,
		StudentExperience:          payload.StudentExperience,
		WhyRegistered:              payload.WhyRegistered,
		Source:                     payload.Source,
	}

	err := fc.surveyService.CreateUserIntroSurvey(ctx, params)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
