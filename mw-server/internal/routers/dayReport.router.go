package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type DayReportRouter struct {
	dayReportController *controllers.DayReportController
}

func NewDayReportRouter(dayReportController *controllers.DayReportController) *DayReportRouter {
	return &DayReportRouter{dayReportController}
}

func (drr *DayReportRouter) SetDayReportRoutes(rg *gin.RouterGroup) {
	router := rg.Group("dayReports")
	router.POST("", auth.AuthMiddleware(), drr.dayReportController.CreateDayReport)
	router.GET("/:wayId", drr.dayReportController.GetDayReports)
}
