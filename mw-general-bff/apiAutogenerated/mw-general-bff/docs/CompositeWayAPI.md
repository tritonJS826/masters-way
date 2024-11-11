# \CompositeWayAPI

All URIs are relative to *http://localhost/general-bff*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateCompositeWay**](CompositeWayAPI.md#CreateCompositeWay) | **Post** /compositeWay | Add a way to composite way
[**DeleteCompositeWayRelation**](CompositeWayAPI.md#DeleteCompositeWayRelation) | **Delete** /compositeWay/{parentWayId}/{childWayId} | Delete composite way relation



## CreateCompositeWay

> SchemasCompositeWayRelation CreateCompositeWay(ctx).Request(request).Execute()

Add a way to composite way

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
	request := *openapiclient.NewSchemasAddWayToCompositeWayPayload("ChildWayUuid_example", "ParentWayUuid_example") // SchemasAddWayToCompositeWayPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.CompositeWayAPI.CreateCompositeWay(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CompositeWayAPI.CreateCompositeWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateCompositeWay`: SchemasCompositeWayRelation
	fmt.Fprintf(os.Stdout, "Response from `CompositeWayAPI.CreateCompositeWay`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateCompositeWayRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasAddWayToCompositeWayPayload**](SchemasAddWayToCompositeWayPayload.md) | query params | 

### Return type

[**SchemasCompositeWayRelation**](SchemasCompositeWayRelation.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteCompositeWayRelation

> DeleteCompositeWayRelation(ctx, parentWayId, childWayId).Execute()

Delete composite way relation

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
	parentWayId := "parentWayId_example" // string | parentWay ID
	childWayId := "childWayId_example" // string | childWay ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.CompositeWayAPI.DeleteCompositeWayRelation(context.Background(), parentWayId, childWayId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CompositeWayAPI.DeleteCompositeWayRelation``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**parentWayId** | **string** | parentWay ID | 
**childWayId** | **string** | childWay ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteCompositeWayRelationRequest struct via the builder pattern


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

