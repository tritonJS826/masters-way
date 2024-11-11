# \MetricAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateMetric**](MetricAPI.md#CreateMetric) | **Post** /metrics | Create a new metric
[**DeleteMetric**](MetricAPI.md#DeleteMetric) | **Delete** /metrics/{metricId} | Delete metric by UUID
[**UpdateMetric**](MetricAPI.md#UpdateMetric) | **Patch** /metrics/{metricId} | Update metric by UUID



## CreateMetric

> MwserverInternalSchemasMetricResponse CreateMetric(ctx).Request(request).Execute()

Create a new metric

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
	request := *openapiclient.NewMwserverInternalSchemasCreateMetricPayload("Description_example", "DoneDate_example", int32(123), false, "WayUuid_example") // MwserverInternalSchemasCreateMetricPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.MetricAPI.CreateMetric(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MetricAPI.CreateMetric``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateMetric`: MwserverInternalSchemasMetricResponse
	fmt.Fprintf(os.Stdout, "Response from `MetricAPI.CreateMetric`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateMetricRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasCreateMetricPayload**](MwserverInternalSchemasCreateMetricPayload.md) | query params | 

### Return type

[**MwserverInternalSchemasMetricResponse**](MwserverInternalSchemasMetricResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteMetric

> DeleteMetric(ctx, metricId).Execute()

Delete metric by UUID

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
	metricId := "metricId_example" // string | metric ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.MetricAPI.DeleteMetric(context.Background(), metricId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MetricAPI.DeleteMetric``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**metricId** | **string** | metric ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteMetricRequest struct via the builder pattern


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


## UpdateMetric

> MwserverInternalSchemasMetricResponse UpdateMetric(ctx, metricId).Request(request).Execute()

Update metric by UUID

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
	metricId := "metricId_example" // string | metric UUID
	request := *openapiclient.NewMwserverInternalSchemasUpdateMetricPayload() // MwserverInternalSchemasUpdateMetricPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.MetricAPI.UpdateMetric(context.Background(), metricId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MetricAPI.UpdateMetric``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateMetric`: MwserverInternalSchemasMetricResponse
	fmt.Fprintf(os.Stdout, "Response from `MetricAPI.UpdateMetric`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**metricId** | **string** | metric UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateMetricRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwserverInternalSchemasUpdateMetricPayload**](MwserverInternalSchemasUpdateMetricPayload.md) | query params | 

### Return type

[**MwserverInternalSchemasMetricResponse**](MwserverInternalSchemasMetricResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

