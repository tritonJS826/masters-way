# \GroupAPI

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AcceptRequestToGroupRoom**](GroupAPI.md#AcceptRequestToGroupRoom) | **Post** /group-rooms/{groupRoomId}/requests/accept | Accept request to group room
[**AddUserToGroup**](GroupAPI.md#AddUserToGroup) | **Post** /group-rooms/{groupRoomId}/users/{userId} | Add user to group room
[**CreateGroupRooms**](GroupAPI.md#CreateGroupRooms) | **Post** /group-rooms | Create group rooms for user
[**CreateMessageInGroupRoom**](GroupAPI.md#CreateMessageInGroupRoom) | **Post** /group-rooms/{groupRoomId}/messages | Create message to group room
[**CreateRequestsToGroupRoom**](GroupAPI.md#CreateRequestsToGroupRoom) | **Post** /group-rooms/requests | Create requests to group room
[**DeclineRequestToGroupRoom**](GroupAPI.md#DeclineRequestToGroupRoom) | **Delete** /group-rooms/{groupRoomId}/requests/decline | Decline request to group room
[**DeleteUserToGroup**](GroupAPI.md#DeleteUserToGroup) | **Delete** /group-rooms/{groupRoomId}/users/{userId} | Delete user to group room
[**GetGroupRoomById**](GroupAPI.md#GetGroupRoomById) | **Get** /group-rooms/{groupRoomId} | Get group room by id
[**GetGroupRooms**](GroupAPI.md#GetGroupRooms) | **Get** /group-rooms | Get group rooms preview for user
[**GetRequestsToGroupRoom**](GroupAPI.md#GetRequestsToGroupRoom) | **Get** /group-rooms/requests | Get requests to group room
[**UpdateGroupRooms**](GroupAPI.md#UpdateGroupRooms) | **Patch** /group-rooms/{groupRoomId} | Update group rooms for user



## AcceptRequestToGroupRoom

> SchemasRoomPopulatedResponse AcceptRequestToGroupRoom(ctx, groupRoomId).Execute()

Accept request to group room

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
	groupRoomId := "groupRoomId_example" // string | groupRoom Id to accept request

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GroupAPI.AcceptRequestToGroupRoom(context.Background(), groupRoomId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.AcceptRequestToGroupRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AcceptRequestToGroupRoom`: SchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.AcceptRequestToGroupRoom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupRoomId** | **string** | groupRoom Id to accept request | 

### Other Parameters

Other parameters are passed through a pointer to a apiAcceptRequestToGroupRoomRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SchemasRoomPopulatedResponse**](SchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AddUserToGroup

> SchemasRoomPopulatedResponse AddUserToGroup(ctx, groupRoomId, userId).Execute()

Add user to group room

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
	groupRoomId := "groupRoomId_example" // string | group room Id
	userId := "userId_example" // string | user Id to delete

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GroupAPI.AddUserToGroup(context.Background(), groupRoomId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.AddUserToGroup``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AddUserToGroup`: SchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.AddUserToGroup`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupRoomId** | **string** | group room Id | 
**userId** | **string** | user Id to delete | 

### Other Parameters

Other parameters are passed through a pointer to a apiAddUserToGroupRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------



### Return type

[**SchemasRoomPopulatedResponse**](SchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateGroupRooms

> SchemasRoomPopulatedResponse CreateGroupRooms(ctx).Execute()

Create group rooms for user

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
	resp, r, err := apiClient.GroupAPI.CreateGroupRooms(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.CreateGroupRooms``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateGroupRooms`: SchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.CreateGroupRooms`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiCreateGroupRoomsRequest struct via the builder pattern


### Return type

[**SchemasRoomPopulatedResponse**](SchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateMessageInGroupRoom

> SchemasMessageResponse CreateMessageInGroupRoom(ctx, groupRoomId).Request(request).Execute()

Create message to group room

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
	groupRoomId := "groupRoomId_example" // string | group room Id
	request := *openapiclient.NewSchemasCreateMessagePayload("Message_example", "RoomId_example") // SchemasCreateMessagePayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GroupAPI.CreateMessageInGroupRoom(context.Background(), groupRoomId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.CreateMessageInGroupRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateMessageInGroupRoom`: SchemasMessageResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.CreateMessageInGroupRoom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupRoomId** | **string** | group room Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiCreateMessageInGroupRoomRequest struct via the builder pattern


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


## CreateRequestsToGroupRoom

> CreateRequestsToGroupRoom(ctx).Request(request).Execute()

Create requests to group room

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
	request := *openapiclient.NewSchemasCreateRequestToGroupRoomPayload("RoomId_example", "UserId_example") // SchemasCreateRequestToGroupRoomPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.GroupAPI.CreateRequestsToGroupRoom(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.CreateRequestsToGroupRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateRequestsToGroupRoomRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateRequestToGroupRoomPayload**](SchemasCreateRequestToGroupRoomPayload.md) | query params | 

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


## DeclineRequestToGroupRoom

> SchemasDeclineRequestToGroupRoomResponse DeclineRequestToGroupRoom(ctx, groupRoomId).Execute()

Decline request to group room

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
	groupRoomId := "groupRoomId_example" // string | groupRoom Id to delete request

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GroupAPI.DeclineRequestToGroupRoom(context.Background(), groupRoomId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.DeclineRequestToGroupRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `DeclineRequestToGroupRoom`: SchemasDeclineRequestToGroupRoomResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.DeclineRequestToGroupRoom`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupRoomId** | **string** | groupRoom Id to delete request | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeclineRequestToGroupRoomRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SchemasDeclineRequestToGroupRoomResponse**](SchemasDeclineRequestToGroupRoomResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteUserToGroup

> SchemasRoomPopulatedResponse DeleteUserToGroup(ctx, groupRoomId, userId).Execute()

Delete user to group room

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
	groupRoomId := "groupRoomId_example" // string | group room Id
	userId := "userId_example" // string | user Id to delete

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GroupAPI.DeleteUserToGroup(context.Background(), groupRoomId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.DeleteUserToGroup``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `DeleteUserToGroup`: SchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.DeleteUserToGroup`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupRoomId** | **string** | group room Id | 
**userId** | **string** | user Id to delete | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteUserToGroupRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------



### Return type

[**SchemasRoomPopulatedResponse**](SchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetGroupRoomById

> SchemasRoomPopulatedResponse GetGroupRoomById(ctx, groupRoomId).Execute()

Get group room by id

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
	groupRoomId := "groupRoomId_example" // string | group room Id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GroupAPI.GetGroupRoomById(context.Background(), groupRoomId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.GetGroupRoomById``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetGroupRoomById`: SchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.GetGroupRoomById`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupRoomId** | **string** | group room Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetGroupRoomByIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SchemasRoomPopulatedResponse**](SchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetGroupRooms

> SchemasGetRoomsResponse GetGroupRooms(ctx).Execute()

Get group rooms preview for user

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
	resp, r, err := apiClient.GroupAPI.GetGroupRooms(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.GetGroupRooms``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetGroupRooms`: SchemasGetRoomsResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.GetGroupRooms`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetGroupRoomsRequest struct via the builder pattern


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


## GetRequestsToGroupRoom

> SchemasGetRequestsToGroupRoomResponse GetRequestsToGroupRoom(ctx).Execute()

Get requests to group room

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
	resp, r, err := apiClient.GroupAPI.GetRequestsToGroupRoom(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.GetRequestsToGroupRoom``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetRequestsToGroupRoom`: SchemasGetRequestsToGroupRoomResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.GetRequestsToGroupRoom`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetRequestsToGroupRoomRequest struct via the builder pattern


### Return type

[**SchemasGetRequestsToGroupRoomResponse**](SchemasGetRequestsToGroupRoomResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateGroupRooms

> SchemasRoomPopulatedResponse UpdateGroupRooms(ctx, groupRoomId).Execute()

Update group rooms for user

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
	groupRoomId := "groupRoomId_example" // string | group room Id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GroupAPI.UpdateGroupRooms(context.Background(), groupRoomId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GroupAPI.UpdateGroupRooms``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateGroupRooms`: SchemasRoomPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `GroupAPI.UpdateGroupRooms`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**groupRoomId** | **string** | group room Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateGroupRoomsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**SchemasRoomPopulatedResponse**](SchemasRoomPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

