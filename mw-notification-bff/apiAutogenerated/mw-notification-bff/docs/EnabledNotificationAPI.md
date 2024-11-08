# \EnabledNotificationAPI

All URIs are relative to */notification*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetEnabledNotificationList**](EnabledNotificationAPI.md#GetEnabledNotificationList) | **Get** /enabledNotifications | Get enabledNotification list by user id
[**UpdateEnabledNotification**](EnabledNotificationAPI.md#UpdateEnabledNotification) | **Patch** /enabledNotifications/{enabledNotificationId} | Update enabledNotification by id



## GetEnabledNotificationList

> SchemasGetEnabledNotificationListResponse GetEnabledNotificationList(ctx).Execute()

Get enabledNotification list by user id

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
	resp, r, err := apiClient.EnabledNotificationAPI.GetEnabledNotificationList(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `EnabledNotificationAPI.GetEnabledNotificationList``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetEnabledNotificationList`: SchemasGetEnabledNotificationListResponse
	fmt.Fprintf(os.Stdout, "Response from `EnabledNotificationAPI.GetEnabledNotificationList`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetEnabledNotificationListRequest struct via the builder pattern


### Return type

[**SchemasGetEnabledNotificationListResponse**](SchemasGetEnabledNotificationListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateEnabledNotification

> SchemasEnabledNotificationResponse UpdateEnabledNotification(ctx, enabledNotificationId).Request(request).Execute()

Update enabledNotification by id

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
	enabledNotificationId := "enabledNotificationId_example" // string | notification id
	request := *openapiclient.NewSchemasUpdateEnabledNotificationPayload(false) // SchemasUpdateEnabledNotificationPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.EnabledNotificationAPI.UpdateEnabledNotification(context.Background(), enabledNotificationId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `EnabledNotificationAPI.UpdateEnabledNotification``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateEnabledNotification`: SchemasEnabledNotificationResponse
	fmt.Fprintf(os.Stdout, "Response from `EnabledNotificationAPI.UpdateEnabledNotification`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**enabledNotificationId** | **string** | notification id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateEnabledNotificationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**SchemasUpdateEnabledNotificationPayload**](SchemasUpdateEnabledNotificationPayload.md) | query params | 

### Return type

[**SchemasEnabledNotificationResponse**](SchemasEnabledNotificationResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

