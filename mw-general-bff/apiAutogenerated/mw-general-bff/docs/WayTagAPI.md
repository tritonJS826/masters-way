# \WayTagAPI

All URIs are relative to *http://localhost/general-bff*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateWayTag**](WayTagAPI.md#CreateWayTag) | **Post** /wayTags | Create a new wayTag
[**DeleteWayTag**](WayTagAPI.md#DeleteWayTag) | **Delete** /wayTags/{wayTagId}/{wayId} | Delete wayTag by UUID



## CreateWayTag

> SchemasWayTagResponse CreateWayTag(ctx).Request(request).Execute()

Create a new wayTag

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
	request := *openapiclient.NewSchemasCreateWayTagPayload("Name_example", "WayUuid_example") // SchemasCreateWayTagPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayTagAPI.CreateWayTag(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayTagAPI.CreateWayTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateWayTag`: SchemasWayTagResponse
	fmt.Fprintf(os.Stdout, "Response from `WayTagAPI.CreateWayTag`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateWayTagRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateWayTagPayload**](SchemasCreateWayTagPayload.md) | query params | 

### Return type

[**SchemasWayTagResponse**](SchemasWayTagResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteWayTag

> DeleteWayTag(ctx, wayTagId, wayId).Execute()

Delete wayTag by UUID

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
	wayTagId := "wayTagId_example" // string | wayTag ID
	wayId := "wayId_example" // string | way ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.WayTagAPI.DeleteWayTag(context.Background(), wayTagId, wayId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayTagAPI.DeleteWayTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayTagId** | **string** | wayTag ID | 
**wayId** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteWayTagRequest struct via the builder pattern


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

