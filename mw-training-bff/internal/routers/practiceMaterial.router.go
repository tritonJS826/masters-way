package routers

import (
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type practiceMaterialRouter struct {
	practiceMaterialController *controllers.PracticeMaterialController
}

func newPracticeMaterialRouter(practiceMaterialController *controllers.PracticeMaterialController) *practiceMaterialRouter {
	return &practiceMaterialRouter{practiceMaterialController}
}

func (mr *practiceMaterialRouter) setPracticeMaterialRoutes(rg *gin.RouterGroup) {
	practiceMaterials := rg.Group("/practiceMaterials")
	practiceMaterials.GET(":topicId", mr.practiceMaterialController.GetPracticeMaterialsByTopicId)
	practiceMaterials.POST("", mr.practiceMaterialController.CreatePracticeMaterial)
	practiceMaterials.PATCH("", mr.practiceMaterialController.UpdatePracticeMaterial)
	practiceMaterials.DELETE(":practiceMaterialId", mr.practiceMaterialController.DeletePracticeMaterial)
}
