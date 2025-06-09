package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
)

type SessionController struct {
	generalService *services.GeneralService
	sessionService *services.SessionService
}

func NewSessionController(
	generalService *services.GeneralService,
	sessionService *services.SessionService,
) *SessionController {
	return &SessionController{
		generalService: generalService,
		sessionService: sessionService,
	}
}

// CreateSession
// @Summary Create session
// @Description
// @ID create-session
// @Tags sessions
// @Accept json
// @Produce json
// @Param request body schemas.CreateSessionRequest true "body"
// @Success 200 {object} schemas.CreateSessionResult
// @Router /session [post]
func (c *SessionController) CreateSession(ctx *gin.Context) {
	var payload schemas.CreateSessionRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	params := &services.CreateSessionParams{
		UserUuid: payload.UserUUID,
	}

	session, err := c.sessionService.CreateSession(ctx, params)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, session)
}
