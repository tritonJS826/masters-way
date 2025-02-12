# \PracticeMaterialAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreatePracticeMaterial**](PracticeMaterialAPI.md#CreatePracticeMaterial) | **Post** /practiceMaterials | Create practice material
[**DeletePracticeMaterial**](PracticeMaterialAPI.md#DeletePracticeMaterial) | **Delete** /practiceMaterials/{practiceMaterialId} | Delete practice material
[**GetPracticeMaterialsByTopicId**](PracticeMaterialAPI.md#GetPracticeMaterialsByTopicId) | **Get** /practiceMaterials/{topicId} | Get practice material by topic id
[**UpdatePracticeMaterial**](PracticeMaterialAPI.md#UpdatePracticeMaterial) | **Patch** /practiceMaterials | Update practice material



## CreatePracticeMaterial

> MwTrainingBffInternalSchemasPracticeMaterial CreatePracticeMaterial(ctx).Request(request).Execute()

Create practice material

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreatePracticeMaterialPayload("Answer_example", "Name_example", "PracticeType_example", "TaskDescription_example", int32(123), "TopicUuid_example") // MwTrainingBffInternalSchemasCreatePracticeMaterialPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PracticeMaterialAPI.CreatePracticeMaterial(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PracticeMaterialAPI.CreatePracticeMaterial``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreatePracticeMaterial`: MwTrainingBffInternalSchemasPracticeMaterial
	fmt.Fprintf(os.Stdout, "Response from `PracticeMaterialAPI.CreatePracticeMaterial`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreatePracticeMaterialRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasCreatePracticeMaterialPayload**](MwTrainingBffInternalSchemasCreatePracticeMaterialPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasPracticeMaterial**](MwTrainingBffInternalSchemasPracticeMaterial.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeletePracticeMaterial

> DeletePracticeMaterial(ctx, practiceMaterialId).Execute()

Delete practice material

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
	practiceMaterialId := "practiceMaterialId_example" // string | practice material id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.PracticeMaterialAPI.DeletePracticeMaterial(context.Background(), practiceMaterialId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PracticeMaterialAPI.DeletePracticeMaterial``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**practiceMaterialId** | **string** | practice material id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeletePracticeMaterialRequest struct via the builder pattern


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


## GetPracticeMaterialsByTopicId

> MwTrainingBffInternalSchemasPracticeMaterials GetPracticeMaterialsByTopicId(ctx, topicId).Execute()

Get practice material by topic id

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
	topicId := "topicId_example" // string | topic id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PracticeMaterialAPI.GetPracticeMaterialsByTopicId(context.Background(), topicId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PracticeMaterialAPI.GetPracticeMaterialsByTopicId``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetPracticeMaterialsByTopicId`: MwTrainingBffInternalSchemasPracticeMaterials
	fmt.Fprintf(os.Stdout, "Response from `PracticeMaterialAPI.GetPracticeMaterialsByTopicId`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**topicId** | **string** | topic id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetPracticeMaterialsByTopicIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwTrainingBffInternalSchemasPracticeMaterials**](MwTrainingBffInternalSchemasPracticeMaterials.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdatePracticeMaterial

> MwTrainingBffInternalSchemasPracticeMaterial UpdatePracticeMaterial(ctx).Request(request).Execute()

Update practice material

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasUpdatePracticeMaterialPayload() // MwTrainingBffInternalSchemasUpdatePracticeMaterialPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PracticeMaterialAPI.UpdatePracticeMaterial(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PracticeMaterialAPI.UpdatePracticeMaterial``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdatePracticeMaterial`: MwTrainingBffInternalSchemasPracticeMaterial
	fmt.Fprintf(os.Stdout, "Response from `PracticeMaterialAPI.UpdatePracticeMaterial`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiUpdatePracticeMaterialRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasUpdatePracticeMaterialPayload**](MwTrainingBffInternalSchemasUpdatePracticeMaterialPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasPracticeMaterial**](MwTrainingBffInternalSchemasPracticeMaterial.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

