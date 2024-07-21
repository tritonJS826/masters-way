# \ProblemAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateProblem**](ProblemAPI.md#CreateProblem) | **Post** /problems | Create a new problem
[**DeleteProblem**](ProblemAPI.md#DeleteProblem) | **Delete** /problems/{problemId} | Delete problem by UUID
[**UpdateProblem**](ProblemAPI.md#UpdateProblem) | **Patch** /problems/{problemId} | Update problem by UUID



## CreateProblem

> SchemasProblemPopulatedResponse CreateProblem(ctx).Request(request).Execute()

Create a new problem

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
	request := *openapiclient.NewSchemasCreateProblemPayload("DayReportUuid_example", "Description_example", false, "OwnerUuid_example") // SchemasCreateProblemPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProblemAPI.CreateProblem(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProblemAPI.CreateProblem``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateProblem`: SchemasProblemPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `ProblemAPI.CreateProblem`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateProblemRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateProblemPayload**](SchemasCreateProblemPayload.md) | query params | 

### Return type

[**SchemasProblemPopulatedResponse**](SchemasProblemPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteProblem

> DeleteProblem(ctx, problemId).Execute()

Delete problem by UUID

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
	problemId := "problemId_example" // string | problem ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.ProblemAPI.DeleteProblem(context.Background(), problemId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProblemAPI.DeleteProblem``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**problemId** | **string** | problem ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteProblemRequest struct via the builder pattern


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


## UpdateProblem

> SchemasProblemPopulatedResponse UpdateProblem(ctx, problemId).Request(request).Execute()

Update problem by UUID

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
	problemId := "problemId_example" // string | problem ID
	request := *openapiclient.NewSchemasUpdateProblemPayload() // SchemasUpdateProblemPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProblemAPI.UpdateProblem(context.Background(), problemId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProblemAPI.UpdateProblem``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateProblem`: SchemasProblemPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `ProblemAPI.UpdateProblem`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**problemId** | **string** | problem ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateProblemRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**SchemasUpdateProblemPayload**](SchemasUpdateProblemPayload.md) | query params | 

### Return type

[**SchemasProblemPopulatedResponse**](SchemasProblemPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

