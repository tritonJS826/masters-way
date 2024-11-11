# \RoomAPI

All URIs are relative to */chat*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddUserToRoom**](RoomAPI.md#AddUserToRoom) | **Post** /rooms/{roomId}/users/{userId} | Add user to room
[**CreateRoom**](RoomAPI.md#CreateRoom) | **Post** /rooms | Create room for user
[**DeleteUserFromRoom**](RoomAPI.md#DeleteUserFromRoom) | **Delete** /rooms/{roomId}/users/{userId} | Delete user from room
[**GetChatPreview**](RoomAPI.md#GetChatPreview) | **Get** /rooms/preview | Get chat preview
[**GetRoomById**](RoomAPI.md#GetRoomById) | **Get** /rooms/{roomId} | Get room by id
[**GetRooms**](RoomAPI.md#GetRooms) | **Get** /rooms/list/{roomType} | Get rooms for user
[**UpdateRoom**](RoomAPI.md#UpdateRoom) | **Patch** /rooms/{roomId} | Update room for user



## AddUserToRoom

> MwchatInternalSchemasRoomPreviewResponse AddUserToRoom(ctx, roomId, userId).Execute()

Add user to room

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
	roomId := "roomId_example" // string | room Id
	userId := "userId_example" // string | user Id to delete

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.RoomAPI.AddUserToRoom(context.Background(), roomId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RoomAPI.AddUserToRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AddUserToRoom`: MwchatInternalSchemasRoomPreviewResponse
	fmt.Fprintf(os.Stdout, "Response from `RoomAPI.AddUserToRoom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**roomId** | **string** | room Id | 
**userId** | **string** | user Id to delete | 

### Other Parameters

Other parameters are passed through a pointer to a apiAddUserToRoomRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------



### Return type

[**MwchatInternalSchemasRoomPreviewResponse**](MwchatInternalSchemasRoomPreviewResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateRoom

> MwchatInternalSchemasRoomPopulatedResponse CreateRoom(ctx).Request(request).Execute()

Create room for user

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
	request := *openapiclient.NewMwchatInternalSchemasCreateRoomPayload("RoomType_example") // MwchatInternalSchemasCreateRoomPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.RoomAPI.CreateRoom(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RoomAPI.CreateRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateRoom`: MwchatInternalSchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `RoomAPI.CreateRoom`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateRoomRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwchatInternalSchemasCreateRoomPayload**](MwchatInternalSchemasCreateRoomPayload.md) | query params | 

### Return type

[**MwchatInternalSchemasRoomPopulatedResponse**](MwchatInternalSchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteUserFromRoom

> DeleteUserFromRoom(ctx, roomId, userId).Execute()

Delete user from room

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
	roomId := "roomId_example" // string | room Id
	userId := "userId_example" // string | user Id to delete

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.RoomAPI.DeleteUserFromRoom(context.Background(), roomId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RoomAPI.DeleteUserFromRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**roomId** | **string** | room Id | 
**userId** | **string** | user Id to delete | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteUserFromRoomRequest struct via the builder pattern


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


## GetChatPreview

> MwchatInternalSchemasGetChatPreviewResponse GetChatPreview(ctx).Execute()

Get chat preview

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
	resp, r, err := apiClient.RoomAPI.GetChatPreview(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RoomAPI.GetChatPreview``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetChatPreview`: MwchatInternalSchemasGetChatPreviewResponse
	fmt.Fprintf(os.Stdout, "Response from `RoomAPI.GetChatPreview`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetChatPreviewRequest struct via the builder pattern


### Return type

[**MwchatInternalSchemasGetChatPreviewResponse**](MwchatInternalSchemasGetChatPreviewResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetRoomById

> MwchatInternalSchemasRoomPopulatedResponse GetRoomById(ctx, roomId).Execute()

Get room by id

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
	roomId := "roomId_example" // string | room Id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.RoomAPI.GetRoomById(context.Background(), roomId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RoomAPI.GetRoomById``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetRoomById`: MwchatInternalSchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `RoomAPI.GetRoomById`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**roomId** | **string** | room Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetRoomByIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwchatInternalSchemasRoomPopulatedResponse**](MwchatInternalSchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetRooms

> MwchatInternalSchemasGetRoomsResponse GetRooms(ctx, roomType).Execute()

Get rooms for user

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
	roomType := "roomType_example" // string | room type: private | group

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.RoomAPI.GetRooms(context.Background(), roomType).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RoomAPI.GetRooms``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetRooms`: MwchatInternalSchemasGetRoomsResponse
	fmt.Fprintf(os.Stdout, "Response from `RoomAPI.GetRooms`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**roomType** | **string** | room type: private | group | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetRoomsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwchatInternalSchemasGetRoomsResponse**](MwchatInternalSchemasGetRoomsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateRoom

> MwchatInternalSchemasRoomPopulatedResponse UpdateRoom(ctx, roomId).Execute()

Update room for user

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
	roomId := "roomId_example" // string | room Id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.RoomAPI.UpdateRoom(context.Background(), roomId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RoomAPI.UpdateRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateRoom`: MwchatInternalSchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `RoomAPI.UpdateRoom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**roomId** | **string** | room Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateRoomRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwchatInternalSchemasRoomPopulatedResponse**](MwchatInternalSchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

