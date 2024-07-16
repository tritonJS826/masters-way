package controllers

import (
	"context"
	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

type MentorRequestController struct {
	db  *db.Queries
	ctx context.Context
}

func NewMentorRequestController(db *db.Queries, ctx context.Context) *MentorRequestController {
	return &MentorRequestController{
		db:  db,
		ctx: ctx,
	}
}

// Get users way requests
// @Summary Get users way requests by userUUID
// @Description
// @Tags mentorRequest
// @ID get-mentorRequests
// @Accept json
// @Product json
// @Param request body schemas.GetMentorRequestPayload
// @Success 200 {array} schemas.GetMentorRequestResponse
// @Router /mentorRequest [get]
func (cc *MentorRequestController) GetMentorRequestsByUserId(ctx *gin.Context) {
	var payload schemas.GetMentorRequestPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	reqs, err := cc.db.GetMentorRequestByUserId(ctx, pgtype.UUID{
		Bytes: payload.UserUUID,
		Valid: true,
	})
	util.HandleErrorGin(ctx, err)

	responses := make([]schemas.GetMentorRequestResponse, len(reqs))
	for i, req := range reqs {
		response := schemas.GetMentorRequestResponse{
			UserUuid:          util.ConvertPgUUIDToUUID(req.UserUuid),
			WayUuid:           util.ConvertPgUUIDToUUID(req.WayUuid),
			Uuid:              util.ConvertPgUUIDToUUID(req.Uuid),
			Name:              req.Name,
			GoalDescription:   req.GoalDescription,
			UpdatedAt:         req.UpdatedAt.Time,
			CreatedAt:         req.CreatedAt.Time,
			EstimationTime:    req.EstimationTime,
			OwnerUuid:         util.ConvertPgUUIDToUUID(req.OwnerUuid),
			CopiedFromWayUuid: util.ConvertPgUUIDToUUID(req.CopiedFromWayUuid),
			IsCompleted:       req.IsCompleted,
			IsPrivate:         req.IsPrivate,
		}
		responses[i] = response
	}

	ctx.JSON(http.StatusOK, responses)
}
