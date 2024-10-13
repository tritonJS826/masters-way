package schemas

// Used to get data from a POST request
type EmailRequest struct {
	Subject     string   `form:"subject" binding:"required"`
	To          []string `form:"to" binding:"required"`
	Cc          []string `form:"cc,omitempty"`
	Bcc         []string `form:"bcc,omitempty"`
	ReplyTo     []string `form:"reply_to,omitempty"`
	Message     string   `form:"message,omitempty"`
	HtmlMessage string   `form:"html_message,omitempty"`
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
	Err         string   `json:"err"`
}

// Response data to our user
type SendMailResponse struct {
	ID          string   `json:"id" validate:"required"`
	FromEmail   string   `json:"fromEmail" validate:"required"`
	Recipients  []string `json:"recipients" validate:"required"`
	Subject     string   `json:"subject" validate:"required"`
	Message     string   `json:"message" validate:"required"`
	HtmlMessage string   `json:"htmlMessage" validate:"required"`
	Err         string   `json:"err"`
}
