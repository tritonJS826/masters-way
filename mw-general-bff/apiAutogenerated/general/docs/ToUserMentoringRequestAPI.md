# \ToUserMentoringRequestAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateUserMentoringRequest**](ToUserMentoringRequestAPI.md#CreateUserMentoringRequest) | **Post** /toUserMentoringRequests | Create a new userMentoringRequest
[**DeleteToUserMentoringRequest**](ToUserMentoringRequestAPI.md#DeleteToUserMentoringRequest) | **Delete** /toUserMentoringRequests/{userUuid}/{wayUuid} | Delete toUserMentoringReques by UUID



## CreateUserMentoringRequest

> SchemasToUserMentoringRequestResponse CreateUserMentoringRequest(ctx).Request(request).Execute()

Create a new userMentoringRequest

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
	request := *openapiclient.NewSchemasCreateToUserMentoringRequestPayload("UserUuid_example", "WayUuid_example") // SchemasCreateToUserMentoringRequestPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ToUserMentoringRequestAPI.CreateUserMentoringRequest(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ToUserMentoringRequestAPI.CreateUserMentoringRequest``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateUserMentoringRequest`: SchemasToUserMentoringRequestResponse
	fmt.Fprintf(os.Stdout, "Response from `ToUserMentoringRequestAPI.CreateUserMentoringRequest`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateUserMentoringRequestRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateToUserMentoringRequestPayload**](SchemasCreateToUserMentoringRequestPayload.md) | query params | 

### Return type

[**SchemasToUserMentoringRequestResponse**](SchemasToUserMentoringRequestResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteToUserMentoringRequest

> DeleteToUserMentoringRequest(ctx, userUuid, wayUuid).Execute()

Delete toUserMentoringReques by UUID

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
	r, err := apiClient.ToUserMentoringRequestAPI.DeleteToUserMentoringRequest(context.Background(), userUuid, wayUuid).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ToUserMentoringRequestAPI.DeleteToUserMentoringRequest``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteToUserMentoringRequestRequest struct via the builder pattern


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

