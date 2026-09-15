package schemas

type PostSurveyUserIntroPayload struct {
	DeviceID                   string `json:"deviceId" binding:"required"`
	Role                       string `json:"role" binding:"required"`
	PreferredInterfaceLanguage string `json:"preferredInterfaceLanguage" binding:"required"`
	StudentGoals               string `json:"studentGoals" binding:"required"`
	StudentExperience          string `json:"studentExperience" binding:"required"`
	WhyRegistered              string `json:"whyRegistered" binding:"required"`
	Source                     string `json:"source" binding:"required"`
	PromoCode                  string `json:"promoCode" binding:"required"`
}

type PostSurveyLookingForMentorPayload struct {
	UserEmail          string `json:"userEmail" binding:"required"`
	SkillsToLearn      string `json:"skillsToLearn" binding:"required"`
	CurrentExperience  string `json:"currentExperience" binding:"required"`
	MentorDescription  string `json:"mentorDescription" binding:"required"`
}