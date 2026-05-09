# \NotificationAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetNotificationList**](NotificationAPI.md#GetNotificationList) | **Get** /general/notifications | Get notification list by user id
[**GetNotificationSettingList**](NotificationAPI.md#GetNotificationSettingList) | **Get** /general/notificationSettings | Get notificationSetting list by user id
[**UpdateNotification**](NotificationAPI.md#UpdateNotification) | **Patch** /general/notifications/{notificationId} | Update notification by id
[**UpdateNotificationSetting**](NotificationAPI.md#UpdateNotificationSetting) | **Patch** /general/notificationSettings/{notificationSettingId} | Update notificationSetting by id



## GetNotificationList

> MwGeneralBffInternalSchemasGetNotificationListResponse GetNotificationList(ctx).Page(page).Limit(limit).IsOnlyNew(isOnlyNew).Execute()

Get notification list by user id

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	page := int32(56) // int32 | Page number for pagination - 1 by default (optional)
	limit := int32(56) // int32 | Number of items per page - 50 by default (optional)
	isOnlyNew := true // bool | Get only new notifications - false by default (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationAPI.GetNotificationList(context.Background()).Page(page).Limit(limit).IsOnlyNew(isOnlyNew).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationAPI.GetNotificationList``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetNotificationList`: MwGeneralBffInternalSchemasGetNotificationListResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationAPI.GetNotificationList`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetNotificationListRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int32** | Page number for pagination - 1 by default | 
 **limit** | **int32** | Number of items per page - 50 by default | 
 **isOnlyNew** | **bool** | Get only new notifications - false by default | 

### Return type

[**MwGeneralBffInternalSchemasGetNotificationListResponse**](MwGeneralBffInternalSchemasGetNotificationListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetNotificationSettingList

> MwGeneralBffInternalSchemasGetNotificationSettingListResponse GetNotificationSettingList(ctx).Execute()

Get notificationSetting list by user id

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationAPI.GetNotificationSettingList(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationAPI.GetNotificationSettingList``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetNotificationSettingList`: MwGeneralBffInternalSchemasGetNotificationSettingListResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationAPI.GetNotificationSettingList`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetNotificationSettingListRequest struct via the builder pattern


### Return type

[**MwGeneralBffInternalSchemasGetNotificationSettingListResponse**](MwGeneralBffInternalSchemasGetNotificationSettingListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateNotification

> MwGeneralBffInternalSchemasNotificationResponse UpdateNotification(ctx, notificationId).Request(request).Execute()

Update notification by id

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	notificationId := "notificationId_example" // string | notification id
	request := *openapiclient.NewMwGeneralBffInternalSchemasUpdateNotificationPayload(false) // MwGeneralBffInternalSchemasUpdateNotificationPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationAPI.UpdateNotification(context.Background(), notificationId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationAPI.UpdateNotification``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateNotification`: MwGeneralBffInternalSchemasNotificationResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationAPI.UpdateNotification`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**notificationId** | **string** | notification id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateNotificationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwGeneralBffInternalSchemasUpdateNotificationPayload**](MwGeneralBffInternalSchemasUpdateNotificationPayload.md) | query params | 

### Return type

[**MwGeneralBffInternalSchemasNotificationResponse**](MwGeneralBffInternalSchemasNotificationResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateNotificationSetting

> MwGeneralBffInternalSchemasNotificationSettingResponse UpdateNotificationSetting(ctx, notificationSettingId).Request(request).Execute()

Update notificationSetting by id

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	notificationSettingId := "notificationSettingId_example" // string | notification id
	request := *openapiclient.NewMwGeneralBffInternalSchemasUpdateNotificationSettingPayload(false) // MwGeneralBffInternalSchemasUpdateNotificationSettingPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationAPI.UpdateNotificationSetting(context.Background(), notificationSettingId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationAPI.UpdateNotificationSetting``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateNotificationSetting`: MwGeneralBffInternalSchemasNotificationSettingResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationAPI.UpdateNotificationSetting`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**notificationSettingId** | **string** | notification id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateNotificationSettingRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwGeneralBffInternalSchemasUpdateNotificationSettingPayload**](MwGeneralBffInternalSchemasUpdateNotificationSettingPayload.md) | query params | 

### Return type

[**MwGeneralBffInternalSchemasNotificationSettingResponse**](MwGeneralBffInternalSchemasNotificationSettingResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

