# \FavoriteUserAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateFavoriteUser**](FavoriteUserAPI.md#CreateFavoriteUser) | **Post** /favoriteUsers | Create a new favorite user
[**DeleteFavoriteUser**](FavoriteUserAPI.md#DeleteFavoriteUser) | **Delete** /favoriteUsers/{donorUserUuid}/{acceptorUserUuid} | Delete favoriteUser by UUID



## CreateFavoriteUser

> CreateFavoriteUser(ctx).Request(request).Execute()

Create a new favorite user

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
	request := *openapiclient.NewMwserverInternalSchemasCreateFavoriteUserPayload("AcceptorUserUuid_example", "DonorUserUuid_example") // MwserverInternalSchemasCreateFavoriteUserPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.FavoriteUserAPI.CreateFavoriteUser(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FavoriteUserAPI.CreateFavoriteUser``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateFavoriteUserRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasCreateFavoriteUserPayload**](MwserverInternalSchemasCreateFavoriteUserPayload.md) | query params | 

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


## DeleteFavoriteUser

> DeleteFavoriteUser(ctx, donorUserUuid, acceptorUserUuid).Execute()

Delete favoriteUser by UUID

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
	donorUserUuid := "donorUserUuid_example" // string | donorUser UUID
	acceptorUserUuid := "acceptorUserUuid_example" // string | acceptorUser UUID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.FavoriteUserAPI.DeleteFavoriteUser(context.Background(), donorUserUuid, acceptorUserUuid).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FavoriteUserAPI.DeleteFavoriteUser``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**donorUserUuid** | **string** | donorUser UUID | 
**acceptorUserUuid** | **string** | acceptorUser UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteFavoriteUserRequest struct via the builder pattern


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

