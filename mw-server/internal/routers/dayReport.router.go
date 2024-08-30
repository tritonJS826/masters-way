package routers

import (
	"mwserver/internal/auth"
	"mwserver/internal/config"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type dayReportRouter struct {
	dayReportController *controllers.DayReportController
	config              *config.Config
}

func newDayReportRouter(dayReportController *controllers.DayReportController, config *config.Config) *dayReportRouter {
	return &dayReportRouter{dayReportController, config}
}

func (dr *dayReportRouter) setDayReportRoutes(rg *gin.RouterGroup) {
	router := rg.Group("dayReports")
	router.POST("", auth.AuthMiddleware(dr.config), dr.dayReportController.CreateDayReport)
	router.GET("/:wayId", dr.dayReportController.GetDayReports)
}
