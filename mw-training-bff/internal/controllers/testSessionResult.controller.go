package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
)

type TestSessionResultsController struct {
	generalService            *services.GeneralService
	testSessionResultsService *services.TestSessionResultsService
}

func NewTestSessionResultsController(
	generalService *services.GeneralService,
	testSessionResultsService *services.TestSessionResultsService,
) *TestSessionResultsController {
	return &TestSessionResultsController{
		generalService:            generalService,
		testSessionResultsService: testSessionResultsService,
	}
}

// GetTestSessionResult
// @Summary Get test session result by session uuid
// @Description
// @Tags test-session-result
// @ID get-test-session-result-by-session-uuid
// @Accept json
// @Produce json
// @Param sessionId path string true "session ID"
// @Success 200 {object} schemas.GetTestSessionResultResponse
// @Router /testSessionResult/{sessionId} [get]
func (c *TestSessionResultsController) GetTestSessionResult(ctx *gin.Context) {
	requestOwnerUuid := ctx.Value(auth.ContextKeyUserID).(string)
	sessionUuidRaw := ctx.Param("sessionId")

	params := &services.GetTestSessionResultParams{
		SessionUuid: sessionUuidRaw,
		UserUuid:    requestOwnerUuid,
	}

	testSessionResult, err := c.testSessionResultsService.GetTestSessionResult(ctx, params)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, testSessionResult)
}

// CreateTestSessionResult
// @Summary Create test session result by session uuid
// @Description If ResultDescription will no be provided - it will be generated with Ai
// @Tags test-session-result
// @ID create-test-session-result-by-session-uuid
// @Accept json
// @Produce json
// @Param request body schemas.CreateSessionResultRequest true "body"
// @Success 200 {object} schemas.GetTestSessionResultResponse
// @Router /testSessionResult [post]
func (c *TestSessionResultsController) CreateTestSessionResult(ctx *gin.Context) {
	requestOwnerUuid := ctx.Value(auth.ContextKeyUserID).(string)

	var payload *schemas.CreateSessionResultRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	params := &services.CreateTestSessionResultParams{
		SessionUuid:       payload.SessionUUID,
		UserUuid:          requestOwnerUuid,
		ResultDescription: payload.ResultDescription,
		TestUuid:          payload.TestUuid,
	}

	testSessionResult, err := c.testSessionResultsService.CreateTestSessionResult(ctx, params)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, testSessionResult)
}
