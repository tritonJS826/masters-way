# \MessageAPI

All URIs are relative to */chat*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateGreetingMessage**](MessageAPI.md#CreateGreetingMessage) | **Post** /messages/greeting | Create greeting message
[**CreateMessage**](MessageAPI.md#CreateMessage) | **Post** /messages | Create message
[**UpdateMessageStatus**](MessageAPI.md#UpdateMessageStatus) | **Patch** /messages/{messageId}/message-status | Update message status



## CreateGreetingMessage

> CreateGreetingMessage(ctx).Request(request).Execute()

Create greeting message

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
	request := *openapiclient.NewMwChatInternalSchemasCreateGreetingMessagePayload("RoomId_example") // MwChatInternalSchemasCreateGreetingMessagePayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.MessageAPI.CreateGreetingMessage(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MessageAPI.CreateGreetingMessage``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateGreetingMessageRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwChatInternalSchemasCreateGreetingMessagePayload**](MwChatInternalSchemasCreateGreetingMessagePayload.md) | query params | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateMessage

> MwChatInternalSchemasCreateMessageResponse CreateMessage(ctx).Request(request).Execute()

Create message

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
	request := *openapiclient.NewMwChatInternalSchemasCreateMessagePayload("Message_example", "RoomId_example") // MwChatInternalSchemasCreateMessagePayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.MessageAPI.CreateMessage(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MessageAPI.CreateMessage``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateMessage`: MwChatInternalSchemasCreateMessageResponse
	fmt.Fprintf(os.Stdout, "Response from `MessageAPI.CreateMessage`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateMessageRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwChatInternalSchemasCreateMessagePayload**](MwChatInternalSchemasCreateMessagePayload.md) | query params | 

### Return type

[**MwChatInternalSchemasCreateMessageResponse**](MwChatInternalSchemasCreateMessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateMessageStatus

> UpdateMessageStatus(ctx, messageId).Request(request).Execute()

Update message status



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
	messageId := "messageId_example" // string | message Id
	request := *openapiclient.NewMwChatInternalSchemasUpdateMessageStatusPayload(false) // MwChatInternalSchemasUpdateMessageStatusPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.MessageAPI.UpdateMessageStatus(context.Background(), messageId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MessageAPI.UpdateMessageStatus``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**messageId** | **string** | message Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateMessageStatusRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwChatInternalSchemasUpdateMessageStatusPayload**](MwChatInternalSchemasUpdateMessageStatusPayload.md) | query params | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

