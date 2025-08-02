package schemas

type ShortUser struct {
	UserID   string `json:"userId"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	ImageURL string `json:"imageUrl"`
}
