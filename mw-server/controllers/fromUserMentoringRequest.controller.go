package controllers

import (
	"context"
	"net/http"

	dbPGX "mwserver/db_pgx/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type FromUserMentoringRequestController struct {
	dbPGX *dbPGX.Queries
	ctx   context.Context
}

func NewFromUserMentoringRequestController(dbPGX *dbPGX.Queries, ctx context.Context) *FromUserMentoringRequestController {
	return &FromUserMentoringRequestController{dbPGX, ctx}
}

// Create fromUserMentoringRequest handler
// @Summary Create a new fromUserMentoringRequest
// @Description
// @Tags fromUserMentoringRequest
// @ID create-fromUserMentoringRequest
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFromUserMentoringRequestPayload true "query params"
// @Success 200
// @Router /fromUserMentoringRequests [post]
func (cc *FromUserMentoringRequestController) CreateFromUserMentoringRequest(ctx *gin.Context) {
	var payload *schemas.CreateFromUserMentoringRequestPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := dbPGX.CreateFromUserMentoringRequestParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.UserUuid), Valid: true},
		WayUuid:  pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true},
	}

	fromUserMentoringRequest, err := cc.dbPGX.CreateFromUserMentoringRequest(ctx, args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving fromUserMentoringRequest", "error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, fromUserMentoringRequest)
}

// Deleting fromUserMentoringRequest handlers
// @Summary Delete fromUserMentoringRequest by UUID
// @Description
// @Tags fromUserMentoringRequest
// @ID delete-fromUserMentoringRequest
// @Accept  json
// @Produce  json
// @Param userUuid path string true "user UUID"
// @Param wayUuid path string true "way UUID"
// @Success 200
// @Router /fromUserMentoringRequests/{userUuid}/{wayUuid} [delete]
func (cc *FromUserMentoringRequestController) DeleteFromUserMentoringRequestById(ctx *gin.Context) {
	userUuid := ctx.Param("userUuid")
	wayUuid := ctx.Param("wayUuid")

	args := dbPGX.DeleteFromUserMentoringRequestParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(userUuid), Valid: true},
		WayUuid:  pgtype.UUID{Bytes: uuid.MustParse(wayUuid), Valid: true},
	}

	err := cc.dbPGX.DeleteFromUserMentoringRequest(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
