package schemas

// Used to get data from a POST request
type MailRequest struct {
	Subject     string   `json:"subject" binding:"required"`
	To          []string `json:"to" binding:"required"`
	Cc          []string `json:"cc,omitempty"`
	Bcc         []string `json:"bcc,omitempty"`
	ReplyTo     []string `json:"replyTo,omitempty"`
	Message     string   `json:"message,omitempty"`
	HtmlMessage string   `json:"htmlMessage,omitempty"`
}

// Response data from the smtp server.
type SendSmtpResponse struct {
	FromEmail   string   `json:"from_email"`
	FromName    string   `json:"from_name"`
	Recipients  []string `json:"recipients"`
	Cc          []string `json:"cc"`
	Bcc         []string `json:"bcc"`
	ReplyTo     []string `json:"reply_to"`
	Subject     string   `json:"subject"`
	Message     string   `json:"message"`
	HtmlMessage string   `json:"html_message"`
	Log         string   `json:"log"`
}

// Response data to our user
type SendMailResponse struct {
	ID          string   `json:"id" validate:"required"`
	FromEmail   string   `json:"fromEmail" validate:"required"`
	Recipients  []string `json:"recipients" validate:"required"`
	Subject     string   `json:"subject" validate:"required"`
	Message     string   `json:"message,omitempty"`
	HtmlMessage string   `json:"htmlMessage,omitempty"`
}
