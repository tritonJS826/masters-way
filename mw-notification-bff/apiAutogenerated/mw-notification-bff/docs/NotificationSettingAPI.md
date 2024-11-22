# \NotificationSettingAPI

All URIs are relative to */notification*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetNotificationSettingList**](NotificationSettingAPI.md#GetNotificationSettingList) | **Get** /notificationSettings | Get notificationSetting list by user id
[**UpdateNotificationSetting**](NotificationSettingAPI.md#UpdateNotificationSetting) | **Patch** /notificationSettings/{notificationSettingId} | Update notificationSetting by id



## GetNotificationSettingList

> MwNotificationBffInternalSchemasGetNotificationSettingListResponse GetNotificationSettingList(ctx).Execute()

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
	resp, r, err := apiClient.NotificationSettingAPI.GetNotificationSettingList(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationSettingAPI.GetNotificationSettingList``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetNotificationSettingList`: MwNotificationBffInternalSchemasGetNotificationSettingListResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationSettingAPI.GetNotificationSettingList`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetNotificationSettingListRequest struct via the builder pattern


### Return type

[**MwNotificationBffInternalSchemasGetNotificationSettingListResponse**](MwNotificationBffInternalSchemasGetNotificationSettingListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateNotificationSetting

> MwNotificationBffInternalSchemasNotificationSettingResponse UpdateNotificationSetting(ctx, notificationSettingId).Request(request).Execute()

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
	request := *openapiclient.NewMwNotificationBffInternalSchemasUpdateNotificationSettingPayload(false) // MwNotificationBffInternalSchemasUpdateNotificationSettingPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.NotificationSettingAPI.UpdateNotificationSetting(context.Background(), notificationSettingId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `NotificationSettingAPI.UpdateNotificationSetting``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateNotificationSetting`: MwNotificationBffInternalSchemasNotificationSettingResponse
	fmt.Fprintf(os.Stdout, "Response from `NotificationSettingAPI.UpdateNotificationSetting`: %v\n", resp)
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

 **request** | [**MwNotificationBffInternalSchemasUpdateNotificationSettingPayload**](MwNotificationBffInternalSchemasUpdateNotificationSettingPayload.md) | query params | 

### Return type

[**MwNotificationBffInternalSchemasNotificationSettingResponse**](MwNotificationBffInternalSchemasNotificationSettingResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

