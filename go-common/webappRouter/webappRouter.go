package webapprouter

// Used for redirections and links
type Router interface {
	GetHomePage() string
	GetPartnershipPage() string
	GetPricingPage() string
	GetAllWaysPage() string
	GetUserPage(userUUID string) string
	GetWayPage(wayUUID string) string
	GetProjectPage(projectUUID string) string
	GetAllUsersPage() string
	GetSettingsPage() string
	GetAboutProjectPage() string
	GetPrivacyPolicyPage() string
	GetLandingsPage() string
	GetLandingMentorsPage() string
	GetLandingStudentsWithMentorsPage() string
	GetLandingStudentsWithAIPage() string
	GetLandingBusinessPage() string
}

type WebappRouter struct {
	webappBaseURL string
}

func NewWebappRouter(webappBaseURL string) *WebappRouter {
	return &WebappRouter{webappBaseURL}
}

func (wr *WebappRouter) GetHomePage() string {
	return wr.webappBaseURL + "/"
}

func (wr *WebappRouter) GetPartnershipPage() string {
	return wr.webappBaseURL + "/partnership"
}

func (wr *WebappRouter) GetPricingPage() string {
	return wr.webappBaseURL + "/pricing"
}

func (wr *WebappRouter) GetAllWaysPage() string {
	return wr.webappBaseURL + "/ways"
}

func (wr *WebappRouter) GetUserPage(userUUID string) string {
	return wr.webappBaseURL + "/user/" + userUUID
}

func (wr *WebappRouter) GetWayPage(wayUUID string) string {
	return wr.webappBaseURL + "/way/" + wayUUID
}

func (wr *WebappRouter) GetProjectPage(projectUUID string) string {
	return wr.webappBaseURL + "/project/" + projectUUID
}

func (wr *WebappRouter) GetAllUsersPage() string {
	return wr.webappBaseURL + "/users"
}

func (wr *WebappRouter) GetSettingsPage() string {
	return wr.webappBaseURL + "/settings"
}

func (wr *WebappRouter) GetAboutProjectPage() string {
	return wr.webappBaseURL + "/aboutProjects"
}

func (wr *WebappRouter) GetPrivacyPolicyPage() string {
	return wr.webappBaseURL + "/privacyPolicy"
}

func (wr *WebappRouter) GetLandingsPage() string {
	return wr.webappBaseURL + "/land"
}

func (wr *WebappRouter) GetLandingMentorsPage() string {
	return wr.webappBaseURL + "/land/mentors"
}

func (wr *WebappRouter) GetLandingStudentsWithMentorsPage() string {
	return wr.webappBaseURL + "/land/studentsWithMentors"
}

func (wr *WebappRouter) GetLandingStudentsWithAIPage() string {
	return wr.webappBaseURL + "/land/studentsWithAI"
}

func (wr *WebappRouter) GetLandingBusinessPage() string {
	return wr.webappBaseURL + "/land/business"
}
