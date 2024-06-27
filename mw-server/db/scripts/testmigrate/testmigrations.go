package testmigrate

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
	"mwserver/config"
	"mwserver/util"
	"net/http"
	"path/filepath"
	"runtime"
)

func RunTestMigrations() error {
	db, err := sql.Open("postgres", config.Env.DbSource)
	if err != nil {
		return err
	}
	defer db.Close()
	driver, err := postgres.WithInstance(
		db,
		&postgres.Config{},
	)
	defer driver.Close()

	if err != nil {
		return err
	}

	_, filename, _, _ := runtime.Caller(0)

	migrationPathProd := "file://" + filepath.Join(filepath.Dir(filename), "../../migration")
	migrationPathTest := "file://" + filepath.Join(filepath.Dir(filename), "../../test_migration")
	m, err := migrate.NewWithDatabaseInstance(migrationPathProd, config.Env.PostgresDb, driver)
	if err != nil {
		return err
	}
	defer m.Close()
	if err := m.Down(); err != nil {
		return err
	}

	mTest, err := migrate.NewWithDatabaseInstance(migrationPathTest, config.Env.PostgresDb, driver)
	defer mTest.Close()
	if err != nil {
		return err
	}
	if err := mTest.Up(); err != nil {
		return err
	}
	return nil
}

// Running test migrations for data
// @Summary test data in db
// @Description Creates the data and migrations for testing purposes
// @Tags test
// @Accept json
// @Produce json
// @Success 200
// @Router /test/migrate [get]
func RunTestMigrationsController(ctx *gin.Context) {

	util.HandleErrorGin(ctx, RunTestMigrations())
	ctx.JSON(http.StatusOK, gin.H{"status": "success"})
}
