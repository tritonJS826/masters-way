package controllers

import (
	"context"
	"github.com/gin-gonic/gin"
	db "mwserver/db/sqlc"
	"mwserver/util"
	"net/http"
)

type DevController struct {
	db  *db.Queries
	ctx context.Context
}

func NewDevController(db *db.Queries, ctx context.Context) *DevController {
	return &DevController{db, ctx}
}

// Resets and adds data
// @Summary resets all data and adds test data
// @Description resets all data and adds test data  for testing purposes
// @Tags test
// @Success 200
// @Router /test/data [post]
func (d *DevController) ResetDb(ctx *gin.Context) {
	util.HandleErrorGin(ctx, d.db.TruncateAllTables(ctx))
	util.HandleErrorGin(ctx, d.db.PopulateDb(ctx))
	ctx.Status(http.StatusOK)
}
