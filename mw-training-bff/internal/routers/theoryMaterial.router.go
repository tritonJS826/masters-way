package routers

import (
	"mw-training-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type theoryMaterialRouter struct {
	theoryMaterialController *controllers.TheoryMaterialController
}

func newTheoryMaterialRouter(theoryMaterialController *controllers.TheoryMaterialController) *theoryMaterialRouter {
	return &theoryMaterialRouter{theoryMaterialController}
}

func (mr *theoryMaterialRouter) setTheoryMaterialRoutes(rg *gin.RouterGroup) {
	theoryMaterials := rg.Group("/theoryMaterials")
	theoryMaterials.GET(":topicId", mr.theoryMaterialController.GetTheoryMaterialsByTopicId)
	theoryMaterials.POST("", mr.theoryMaterialController.CreateTheoryMaterial)
	theoryMaterials.PATCH(":theoryMaterialId", mr.theoryMaterialController.UpdateTheoryMaterial)
	theoryMaterials.DELETE(":theoryMaterialId", mr.theoryMaterialController.DeleteTheoryMaterial)
}
