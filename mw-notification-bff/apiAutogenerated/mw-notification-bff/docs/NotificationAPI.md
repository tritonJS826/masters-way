# \NotificationAPI

All URIs are relative to */notification*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetNotificationList**](NotificationAPI.md#GetNotificationList) | **Get** /notifications | Get notification list by user id
[**UpdateNotification**](NotificationAPI.md#UpdateNotification) | **Patch** /notifications/{notificationId} | Update notification by id



## GetNotificationList

> MwNotificationBffInternalSchemasGetNotificationListResponse GetNotificationList(ctx).Execute()

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

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationAPI.GetNotificationList(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationAPI.GetNotificationList``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetNotificationList`: MwNotificationBffInternalSchemasGetNotificationListResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationAPI.GetNotificationList`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetNotificationListRequest struct via the builder pattern


### Return type

[**MwNotificationBffInternalSchemasGetNotificationListResponse**](MwNotificationBffInternalSchemasGetNotificationListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateNotification

> MwNotificationBffInternalSchemasNotificationResponse UpdateNotification(ctx, notificationId).Request(request).Execute()

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
	request := *openapiclient.NewMwNotificationBffInternalSchemasUpdateNotificationPayload(false) // MwNotificationBffInternalSchemasUpdateNotificationPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationAPI.UpdateNotification(context.Background(), notificationId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationAPI.UpdateNotification``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateNotification`: MwNotificationBffInternalSchemasNotificationResponse
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

 **request** | [**MwNotificationBffInternalSchemasUpdateNotificationPayload**](MwNotificationBffInternalSchemasUpdateNotificationPayload.md) | query params | 

### Return type

[**MwNotificationBffInternalSchemasNotificationResponse**](MwNotificationBffInternalSchemasNotificationResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

