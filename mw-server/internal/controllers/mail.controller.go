package controllers

import (
	"fmt"
	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type MailController struct {
	mailService *services.MailService
	smtpService *services.SmtpService
}

func NewMailController(mailService *services.MailService, smtpService *services.SmtpService) *MailController {
	return &MailController{mailService, smtpService}
}

// Send mail handler
// @Summary Sending messages to recipients and save logs
// @Description Sending messages to recipients by smtp and saving the log of the sent mail
// @Tags mail
// @ID send-mail
// @Accept  application/json
// @Produce  application/json
// @Param request body schemas.MailRequest true "query params"
// @Success 200 {object} schemas.SendMailResponse
// @Router /send [post]
func (mc *MailController) SendEmail(ctx *gin.Context) {
	var payload *schemas.MailRequest

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	mailParams := &services.MailSendParams{
		Subject:    payload.Subject,
		Recipients: payload.Recipients,
		Cc:         payload.Cc,
		Bcc:        payload.Bcc,
		Reply:      payload.Reply,
		Message:    payload.Message,
	}

	smtpResp, err := mc.smtpService.SendMail(mailParams)
	mc.HandleErrorMail(ctx, err, payload)

	mailResp, err := mc.mailService.SaveMailResultToDB(ctx, smtpResp)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, mailResp)
}

func (mc *MailController) HandleErrorMail(ctx *gin.Context, err error, requestData *schemas.MailRequest) {
	if err != nil {
		mailResp := &services.MailSmtpResult{
			SenderMail: mc.smtpService.Config.SenderEmail,
			SenderName: mc.smtpService.Config.SenderName,
			Recipients: requestData.Recipients,
			Cc:         requestData.Cc,
			Bcc:        requestData.Bcc,
			ReplyTo:    requestData.Reply,
			Subject:    requestData.Subject,
			Message:    requestData.Message,
			Log:        err.Error(),
		}

		_, errDb := mc.mailService.SaveMailResultToDB(ctx, mailResp)
		if errDb != nil {
			err = fmt.Errorf("main error: %v. Db error: %v", err, errDb)
			util.HandleErrorGin(ctx, err)
		}

		util.HandleErrorGin(ctx, err)
	}
}