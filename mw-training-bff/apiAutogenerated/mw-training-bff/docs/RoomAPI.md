# \RoomAPI

All URIs are relative to */training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddUserToRoom**](RoomAPI.md#AddUserToRoom) | **Post** /rooms/{roomId}/users/{userId} | Add user to room
[**DeleteUserFromRoom**](RoomAPI.md#DeleteUserFromRoom) | **Delete** /rooms/{roomId}/users/{userId} | Delete user from room
[**FindOrCreateRoom**](RoomAPI.md#FindOrCreateRoom) | **Post** /rooms | Find or create room for user
[**GetChatPreview**](RoomAPI.md#GetChatPreview) | **Get** /rooms/preview | Get chat preview
[**GetRoomById**](RoomAPI.md#GetRoomById) | **Get** /rooms/{roomId} | Get room by id
[**GetRooms**](RoomAPI.md#GetRooms) | **Get** /rooms/list/{roomType} | Get rooms for user
[**UpdateRoom**](RoomAPI.md#UpdateRoom) | **Patch** /rooms/{roomId} | Update room



## AddUserToRoom

> MwTrainingBffInternalSchemasRoomPopulatedResponse AddUserToRoom(ctx, roomId, userId).Execute()

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
	// response from `AddUserToRoom`: MwTrainingBffInternalSchemasRoomPopulatedResponse
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

[**MwTrainingBffInternalSchemasRoomPopulatedResponse**](MwTrainingBffInternalSchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteUserFromRoom

> MwTrainingBffInternalSchemasRoomPopulatedResponse DeleteUserFromRoom(ctx, roomId, userId).Execute()

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
	resp, r, err := apiClient.RoomAPI.DeleteUserFromRoom(context.Background(), roomId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RoomAPI.DeleteUserFromRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `DeleteUserFromRoom`: MwTrainingBffInternalSchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `RoomAPI.DeleteUserFromRoom`: %v\n", resp)
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

[**MwTrainingBffInternalSchemasRoomPopulatedResponse**](MwTrainingBffInternalSchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## FindOrCreateRoom

> MwTrainingBffInternalSchemasRoomPopulatedResponse FindOrCreateRoom(ctx).Request(request).Execute()

Find or create room for user

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreateRoomPayload("RoomType_example") // MwTrainingBffInternalSchemasCreateRoomPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.RoomAPI.FindOrCreateRoom(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `RoomAPI.FindOrCreateRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `FindOrCreateRoom`: MwTrainingBffInternalSchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `RoomAPI.FindOrCreateRoom`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiFindOrCreateRoomRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasCreateRoomPayload**](MwTrainingBffInternalSchemasCreateRoomPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasRoomPopulatedResponse**](MwTrainingBffInternalSchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetChatPreview

> MwTrainingBffInternalSchemasGetRoomPreviewResponse GetChatPreview(ctx).Execute()

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
	// response from `GetChatPreview`: MwTrainingBffInternalSchemasGetRoomPreviewResponse
	fmt.Fprintf(os.Stdout, "Response from `RoomAPI.GetChatPreview`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetChatPreviewRequest struct via the builder pattern


### Return type

[**MwTrainingBffInternalSchemasGetRoomPreviewResponse**](MwTrainingBffInternalSchemasGetRoomPreviewResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetRoomById

> MwTrainingBffInternalSchemasRoomPopulatedResponse GetRoomById(ctx, roomId).Execute()

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
	// response from `GetRoomById`: MwTrainingBffInternalSchemasRoomPopulatedResponse
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

[**MwTrainingBffInternalSchemasRoomPopulatedResponse**](MwTrainingBffInternalSchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetRooms

> MwTrainingBffInternalSchemasGetRoomsResponse GetRooms(ctx, roomType).Execute()

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
	// response from `GetRooms`: MwTrainingBffInternalSchemasGetRoomsResponse
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

[**MwTrainingBffInternalSchemasGetRoomsResponse**](MwTrainingBffInternalSchemasGetRoomsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateRoom

> MwTrainingBffInternalSchemasRoomPopulatedResponse UpdateRoom(ctx, roomId).Execute()

Update room

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
	// response from `UpdateRoom`: MwTrainingBffInternalSchemasRoomPopulatedResponse
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

[**MwTrainingBffInternalSchemasRoomPopulatedResponse**](MwTrainingBffInternalSchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

