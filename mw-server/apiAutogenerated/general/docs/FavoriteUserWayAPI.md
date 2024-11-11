# \FavoriteUserWayAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateFavoriteUserWay**](FavoriteUserWayAPI.md#CreateFavoriteUserWay) | **Post** /favoriteUserWays | Create a new favoriteUserWay
[**DeleteFavoriteUserWay**](FavoriteUserWayAPI.md#DeleteFavoriteUserWay) | **Delete** /favoriteUserWays/{userUuid}/{wayUuid} | Delete favoriteUserWay by UUID



## CreateFavoriteUserWay

> CreateFavoriteUserWay(ctx).Request(request).Execute()

Create a new favoriteUserWay

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
	request := *openapiclient.NewMwserverInternalSchemasCreateFavoriteUserWayPayload("UserUuid_example", "WayUuid_example") // MwserverInternalSchemasCreateFavoriteUserWayPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.FavoriteUserWayAPI.CreateFavoriteUserWay(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FavoriteUserWayAPI.CreateFavoriteUserWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateFavoriteUserWayRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasCreateFavoriteUserWayPayload**](MwserverInternalSchemasCreateFavoriteUserWayPayload.md) | query params | 

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


## DeleteFavoriteUserWay

> DeleteFavoriteUserWay(ctx, userUuid, wayUuid).Execute()

Delete favoriteUserWay by UUID

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
	userUuid := "userUuid_example" // string | user UUID
	wayUuid := "wayUuid_example" // string | way ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.FavoriteUserWayAPI.DeleteFavoriteUserWay(context.Background(), userUuid, wayUuid).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FavoriteUserWayAPI.DeleteFavoriteUserWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userUuid** | **string** | user UUID | 
**wayUuid** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteFavoriteUserWayRequest struct via the builder pattern


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

