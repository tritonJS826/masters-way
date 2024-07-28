package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const ContextKeyAuthorization = "ContextKeyAuthorization"
const HeaderKeyAuthorization = "Authorization"

func HandleHeaders() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader(HeaderKeyAuthorization)
		if authHeader == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			return
		}

		ctx.Set(ContextKeyAuthorization, authHeader)
		ctx.Next()
	}
}
