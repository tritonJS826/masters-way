# \P2pAPI

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateP2pRoom**](P2pAPI.md#CreateP2pRoom) | **Post** /p2p-rooms | Create p2p room for user
[**GetP2pRoomById**](P2pAPI.md#GetP2pRoomById) | **Get** /p2p-rooms/{p2pRoomId} | Get p2p room by id
[**GetP2pRooms**](P2pAPI.md#GetP2pRooms) | **Get** /p2p-rooms | Get p2p rooms for user
[**MakeMessageInP2pRoom**](P2pAPI.md#MakeMessageInP2pRoom) | **Post** /p2p-rooms/{p2pRoomId}/messages | Create message in p2p room
[**UpdateP2pRoom**](P2pAPI.md#UpdateP2pRoom) | **Patch** /p2p-rooms/{p2pRoomId} | Update p2p room for user



## CreateP2pRoom

> SchemasMessageResponse CreateP2pRoom(ctx).Execute()

Create p2p room for user

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
	resp, r, err := apiClient.P2pAPI.CreateP2pRoom(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `P2pAPI.CreateP2pRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateP2pRoom`: SchemasMessageResponse
	fmt.Fprintf(os.Stdout, "Response from `P2pAPI.CreateP2pRoom`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiCreateP2pRoomRequest struct via the builder pattern


### Return type

[**SchemasMessageResponse**](SchemasMessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetP2pRoomById

> SchemasMessageResponse GetP2pRoomById(ctx, p2pRoomId).Execute()

Get p2p room by id

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
	p2pRoomId := "p2pRoomId_example" // string | p2p room Id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.P2pAPI.GetP2pRoomById(context.Background(), p2pRoomId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `P2pAPI.GetP2pRoomById``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetP2pRoomById`: SchemasMessageResponse
	fmt.Fprintf(os.Stdout, "Response from `P2pAPI.GetP2pRoomById`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**p2pRoomId** | **string** | p2p room Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetP2pRoomByIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SchemasMessageResponse**](SchemasMessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetP2pRooms

> SchemasGetRoomsResponse GetP2pRooms(ctx).Execute()

Get p2p rooms for user

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
	resp, r, err := apiClient.P2pAPI.GetP2pRooms(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `P2pAPI.GetP2pRooms``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetP2pRooms`: SchemasGetRoomsResponse
	fmt.Fprintf(os.Stdout, "Response from `P2pAPI.GetP2pRooms`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetP2pRoomsRequest struct via the builder pattern


### Return type

[**SchemasGetRoomsResponse**](SchemasGetRoomsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## MakeMessageInP2pRoom

> SchemasMessageResponse MakeMessageInP2pRoom(ctx, p2pRoomId).Request(request).Execute()

Create message in p2p room

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
	p2pRoomId := "p2pRoomId_example" // string | p2p room Id
	request := *openapiclient.NewSchemasCreateMessagePayload("Message_example", "RoomId_example") // SchemasCreateMessagePayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.P2pAPI.MakeMessageInP2pRoom(context.Background(), p2pRoomId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `P2pAPI.MakeMessageInP2pRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `MakeMessageInP2pRoom`: SchemasMessageResponse
	fmt.Fprintf(os.Stdout, "Response from `P2pAPI.MakeMessageInP2pRoom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**p2pRoomId** | **string** | p2p room Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiMakeMessageInP2pRoomRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**SchemasCreateMessagePayload**](SchemasCreateMessagePayload.md) | query params | 

### Return type

[**SchemasMessageResponse**](SchemasMessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateP2pRoom

> SchemasMessageResponse UpdateP2pRoom(ctx, p2pRoomId).Execute()

Update p2p room for user

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
	p2pRoomId := "p2pRoomId_example" // string | p2p room Id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.P2pAPI.UpdateP2pRoom(context.Background(), p2pRoomId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `P2pAPI.UpdateP2pRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateP2pRoom`: SchemasMessageResponse
	fmt.Fprintf(os.Stdout, "Response from `P2pAPI.UpdateP2pRoom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**p2pRoomId** | **string** | p2p room Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateP2pRoomRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SchemasMessageResponse**](SchemasMessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

