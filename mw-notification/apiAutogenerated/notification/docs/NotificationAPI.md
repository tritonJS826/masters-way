# \NotificationAPI

All URIs are relative to */notification*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateNotification**](NotificationAPI.md#CreateNotification) | **Post** /notifications | Create a new notification
[**GetNotificationList**](NotificationAPI.md#GetNotificationList) | **Get** /notifications | Get notification list by user id
[**UpdateNotification**](NotificationAPI.md#UpdateNotification) | **Patch** /notifications/{notificationId} | Update notification by id



## CreateNotification

> SchemasNotificationResponse CreateNotification(ctx).Request(request).Execute()

Create a new notification

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
	request := *openapiclient.NewSchemasCreateNotificationPayload("Description_example", "Nature_example", "Url_example") // SchemasCreateNotificationPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationAPI.CreateNotification(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationAPI.CreateNotification``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateNotification`: SchemasNotificationResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationAPI.CreateNotification`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateNotificationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateNotificationPayload**](SchemasCreateNotificationPayload.md) | query params | 

### Return type

[**SchemasNotificationResponse**](SchemasNotificationResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetNotificationList

> SchemasGetNotificationListResponse GetNotificationList(ctx).Execute()

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
	// response from `GetNotificationList`: SchemasGetNotificationListResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationAPI.GetNotificationList`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetNotificationListRequest struct via the builder pattern


### Return type

[**SchemasGetNotificationListResponse**](SchemasGetNotificationListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateNotification

> SchemasNotificationResponse UpdateNotification(ctx, notificationId).Request(request).Execute()

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
	request := *openapiclient.NewSchemasUpdateNotificationPayload(false) // SchemasUpdateNotificationPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationAPI.UpdateNotification(context.Background(), notificationId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationAPI.UpdateNotification``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateNotification`: SchemasNotificationResponse
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

 **request** | [**SchemasUpdateNotificationPayload**](SchemasUpdateNotificationPayload.md) | query params | 

### Return type

[**SchemasNotificationResponse**](SchemasNotificationResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

