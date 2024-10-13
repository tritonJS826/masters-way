package controllers

import (
	"fmt"
	"mwmail/internal/schemas"
	"mwmail/internal/services"
	"mwmail/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

const ErrValid = "at least one of the fields 'Message' or 'HtmlMessage' must not be empty"

type MailController struct {
	logMailService *services.LogMailService
	smtpService    *services.SmtpService
}

func NewMailController(logMailService *services.LogMailService, smtpService *services.SmtpService) *MailController {
	return &MailController{logMailService, smtpService}
}

// @Summary Sending messages to recipients and save logs
// @Description Sending messages to recipients by smtp and saving the log of the sent email
// @Tags mail
// @ID send-email
// @Accept  multipart/form-data
// @Produce  application/json
// @Param subject formData string true "Subject of the email"
// @Param to formData array true "Recipient email addresses"
// @Param cc formData array false "CC email addresses"
// @Param bcc formData array false "BCC email addresses"
// @Param message formData string false "Plain text message"
// @Param html_message formData string false "HTML message"
// @Success 200 {object} schemas.SendMailResponse
// @Failure 500 {object} schemas.SendMailResponse "internal server error"
// @Router /mail [post]
func (fc *MailController) SendEmail(ctx *gin.Context) {
	var emailReq schemas.EmailRequest
	var fromEmail string

	// retrieving and validating form-Data
	if err := ctx.ShouldBind(&emailReq); err != nil {
		utils.SendMsgErrorGin(ctx, err, &emailReq, fromEmail)
		return
	}

	// one of these parameters must be provided
	if emailReq.Message == "" && emailReq.HtmlMessage == "" {
		err := fmt.Errorf("%s", ErrValid)
		utils.SendMsgErrorGin(ctx, err, &emailReq, fromEmail)
		return
	}

	// sending message to recipients
	smtpResp, err := fc.smtpService.SendMail(&emailReq)
	if err != nil {
		fmt.Println("ошибка отправка почты", err)
		utils.SendMsgErrorGin(ctx, err, &emailReq, fromEmail)
		return
	}

	// saving message logs
	mailResp, err := fc.logMailService.SaveLogMail(ctx, smtpResp)
	if err != nil {
		fmt.Println("ошибка сохранения в бд", err)
		utils.SendMsgErrorGin(ctx, err, &emailReq, mailResp.FromEmail)
	}

	// response
	serviceResp := &schemas.SendMailResponse{
		ID:          "53453dfsef",
		FromEmail:   mailResp.FromEmail,
		Recipients:  mailResp.Recipients,
		Subject:     mailResp.Subject,
		Message:     mailResp.Message,
		HtmlMessage: mailResp.HtmlMessage,
		Err:         mailResp.Err,
	}

	ctx.JSON(http.StatusOK, serviceResp)
}
