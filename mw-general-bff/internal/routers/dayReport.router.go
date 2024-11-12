package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

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
	{
		router.POST("", auth.HandleHeaders(dr.config), dr.dayReportController.CreateDayReport)
		router.GET("/:wayId", dr.dayReportController.GetDayReports)
	}
}
