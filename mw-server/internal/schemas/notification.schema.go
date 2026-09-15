package schemas

type CreateNotificationRequest struct {
	Receivers []NotificationReceiver `json:"receivers" binding:"required"`
	Nature    string                 `json:"nature" binding:"required"`
}

type NotificationReceiver struct {
	UserUUID       string                     `json:"userUuid"`
	Email          string                     `json:"email"`
	TelegramChatID int64                      `json:"telegramChatId"`
	OwnWayData     *DataForOwnWayReceiver     `json:"ownWayData,omitempty"`
	MentoringData  *DataForMentoringReceiver  `json:"mentoringData,omitempty"`
}

type DataForOwnWayReceiver struct {
	NotificationCreatorImageURL string `json:"notificationCreatorImageUrl"`
	WayID                       string `json:"wayId"`
	WayName                     string `json:"wayName"`
}

type DataForMentoringReceiver struct {
	NotificationCreatorImageURL string `json:"notificationCreatorImageUrl"`
	WayID                       string `json:"wayId"`
	WayName                     string `json:"wayName"`
}

type NotificationResponse struct {
	UUID        string `json:"uuid"`
	UserUUID    string `json:"userUuid"`
	IsRead      bool   `json:"isRead"`
	Description string `json:"description"`
	URL         string `json:"url"`
	Nature      string `json:"nature"`
	CreatedAt   string `json:"createdAt"`
}

type NotificationWithSettings struct {
	Notification           NotificationResponse            `json:"notification"`
	NotificationSettingList []NotificationSettingResponse  `json:"notificationSettingList"`
}

type CreateNotificationsResponse struct {
	NotificationWithSettingsList []NotificationWithSettings `json:"notificationWithSettingsList"`
}

type GetNotificationListRequest struct {
	UserUUID   string `json:"userUuid"`
	Limit      int32  `json:"limit"`
	Offset     int32  `json:"offset"`
	IsOnlyNew  bool   `json:"isOnlyNew"`
}

type GetNotificationListResponse struct {
	TotalSize        int32                   `json:"totalSize"`
	UnreadSize       int32                   `json:"unreadSize"`
	Notifications    []NotificationResponse  `json:"notifications"`
}

type UpdateNotificationRequest struct {
	NotificationUUID string `json:"notificationUuid"`
	IsRead           bool   `json:"isRead"`
}

type NotificationSettingResponse struct {
	UUID      string `json:"uuid"`
	UserUUID  string `json:"userUuid"`
	Nature    string `json:"nature"`
	Channel   string `json:"channel"`
	IsEnabled bool   `json:"isEnabled"`
}

type CreateNotificationSettingsRequest struct {
	UserUUID string `json:"userUuid"`
}

type GetNotificationSettingListRequest struct {
	UserUUID string `json:"userUuid"`
}

type GetNotificationSettingListResponse struct {
	NotificationSettings []NotificationSettingResponse `json:"notificationSettings"`
}

type UpdateNotificationSettingRequest struct {
	NotificationSettingUUID string `json:"notificationSettingUuid"`
	IsEnabled               bool   `json:"isEnabled"`
}