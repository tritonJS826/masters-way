# \PlanLabelAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreatePlanLabel**](PlanLabelAPI.md#CreatePlanLabel) | **Post** /planLabels | Create a new planLabel
[**DeletePlanLabel**](PlanLabelAPI.md#DeletePlanLabel) | **Delete** /planLabels/{labelId}/{planId} | Delete planLabel by UUID



## CreatePlanLabel

> CreatePlanLabel(ctx).Request(request).Execute()

Create a new planLabel

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
	request := *openapiclient.NewSchemasCreatePlanLabelPayload("LabelUuid_example", "PlanUuid_example") // SchemasCreatePlanLabelPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.PlanLabelAPI.CreatePlanLabel(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PlanLabelAPI.CreatePlanLabel``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreatePlanLabelRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreatePlanLabelPayload**](SchemasCreatePlanLabelPayload.md) | query params | 

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


## DeletePlanLabel

> DeletePlanLabel(ctx, labelId, planId).Execute()

Delete planLabel by UUID

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
	labelId := "labelId_example" // string | label ID
	planId := "planId_example" // string | plan ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.PlanLabelAPI.DeletePlanLabel(context.Background(), labelId, planId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PlanLabelAPI.DeletePlanLabel``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**labelId** | **string** | label ID | 
**planId** | **string** | plan ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeletePlanLabelRequest struct via the builder pattern


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

