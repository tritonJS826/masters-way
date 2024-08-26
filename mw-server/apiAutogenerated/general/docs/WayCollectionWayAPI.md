# \WayCollectionWayAPI

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateWayCollectionWay**](WayCollectionWayAPI.md#CreateWayCollectionWay) | **Post** /wayCollectionWays | Create a new wayCollectionWay
[**DeleteWayCollectionWay**](WayCollectionWayAPI.md#DeleteWayCollectionWay) | **Delete** /wayCollectionWays/{wayId}/{wayCollectionId} | Delete wayCollectionWay by UUID



## CreateWayCollectionWay

> SchemasWayCollectionWayResponse CreateWayCollectionWay(ctx).Request(request).Execute()

Create a new wayCollectionWay

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
	request := *openapiclient.NewSchemasCreateWayCollectionWay("WayCollectionUuid_example", "WayUuid_example") // SchemasCreateWayCollectionWay | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayCollectionWayAPI.CreateWayCollectionWay(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayCollectionWayAPI.CreateWayCollectionWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateWayCollectionWay`: SchemasWayCollectionWayResponse
	fmt.Fprintf(os.Stdout, "Response from `WayCollectionWayAPI.CreateWayCollectionWay`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateWayCollectionWayRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateWayCollectionWay**](SchemasCreateWayCollectionWay.md) | query params | 

### Return type

[**SchemasWayCollectionWayResponse**](SchemasWayCollectionWayResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteWayCollectionWay

> DeleteWayCollectionWay(ctx, wayCollectionId, wayId).Execute()

Delete wayCollectionWay by UUID

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
	wayId := "wayId_example" // string | way ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.WayCollectionWayAPI.DeleteWayCollectionWay(context.Background(), wayCollectionId, wayId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayCollectionWayAPI.DeleteWayCollectionWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayCollectionId** | **string** | wayCollection ID | 
**wayId** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteWayCollectionWayRequest struct via the builder pattern


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

