package schemas

// Used to get data from a POST request
type MailRequest struct {
	Subject string   `json:"subject" binding:"required"`
	To      []string `json:"to" binding:"required"`
	Cc      []string `json:"cc,omitempty"`
	Bcc     []string `json:"bcc,omitempty"`
	ReplyTo []string `json:"replyTo,omitempty"`
	Message string   `json:"message" binding:"required"`
}

// Response data from the smtp server.
type SendSmtpResponse struct {
	FromMail   string   `json:"from_mail"`
	FromName   string   `json:"from_name"`
	Recipients []string `json:"recipients"`
	Cc         []string `json:"cc"`
	Bcc        []string `json:"bcc"`
	ReplyTo    []string `json:"reply_to"`
	Subject    string   `json:"subject"`
	Message    string   `json:"message"`
	Log        string   `json:"log"`
}

// Response data to our user
type SendMailResponse struct {
	ID         string   `json:"id" validate:"required"`
	FromMail   string   `json:"fromMail" validate:"required"`
	Recipients []string `json:"recipients" validate:"required"`
	Subject    string   `json:"subject" validate:"required"`
	Message    string   `json:"message" validate:"required"`
}
