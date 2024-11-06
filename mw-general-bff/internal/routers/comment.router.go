package routers

import (
	"mw-general-bff/internal/auth"
	"mw-general-bff/internal/config"
	"mw-general-bff/internal/controllers"

	"github.com/gin-gonic/gin"
)

type commentRouter struct {
	commentController *controllers.CommentController
	config            *config.Config
}

func newCommentRouter(commentController *controllers.CommentController, config *config.Config) *commentRouter {
	return &commentRouter{commentController, config}
}

func (cr *commentRouter) setCommentRoutes(rg *gin.RouterGroup) {
	router := rg.Group("comments")
	router.POST("", auth.AuthMiddleware(cr.config), cr.commentController.CreateComment)
	router.PATCH("/:commentId", auth.AuthMiddleware(cr.config), cr.commentController.UpdateComment)
	router.DELETE("/:commentId", auth.AuthMiddleware(cr.config), cr.commentController.DeleteCommentById)
}
