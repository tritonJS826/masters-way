# \LabelAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateLabel**](LabelAPI.md#CreateLabel) | **Post** /labels | Create a new label
[**DeleteLabel**](LabelAPI.md#DeleteLabel) | **Delete** /labels/{labelId} | Delete label by UUID
[**UpdateLabel**](LabelAPI.md#UpdateLabel) | **Patch** /labels/{labelId} | Update label by UUID



## CreateLabel

> SchemasLabelResponse CreateLabel(ctx).Request(request).Execute()

Create a new label

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
	request := *openapiclient.NewSchemasCreateLabelPayload("Color_example", "Description_example", "Name_example", "WayUuid_example") // SchemasCreateLabelPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.LabelAPI.CreateLabel(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `LabelAPI.CreateLabel``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateLabel`: SchemasLabelResponse
	fmt.Fprintf(os.Stdout, "Response from `LabelAPI.CreateLabel`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateLabelRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateLabelPayload**](SchemasCreateLabelPayload.md) | query params | 

### Return type

[**SchemasLabelResponse**](SchemasLabelResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteLabel

> DeleteLabel(ctx, labelId).Execute()

Delete label by UUID



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

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.LabelAPI.DeleteLabel(context.Background(), labelId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `LabelAPI.DeleteLabel``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**labelId** | **string** | label ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteLabelRequest struct via the builder pattern


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


## UpdateLabel

> SchemasLabelResponse UpdateLabel(ctx, labelId).Request(request).Execute()

Update label by UUID

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
	labelId := "labelId_example" // string | label UUID
	request := *openapiclient.NewSchemasUpdateLabelPayload() // SchemasUpdateLabelPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.LabelAPI.UpdateLabel(context.Background(), labelId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `LabelAPI.UpdateLabel``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateLabel`: SchemasLabelResponse
	fmt.Fprintf(os.Stdout, "Response from `LabelAPI.UpdateLabel`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**labelId** | **string** | label UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateLabelRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**SchemasUpdateLabelPayload**](SchemasUpdateLabelPayload.md) | query params | 

### Return type

[**SchemasLabelResponse**](SchemasLabelResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

