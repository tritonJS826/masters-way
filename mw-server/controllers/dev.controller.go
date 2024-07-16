package controllers

import (
	"context"
	db "mwserver/db/sqlc"
	"mwserver/util"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DevController struct {
	db      *db.Queries
	pgxPool *pgxpool.Pool
	ctx     context.Context
}

func NewDevController(db *db.Queries, pgxPool *pgxpool.Pool, ctx context.Context) *DevController {
	return &DevController{db, pgxPool, ctx}
}

// Reset db
// @Summary resets db
// @Description resets db
// @Tags dev
// @Success 200
// @Router /reset-db [post]
func (cc *DevController) ResetDb(ctx *gin.Context) {
	migration, err := os.ReadFile("db/migration/000001_init_schema.up.sql")
	util.HandleErrorGin(ctx, err)

	err = cc.db.RemoveEverything(ctx)
	util.HandleErrorGin(ctx, err)

	// migrate schemas according to migrations file
	_, err = cc.pgxPool.Exec(ctx, string(migration))
	util.HandleErrorGin(ctx, err)

	util.HandleErrorGin(ctx, cc.db.RegenerateDbData(ctx))
	ctx.Status(http.StatusOK)
}
