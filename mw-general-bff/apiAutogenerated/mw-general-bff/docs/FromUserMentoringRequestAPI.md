# \FromUserMentoringRequestAPI

All URIs are relative to *http://localhost/general-bff*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateFromUserMentoringRequest**](FromUserMentoringRequestAPI.md#CreateFromUserMentoringRequest) | **Post** /fromUserMentoringRequests | Create a new fromUserMentoringRequest
[**DeleteFromUserMentoringRequest**](FromUserMentoringRequestAPI.md#DeleteFromUserMentoringRequest) | **Delete** /fromUserMentoringRequests/{userUuid}/{wayUuid} | Delete fromUserMentoringRequest by UUID



## CreateFromUserMentoringRequest

> SchemasFromUserMentoringRequestResponse CreateFromUserMentoringRequest(ctx).Request(request).Execute()

Create a new fromUserMentoringRequest

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
	request := *openapiclient.NewSchemasCreateFromUserMentoringRequestPayload("UserUuid_example", "WayUuid_example") // SchemasCreateFromUserMentoringRequestPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.FromUserMentoringRequestAPI.CreateFromUserMentoringRequest(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FromUserMentoringRequestAPI.CreateFromUserMentoringRequest``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateFromUserMentoringRequest`: SchemasFromUserMentoringRequestResponse
	fmt.Fprintf(os.Stdout, "Response from `FromUserMentoringRequestAPI.CreateFromUserMentoringRequest`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateFromUserMentoringRequestRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateFromUserMentoringRequestPayload**](SchemasCreateFromUserMentoringRequestPayload.md) | query params | 

### Return type

[**SchemasFromUserMentoringRequestResponse**](SchemasFromUserMentoringRequestResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteFromUserMentoringRequest

> DeleteFromUserMentoringRequest(ctx, userUuid, wayUuid).Execute()

Delete fromUserMentoringRequest by UUID

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
	wayUuid := "wayUuid_example" // string | way UUID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.FromUserMentoringRequestAPI.DeleteFromUserMentoringRequest(context.Background(), userUuid, wayUuid).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FromUserMentoringRequestAPI.DeleteFromUserMentoringRequest``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userUuid** | **string** | user UUID | 
**wayUuid** | **string** | way UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteFromUserMentoringRequestRequest struct via the builder pattern


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

