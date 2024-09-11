# \JobDoneLabelAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateJobDoneLabel**](JobDoneLabelAPI.md#CreateJobDoneLabel) | **Post** /jobDoneLabels | Create a new jobDoneLabel
[**DeleteJobDoneLabel**](JobDoneLabelAPI.md#DeleteJobDoneLabel) | **Delete** /jobDoneLabels/{labelId}/{jobDoneId} | Delete jobDoneLabel by UUID



## CreateJobDoneLabel

> CreateJobDoneLabel(ctx).Request(request).Execute()

Create a new jobDoneLabel

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
	request := *openapiclient.NewSchemasCreateJobDoneLabelPayload("JobDoneUuid_example", "LabelUuid_example") // SchemasCreateJobDoneLabelPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.JobDoneLabelAPI.CreateJobDoneLabel(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneLabelAPI.CreateJobDoneLabel``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateJobDoneLabelRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateJobDoneLabelPayload**](SchemasCreateJobDoneLabelPayload.md) | query params | 

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


## DeleteJobDoneLabel

> DeleteJobDoneLabel(ctx, jobDoneId, labelId).Execute()

Delete jobDoneLabel by UUID

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
	labelId := "labelId_example" // string | label UUID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.JobDoneLabelAPI.DeleteJobDoneLabel(context.Background(), jobDoneId, labelId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneLabelAPI.DeleteJobDoneLabel``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**jobDoneId** | **string** | jobDone ID | 
**labelId** | **string** | label UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteJobDoneLabelRequest struct via the builder pattern


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

