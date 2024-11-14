# \PlanAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreatePlan**](PlanAPI.md#CreatePlan) | **Post** /plans | Create a new plan
[**DeletePlan**](PlanAPI.md#DeletePlan) | **Delete** /plans/{planId} | Delete plan by UUID
[**UpdatePlan**](PlanAPI.md#UpdatePlan) | **Patch** /plans/{planId} | Update plan by UUID



## CreatePlan

> MwServerInternalSchemasPlanPopulatedResponse CreatePlan(ctx).Request(request).Execute()

Create a new plan

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
	request := *openapiclient.NewMwServerInternalSchemasCreatePlanPayload("DayReportUuid_example", "Description_example", false, "OwnerUuid_example", int32(123)) // MwServerInternalSchemasCreatePlanPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PlanAPI.CreatePlan(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PlanAPI.CreatePlan``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreatePlan`: MwServerInternalSchemasPlanPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `PlanAPI.CreatePlan`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreatePlanRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasCreatePlanPayload**](MwServerInternalSchemasCreatePlanPayload.md) | query params | 

### Return type

[**MwServerInternalSchemasPlanPopulatedResponse**](MwServerInternalSchemasPlanPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeletePlan

> DeletePlan(ctx, planId).Execute()

Delete plan by UUID

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
	planId := "planId_example" // string | plan ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.PlanAPI.DeletePlan(context.Background(), planId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PlanAPI.DeletePlan``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**planId** | **string** | plan ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeletePlanRequest struct via the builder pattern


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


## UpdatePlan

> MwServerInternalSchemasPlanPopulatedResponse UpdatePlan(ctx, planId).Request(request).Execute()

Update plan by UUID

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
	planId := "planId_example" // string | plan UUID
	request := *openapiclient.NewMwServerInternalSchemasUpdatePlanPayload() // MwServerInternalSchemasUpdatePlanPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PlanAPI.UpdatePlan(context.Background(), planId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PlanAPI.UpdatePlan``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdatePlan`: MwServerInternalSchemasPlanPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `PlanAPI.UpdatePlan`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**planId** | **string** | plan UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdatePlanRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwServerInternalSchemasUpdatePlanPayload**](MwServerInternalSchemasUpdatePlanPayload.md) | query params | 

### Return type

[**MwServerInternalSchemasPlanPopulatedResponse**](MwServerInternalSchemasPlanPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

