# \PlanJobTagAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreatePlanJobTag**](PlanJobTagAPI.md#CreatePlanJobTag) | **Post** /planJobTags | Create a new planJobTag
[**DeletePlanJobTag**](PlanJobTagAPI.md#DeletePlanJobTag) | **Delete** /planJobTags/{jobTagId}/{planId} | Delete planJobTag by UUID



## CreatePlanJobTag

> CreatePlanJobTag(ctx).Request(request).Execute()

Create a new planJobTag

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
	request := *openapiclient.NewSchemasCreatePlanJobTagPayload("JobTagUuid_example", "PlanUuid_example") // SchemasCreatePlanJobTagPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.PlanJobTagAPI.CreatePlanJobTag(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PlanJobTagAPI.CreatePlanJobTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreatePlanJobTagRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreatePlanJobTagPayload**](SchemasCreatePlanJobTagPayload.md) | query params | 

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


## DeletePlanJobTag

> DeletePlanJobTag(ctx, jobTagId, planId).Execute()

Delete planJobTag by UUID

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
	planId := "planId_example" // string | plan ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.PlanJobTagAPI.DeletePlanJobTag(context.Background(), jobTagId, planId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PlanJobTagAPI.DeletePlanJobTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**jobTagId** | **string** | jobTag ID | 
**planId** | **string** | plan ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeletePlanJobTagRequest struct via the builder pattern


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

