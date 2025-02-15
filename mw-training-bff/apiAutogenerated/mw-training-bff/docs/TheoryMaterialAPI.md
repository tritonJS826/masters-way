# \TheoryMaterialAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateTheoryMaterial**](TheoryMaterialAPI.md#CreateTheoryMaterial) | **Post** /theoryMaterials | Create theory material
[**DeleteTheoryMaterial**](TheoryMaterialAPI.md#DeleteTheoryMaterial) | **Delete** /theoryMaterials/{theoryMaterialId} | Delete theory material
[**GetTheoryMaterialsByTopicId**](TheoryMaterialAPI.md#GetTheoryMaterialsByTopicId) | **Get** /theoryMaterials/{topicId} | Get theory material by topic id
[**UpdateTheoryMaterial**](TheoryMaterialAPI.md#UpdateTheoryMaterial) | **Patch** /theoryMaterials | Update theory material



## CreateTheoryMaterial

> MwTrainingBffInternalSchemasTheoryMaterial CreateTheoryMaterial(ctx).Request(request).Execute()

Create theory material

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreateTheoryMaterialPayload("Description_example", "Name_example", "TopicUuid_example") // MwTrainingBffInternalSchemasCreateTheoryMaterialPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TheoryMaterialAPI.CreateTheoryMaterial(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TheoryMaterialAPI.CreateTheoryMaterial``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateTheoryMaterial`: MwTrainingBffInternalSchemasTheoryMaterial
	fmt.Fprintf(os.Stdout, "Response from `TheoryMaterialAPI.CreateTheoryMaterial`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateTheoryMaterialRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasCreateTheoryMaterialPayload**](MwTrainingBffInternalSchemasCreateTheoryMaterialPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasTheoryMaterial**](MwTrainingBffInternalSchemasTheoryMaterial.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteTheoryMaterial

> DeleteTheoryMaterial(ctx, theoryMaterialId).Execute()

Delete theory material

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
	theoryMaterialId := "theoryMaterialId_example" // string | theory material id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TheoryMaterialAPI.DeleteTheoryMaterial(context.Background(), theoryMaterialId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TheoryMaterialAPI.DeleteTheoryMaterial``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**theoryMaterialId** | **string** | theory material id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteTheoryMaterialRequest struct via the builder pattern


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


## GetTheoryMaterialsByTopicId

> MwTrainingBffInternalSchemasTheoryMaterials GetTheoryMaterialsByTopicId(ctx, topicId).Execute()

Get theory material by topic id

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
	resp, r, err := apiClient.TheoryMaterialAPI.GetTheoryMaterialsByTopicId(context.Background(), topicId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TheoryMaterialAPI.GetTheoryMaterialsByTopicId``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTheoryMaterialsByTopicId`: MwTrainingBffInternalSchemasTheoryMaterials
	fmt.Fprintf(os.Stdout, "Response from `TheoryMaterialAPI.GetTheoryMaterialsByTopicId`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**topicId** | **string** | topic id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetTheoryMaterialsByTopicIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwTrainingBffInternalSchemasTheoryMaterials**](MwTrainingBffInternalSchemasTheoryMaterials.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateTheoryMaterial

> MwTrainingBffInternalSchemasTheoryMaterial UpdateTheoryMaterial(ctx).Request(request).Execute()

Update theory material

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasUpdateTheoryMaterialPayload() // MwTrainingBffInternalSchemasUpdateTheoryMaterialPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TheoryMaterialAPI.UpdateTheoryMaterial(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TheoryMaterialAPI.UpdateTheoryMaterial``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateTheoryMaterial`: MwTrainingBffInternalSchemasTheoryMaterial
	fmt.Fprintf(os.Stdout, "Response from `TheoryMaterialAPI.UpdateTheoryMaterial`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiUpdateTheoryMaterialRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasUpdateTheoryMaterialPayload**](MwTrainingBffInternalSchemasUpdateTheoryMaterialPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasTheoryMaterial**](MwTrainingBffInternalSchemasTheoryMaterial.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

