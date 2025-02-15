# \WayCollectionAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateWayCollection**](WayCollectionAPI.md#CreateWayCollection) | **Post** /wayCollections | Create a new wayCollection
[**DeleteWayCollection**](WayCollectionAPI.md#DeleteWayCollection) | **Delete** /wayCollections/{wayCollectionId} | Delete wayCollection by UUID
[**UpdateWayCollection**](WayCollectionAPI.md#UpdateWayCollection) | **Patch** /wayCollections/{wayCollectionId} | Update wayCollection by UUID



## CreateWayCollection

> MwServerInternalSchemasWayCollectionPopulatedResponse CreateWayCollection(ctx).Request(request).Execute()

Create a new wayCollection

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
	request := *openapiclient.NewMwServerInternalSchemasCreateWayCollectionPayload("Name_example", "OwnerUuid_example") // MwServerInternalSchemasCreateWayCollectionPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayCollectionAPI.CreateWayCollection(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayCollectionAPI.CreateWayCollection``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateWayCollection`: MwServerInternalSchemasWayCollectionPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `WayCollectionAPI.CreateWayCollection`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateWayCollectionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasCreateWayCollectionPayload**](MwServerInternalSchemasCreateWayCollectionPayload.md) | query params | 

### Return type

[**MwServerInternalSchemasWayCollectionPopulatedResponse**](MwServerInternalSchemasWayCollectionPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteWayCollection

> DeleteWayCollection(ctx, wayCollectionId).Execute()

Delete wayCollection by UUID

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
	wayCollectionId := "wayCollectionId_example" // string | wayCollection ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.WayCollectionAPI.DeleteWayCollection(context.Background(), wayCollectionId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayCollectionAPI.DeleteWayCollection``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayCollectionId** | **string** | wayCollection ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteWayCollectionRequest struct via the builder pattern


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


## UpdateWayCollection

> MwServerInternalSchemasWayCollectionPlainResponse UpdateWayCollection(ctx, wayCollectionId).Request(request).Execute()

Update wayCollection by UUID

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
	wayCollectionId := "wayCollectionId_example" // string | wayCollection ID
	request := *openapiclient.NewMwServerInternalSchemasUpdateWayCollectionPayload() // MwServerInternalSchemasUpdateWayCollectionPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayCollectionAPI.UpdateWayCollection(context.Background(), wayCollectionId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayCollectionAPI.UpdateWayCollection``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateWayCollection`: MwServerInternalSchemasWayCollectionPlainResponse
	fmt.Fprintf(os.Stdout, "Response from `WayCollectionAPI.UpdateWayCollection`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayCollectionId** | **string** | wayCollection ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateWayCollectionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwServerInternalSchemasUpdateWayCollectionPayload**](MwServerInternalSchemasUpdateWayCollectionPayload.md) | query params | 

### Return type

[**MwServerInternalSchemasWayCollectionPlainResponse**](MwServerInternalSchemasWayCollectionPlainResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

