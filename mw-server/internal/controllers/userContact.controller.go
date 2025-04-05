package controllers

import (
	"net/http"

	"mw-server/internal/auth"
	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserContactController struct {
	userContactService *services.UserContactService
}

func NewUserContactController(userContactService *services.UserContactService) *UserContactController {
	return &UserContactController{userContactService}
}

// @Summary Update user contact by UUID
// @Description
// @Tags userContact
// @ID update-userContact
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateUserContactPayload true "query params"
// @Param userId path string true "user ID"
// @Param contactId path string true "contactId ID"
// @Success 200 {object} schemas.UserContact
// @Router /users/{userId}/contact/{contactId} [patch]
func (uc *UserContactController) UpdateUserContact(ctx *gin.Context) {
	var payload *schemas.UpdateUserContactPayload
	userID := ctx.Param("userId")
	contactId := ctx.Param("contactId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	currentUserID := currentUserIDRaw.(string)

	isUserAuthorized := currentUserID == userID
	if !isUserAuthorized {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to update this contact"})
		return
	}

	userContact, err := uc.userContactService.UpdateUserContact(ctx, &services.UpdateUserContactParams{
		ContactId:   uuid.MustParse(contactId),
		Description: payload.Description,
		ContactLink: payload.ContactLink,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, userContact)
}

// Create user contact handler
// @Summary Create user contact
// @Description create user contact
// @Tags user-contact user
// @ID create-userContact
// @Accept  json
// @Produce  json
// @Param userId path string true "user ID"
// @Success 200 {object} schemas.UserContact
// @Router /users/{userId}/contacts [post]
func (uc *UserContactController) CreateUserContact(ctx *gin.Context) {
	userID := ctx.Param("userId")

	currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	currentUserID := currentUserIDRaw.(string)

	isUserAuthorized := currentUserID == userID
	if !isUserAuthorized {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to update this contact"})
		return
	}

	userContact, err := uc.userContactService.CreateUserContact(ctx, uuid.MustParse(userID))
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, userContact)
}

// Deleting userContact handlers
// @Summary Delete DeleteUserContact by UUID
// @Description
// @Tags userContact
// @ID delete-userContact
// @Accept  json
// @Produce  json
// @Param userId path string true "user ID"
// @Param contactId path string true "contactId ID"
// @Success 204
// @Router /users/{userId}/contacts/{contactId} [delete]
func (uc *UserContactController) DeleteUserContact(ctx *gin.Context) {
	userID := ctx.Param("userId")
	contactId := ctx.Param("contactId")

	currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	currentUserID := currentUserIDRaw.(string)

	isUserAuthorized := currentUserID == userID
	if !isUserAuthorized {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to update this contact"})
		return
	}

	err := uc.userContactService.DeleteUserContact(ctx, userID, contactId)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
