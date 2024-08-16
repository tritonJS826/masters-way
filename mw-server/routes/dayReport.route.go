package routes

import (
	"mwserver/auth"
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type DayReportRoutes struct {
	dayReportController controllers.DayReportController
}

func NewRouteDayReport(dayReportController controllers.DayReportController) DayReportRoutes {
	return DayReportRoutes{dayReportController}
}

func (cr *DayReportRoutes) DayReportRoute(rg *gin.RouterGroup) {
	router := rg.Group("dayReports")
	router.POST("", auth.AuthMiddleware(), cr.dayReportController.CreateDayReport)
	router.GET("/:wayId", cr.dayReportController.GetDayReports)
}
