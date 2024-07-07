package controllers

import (
	"context"
	"database/sql"
	"log"
	"mwserver/config"
	db "mwserver/db/sqlc"
	"mwserver/util"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type DevController struct {
	db  *db.Queries
	ctx context.Context
}

func NewDevController(db *db.Queries, ctx context.Context) *DevController {
	return &DevController{db, ctx}
}

// Reset db
// @Summary resets db
// @Description resets db
// @Tags dev
// @Success 200
// @Router /reset-db [post]
func (cc *DevController) ResetDb(ctx *gin.Context) {
	// Open a connection to the database
	db, err := sql.Open("postgres", config.Env.DbSource)
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	}
	defer db.Close()

	migration, err := os.ReadFile("db/migration/000001_init_schema.up.sql")
	util.HandleErrorGin(ctx, err)

	err = cc.db.RemoveEverything(ctx)
	util.HandleErrorGin(ctx, err)

	// migrate schemas according to migrations file
	_, err = db.Query(string(migration))
	util.HandleErrorGin(ctx, err)

	util.HandleErrorGin(ctx, cc.db.RegenerateDbData(ctx))
	ctx.Status(http.StatusOK)
}
