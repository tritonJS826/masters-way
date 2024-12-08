# \JobDoneJobTagAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateJobDoneJobTag**](JobDoneJobTagAPI.md#CreateJobDoneJobTag) | **Post** /jobDoneJobTags | Create a new jobDoneJobTag
[**DeleteJobDoneJobTag**](JobDoneJobTagAPI.md#DeleteJobDoneJobTag) | **Delete** /jobDoneJobTags/{jobTagId}/{jobDoneId} | Delete jobDoneJobTag by UUID



## CreateJobDoneJobTag

> CreateJobDoneJobTag(ctx).Request(request).Execute()

Create a new jobDoneJobTag

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
	request := *openapiclient.NewMwServerInternalSchemasCreateJobDoneJobTagPayload("JobDoneUuid_example", "JobTagUuid_example") // MwServerInternalSchemasCreateJobDoneJobTagPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.JobDoneJobTagAPI.CreateJobDoneJobTag(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneJobTagAPI.CreateJobDoneJobTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateJobDoneJobTagRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasCreateJobDoneJobTagPayload**](MwServerInternalSchemasCreateJobDoneJobTagPayload.md) | query params | 

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


## DeleteJobDoneJobTag

> DeleteJobDoneJobTag(ctx, jobDoneId, jobTagId).Execute()

Delete jobDoneJobTag by UUID

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
	jobDoneId := "jobDoneId_example" // string | jobDone ID
	jobTagId := "jobTagId_example" // string | jobTag UUID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.JobDoneJobTagAPI.DeleteJobDoneJobTag(context.Background(), jobDoneId, jobTagId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneJobTagAPI.DeleteJobDoneJobTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**jobDoneId** | **string** | jobDone ID | 
**jobTagId** | **string** | jobTag UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteJobDoneJobTagRequest struct via the builder pattern


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

