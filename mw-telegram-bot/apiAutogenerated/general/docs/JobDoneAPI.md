# \JobDoneAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateJobDone**](JobDoneAPI.md#CreateJobDone) | **Post** /jobDones | Create a new jobDone
[**DeleteJobDone**](JobDoneAPI.md#DeleteJobDone) | **Delete** /jobDones/{jobDoneId} | Delete jobDone by UUID
[**UpdateJobDone**](JobDoneAPI.md#UpdateJobDone) | **Patch** /jobDones/{jobDoneId} | Update jobDone by UUID



## CreateJobDone

> MwGeneralBffInternalSchemasJobDonePopulatedResponse CreateJobDone(ctx).Request(request).Execute()

Create a new jobDone

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasCreateJobDonePayload("DayReportUuid_example", "Description_example", []string{"JobTagUuids_example"}, "OwnerUuid_example", int32(123)) // MwGeneralBffInternalSchemasCreateJobDonePayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.JobDoneAPI.CreateJobDone(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneAPI.CreateJobDone``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateJobDone`: MwGeneralBffInternalSchemasJobDonePopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `JobDoneAPI.CreateJobDone`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateJobDoneRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasCreateJobDonePayload**](MwGeneralBffInternalSchemasCreateJobDonePayload.md) | query params | 

### Return type

[**MwGeneralBffInternalSchemasJobDonePopulatedResponse**](MwGeneralBffInternalSchemasJobDonePopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteJobDone

> DeleteJobDone(ctx, jobDoneId).Execute()

Delete jobDone by UUID

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

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.JobDoneAPI.DeleteJobDone(context.Background(), jobDoneId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneAPI.DeleteJobDone``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**jobDoneId** | **string** | jobDone ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteJobDoneRequest struct via the builder pattern


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


## UpdateJobDone

> MwGeneralBffInternalSchemasJobDonePopulatedResponse UpdateJobDone(ctx, jobDoneId).Request(request).Execute()

Update jobDone by UUID

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
	jobDoneId := "jobDoneId_example" // string | jobDone UUID
	request := *openapiclient.NewMwGeneralBffInternalSchemasUpdateJobDone() // MwGeneralBffInternalSchemasUpdateJobDone | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.JobDoneAPI.UpdateJobDone(context.Background(), jobDoneId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneAPI.UpdateJobDone``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateJobDone`: MwGeneralBffInternalSchemasJobDonePopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `JobDoneAPI.UpdateJobDone`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**jobDoneId** | **string** | jobDone UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateJobDoneRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwGeneralBffInternalSchemasUpdateJobDone**](MwGeneralBffInternalSchemasUpdateJobDone.md) | query params | 

### Return type

[**MwGeneralBffInternalSchemasJobDonePopulatedResponse**](MwGeneralBffInternalSchemasJobDonePopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

