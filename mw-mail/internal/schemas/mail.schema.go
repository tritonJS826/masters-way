package schemas

type MailRequest struct {
	Subject    string   `json:"subject" binding:"required"`
	Recipients []string `json:"recipients" binding:"required"`
	Cc         []string `json:"cc"`
	Bcc        []string `json:"bcc"`
	Reply      []string `json:"reply"`
	Message    string   `json:"message" binding:"required"`
}

type SendSmtpResponse struct {
	SenderMail string   `json:"sender_mail"`
	SenderName string   `json:"sender_name"`
	Recipients []string `json:"recipients"`
	Cc         []string `json:"cc"`
	Bcc        []string `json:"bcc"`
	ReplyTo    []string `json:"reply_to"`
	Subject    string   `json:"subject"`
	Message    string   `json:"message"`
	Log        string   `json:"log"`
}

type SendMailResponse struct {
	ID         string   `json:"id" validate:"required"`
	SenderMail string   `json:"senderMail" validate:"required"`
	SenderName string   `json:"senderName"`
	Recipients []string `json:"recipients" validate:"required"`
	Cc         []string `json:"cc"`
	Bcc        []string `json:"bcc"`
	ReplyTo    []string `json:"reply_to"`
	Subject    string   `json:"subject" validate:"required"`
	Message    string   `json:"message" validate:"required"`
}
