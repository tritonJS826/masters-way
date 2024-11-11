# \SocketAPI

All URIs are relative to *http://localhost/mw-chat-websocket*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ConnectSocket**](SocketAPI.md#ConnectSocket) | **Get** /ws | Connect to socket
[**SendMessageEvent**](SocketAPI.md#SendMessageEvent) | **Post** /messages | Send message to socket
[**SendRoomEvent**](SocketAPI.md#SendRoomEvent) | **Post** /rooms | Send created room event



## ConnectSocket

> ConnectSocket(ctx, token).Execute()

Connect to socket

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
	token := "token_example" // string | token

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.ConnectSocket(context.Background(), token).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.ConnectSocket``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**token** | **string** | token | 

### Other Parameters

Other parameters are passed through a pointer to a apiConnectSocketRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SendMessageEvent

> SendMessageEvent(ctx).Request(request).Execute()

Send message to socket

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
	request := *openapiclient.NewMwChatWebsocketInternalSchemasSendMessagePayload(*openapiclient.NewMwChatWebsocketInternalSchemasMessageResponse("Message_example", "MessageId_example", []openapiclient.MwChatWebsocketInternalSchemasMessageReader{*openapiclient.NewMwChatWebsocketInternalSchemasMessageReader("ImageUrl_example", "Name_example", "ReadDate_example", "UserId_example")}, "OwnerId_example", "OwnerImageUrl_example", "OwnerName_example", "RoomId_example"), []string{"Users_example"}) // MwChatWebsocketInternalSchemasSendMessagePayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.SendMessageEvent(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.SendMessageEvent``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSendMessageEventRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwChatWebsocketInternalSchemasSendMessagePayload**](MwChatWebsocketInternalSchemasSendMessagePayload.md) | query params | 

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


## SendRoomEvent

> SendRoomEvent(ctx).Request(request).Execute()

Send created room event

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
	request := *openapiclient.NewMwChatWebsocketInternalSchemasRoomPopulatedResponse("ImageUrl_example", []openapiclient.MwChatWebsocketInternalSchemasMessageResponse{*openapiclient.NewMwChatWebsocketInternalSchemasMessageResponse("Message_example", "MessageId_example", []openapiclient.MwChatWebsocketInternalSchemasMessageReader{*openapiclient.NewMwChatWebsocketInternalSchemasMessageReader("ImageUrl_example", "Name_example", "ReadDate_example", "UserId_example")}, "OwnerId_example", "OwnerImageUrl_example", "OwnerName_example", "RoomId_example")}, "Name_example", "RoomId_example", "RoomType_example", []openapiclient.MwChatWebsocketInternalSchemasUserResponse{*openapiclient.NewMwChatWebsocketInternalSchemasUserResponse("ImageUrl_example", "Name_example", "Role_example", "UserId_example")}) // MwChatWebsocketInternalSchemasRoomPopulatedResponse | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.SendRoomEvent(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.SendRoomEvent``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSendRoomEventRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwChatWebsocketInternalSchemasRoomPopulatedResponse**](MwChatWebsocketInternalSchemasRoomPopulatedResponse.md) | query params | 

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

