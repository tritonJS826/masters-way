# \ProblemJobTagAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateProblemJobTag**](ProblemJobTagAPI.md#CreateProblemJobTag) | **Post** /problemJobTags | Create a new problemJobTag
[**DeleteProblemJobTag**](ProblemJobTagAPI.md#DeleteProblemJobTag) | **Delete** /problemJobTags/{jobTagId}/{problemId} | Delete problemJobTag by UUID



## CreateProblemJobTag

> CreateProblemJobTag(ctx).Request(request).Execute()

Create a new problemJobTag

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
	request := *openapiclient.NewSchemasCreateProblemJobTagPayload("JobTagUuid_example", "ProblemUuid_example") // SchemasCreateProblemJobTagPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.ProblemJobTagAPI.CreateProblemJobTag(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProblemJobTagAPI.CreateProblemJobTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateProblemJobTagRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateProblemJobTagPayload**](SchemasCreateProblemJobTagPayload.md) | query params | 

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


## DeleteProblemJobTag

> DeleteProblemJobTag(ctx, problemId, jobTagId).Execute()

Delete problemJobTag by UUID

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
	jobTagId := "jobTagId_example" // string | jobTag ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.ProblemJobTagAPI.DeleteProblemJobTag(context.Background(), problemId, jobTagId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProblemJobTagAPI.DeleteProblemJobTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**problemId** | **string** | problem ID | 
**jobTagId** | **string** | jobTag ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteProblemJobTagRequest struct via the builder pattern


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

