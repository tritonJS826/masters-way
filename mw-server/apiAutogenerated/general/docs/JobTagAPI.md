# \JobTagAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateJobTag**](JobTagAPI.md#CreateJobTag) | **Post** /jobTags | Create a new jobTag
[**DeleteJobTag**](JobTagAPI.md#DeleteJobTag) | **Delete** /jobTags/{jobTagId} | Delete jobTag by UUID
[**UpdateJobTag**](JobTagAPI.md#UpdateJobTag) | **Patch** /jobTags/{jobTagId} | Update jobTag by UUID



## CreateJobTag

> SchemasJobTagResponse CreateJobTag(ctx).Request(request).Execute()

Create a new jobTag

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
	request := *openapiclient.NewSchemasCreateJobTagPayload("Color_example", "Description_example", "Name_example", "WayUuid_example") // SchemasCreateJobTagPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.JobTagAPI.CreateJobTag(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobTagAPI.CreateJobTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateJobTag`: SchemasJobTagResponse
	fmt.Fprintf(os.Stdout, "Response from `JobTagAPI.CreateJobTag`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateJobTagRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateJobTagPayload**](SchemasCreateJobTagPayload.md) | query params | 

### Return type

[**SchemasJobTagResponse**](SchemasJobTagResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteJobTag

> DeleteJobTag(ctx, jobTagId).Execute()

Delete jobTag by UUID

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
	jobTagId := "jobTagId_example" // string | jobTag ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.JobTagAPI.DeleteJobTag(context.Background(), jobTagId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobTagAPI.DeleteJobTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**jobTagId** | **string** | jobTag ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteJobTagRequest struct via the builder pattern


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


## UpdateJobTag

> SchemasJobTagResponse UpdateJobTag(ctx, jobTagId).Request(request).Execute()

Update jobTag by UUID

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
	jobTagId := "jobTagId_example" // string | jobTag UUID
	request := *openapiclient.NewSchemasUpdateJobTagPayload() // SchemasUpdateJobTagPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.JobTagAPI.UpdateJobTag(context.Background(), jobTagId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `JobTagAPI.UpdateJobTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateJobTag`: SchemasJobTagResponse
	fmt.Fprintf(os.Stdout, "Response from `JobTagAPI.UpdateJobTag`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**jobTagId** | **string** | jobTag UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateJobTagRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**SchemasUpdateJobTagPayload**](SchemasUpdateJobTagPayload.md) | query params | 

### Return type

[**SchemasJobTagResponse**](SchemasJobTagResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

