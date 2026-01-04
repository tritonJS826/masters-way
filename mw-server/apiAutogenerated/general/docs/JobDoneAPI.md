# \JobDoneAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateJobDone**](JobDoneAPI.md#CreateJobDone) | **Post** /jobDones | Create a new jobDone
[**CreateJobDoneTelegram**](JobDoneAPI.md#CreateJobDoneTelegram) | **Post** /jobDones/telegram | Create job done for telegram
[**DeleteJobDone**](JobDoneAPI.md#DeleteJobDone) | **Delete** /jobDones/{jobDoneId} | Delete jobDone by UUID
[**UpdateJobDone**](JobDoneAPI.md#UpdateJobDone) | **Patch** /jobDones/{jobDoneId} | Update jobDone by UUID



## CreateJobDone

> MwServerInternalSchemasJobDonePopulatedResponse CreateJobDone(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwServerInternalSchemasCreateJobDonePayload("DayReportUuid_example", "Description_example", []string{"JobTagUuids_example"}, "OwnerUuid_example", int32(123)) // MwServerInternalSchemasCreateJobDonePayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.JobDoneAPI.CreateJobDone(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneAPI.CreateJobDone``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateJobDone`: MwServerInternalSchemasJobDonePopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `JobDoneAPI.CreateJobDone`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateJobDoneRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasCreateJobDonePayload**](MwServerInternalSchemasCreateJobDonePayload.md) | query params | 

### Return type

[**MwServerInternalSchemasJobDonePopulatedResponse**](MwServerInternalSchemasJobDonePopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateJobDoneTelegram

> MwServerInternalSchemasJobDonePopulatedResponse CreateJobDoneTelegram(ctx).Request(request).Execute()

Create job done for telegram



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
	request := *openapiclient.NewMwServerInternalSchemasCreateJobDoneForTelegramPayload("Description_example", "OwnerUuid_example", int32(123), "WayUuid_example") // MwServerInternalSchemasCreateJobDoneForTelegramPayload | Job done payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.JobDoneAPI.CreateJobDoneTelegram(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneAPI.CreateJobDoneTelegram``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateJobDoneTelegram`: MwServerInternalSchemasJobDonePopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `JobDoneAPI.CreateJobDoneTelegram`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateJobDoneTelegramRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasCreateJobDoneForTelegramPayload**](MwServerInternalSchemasCreateJobDoneForTelegramPayload.md) | Job done payload | 

### Return type

[**MwServerInternalSchemasJobDonePopulatedResponse**](MwServerInternalSchemasJobDonePopulatedResponse.md)

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
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateJobDone

> MwServerInternalSchemasJobDonePopulatedResponse UpdateJobDone(ctx, jobDoneId).Request(request).Execute()

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
	request := *openapiclient.NewMwServerInternalSchemasUpdateJobDone() // MwServerInternalSchemasUpdateJobDone | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.JobDoneAPI.UpdateJobDone(context.Background(), jobDoneId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobDoneAPI.UpdateJobDone``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateJobDone`: MwServerInternalSchemasJobDonePopulatedResponse
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

 **request** | [**MwServerInternalSchemasUpdateJobDone**](MwServerInternalSchemasUpdateJobDone.md) | query params | 

### Return type

[**MwServerInternalSchemasJobDonePopulatedResponse**](MwServerInternalSchemasJobDonePopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

