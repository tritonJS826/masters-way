# \TrainingAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateTraining**](TrainingAPI.md#CreateTraining) | **Post** /trainings | Create training
[**DeleteTraining**](TrainingAPI.md#DeleteTraining) | **Delete** /trainings/{trainingId} | Delete training by id
[**GetTrainingById**](TrainingAPI.md#GetTrainingById) | **Get** /trainings/{trainingId} | Get training by Id
[**GetTrainingList**](TrainingAPI.md#GetTrainingList) | **Get** /trainings | GEt training list
[**GetTrainingListByUser**](TrainingAPI.md#GetTrainingListByUser) | **Get** /trainings/users/{userId} | Get training list by user
[**UpdateTraining**](TrainingAPI.md#UpdateTraining) | **Patch** /trainings/{trainingId} | Update training by id



## CreateTraining

> MwTrainingBffInternalSchemasTraining CreateTraining(ctx).Request(request).Execute()

Create training

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreateTrainingPayload("Description_example", false, "Name_example") // MwTrainingBffInternalSchemasCreateTrainingPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TrainingAPI.CreateTraining(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingAPI.CreateTraining``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateTraining`: MwTrainingBffInternalSchemasTraining
	fmt.Fprintf(os.Stdout, "Response from `TrainingAPI.CreateTraining`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateTrainingRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasCreateTrainingPayload**](MwTrainingBffInternalSchemasCreateTrainingPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasTraining**](MwTrainingBffInternalSchemasTraining.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteTraining

> DeleteTraining(ctx, trainingId).Execute()

Delete training by id

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
	trainingId := "trainingId_example" // string | training id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TrainingAPI.DeleteTraining(context.Background(), trainingId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingAPI.DeleteTraining``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**trainingId** | **string** | training id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteTrainingRequest struct via the builder pattern


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


## GetTrainingById

> MwTrainingBffInternalSchemasTraining GetTrainingById(ctx, trainingId).Execute()

Get training by Id

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
	trainingId := "trainingId_example" // string | training id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TrainingAPI.GetTrainingById(context.Background(), trainingId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingAPI.GetTrainingById``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTrainingById`: MwTrainingBffInternalSchemasTraining
	fmt.Fprintf(os.Stdout, "Response from `TrainingAPI.GetTrainingById`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**trainingId** | **string** | training id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetTrainingByIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwTrainingBffInternalSchemasTraining**](MwTrainingBffInternalSchemasTraining.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetTrainingList

> MwTrainingBffInternalSchemasTrainingList GetTrainingList(ctx).Page(page).Limit(limit).TrainingName(trainingName).Execute()

GEt training list

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
	page := int32(56) // int32 | Page number for pagination - 1 by default (optional)
	limit := int32(56) // int32 | Number of items per page - 50 by default (optional)
	trainingName := "trainingName_example" // string | Training name (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TrainingAPI.GetTrainingList(context.Background()).Page(page).Limit(limit).TrainingName(trainingName).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingAPI.GetTrainingList``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTrainingList`: MwTrainingBffInternalSchemasTrainingList
	fmt.Fprintf(os.Stdout, "Response from `TrainingAPI.GetTrainingList`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetTrainingListRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int32** | Page number for pagination - 1 by default | 
 **limit** | **int32** | Number of items per page - 50 by default | 
 **trainingName** | **string** | Training name | 

### Return type

[**MwTrainingBffInternalSchemasTrainingList**](MwTrainingBffInternalSchemasTrainingList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetTrainingListByUser

> MwTrainingBffInternalSchemasTrainingList GetTrainingListByUser(ctx, userId).TrainingsType(trainingsType).Execute()

Get training list by user

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
	trainingsType := "trainingsType_example" // string | enum: student | mentor | owner | favorite
	userId := "userId_example" // string | user id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TrainingAPI.GetTrainingListByUser(context.Background(), userId).TrainingsType(trainingsType).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingAPI.GetTrainingListByUser``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTrainingListByUser`: MwTrainingBffInternalSchemasTrainingList
	fmt.Fprintf(os.Stdout, "Response from `TrainingAPI.GetTrainingListByUser`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | user id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetTrainingListByUserRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **trainingsType** | **string** | enum: student | mentor | owner | favorite | 


### Return type

[**MwTrainingBffInternalSchemasTrainingList**](MwTrainingBffInternalSchemasTrainingList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateTraining

> MwTrainingBffInternalSchemasTraining UpdateTraining(ctx, trainingId).Request(request).Execute()

Update training by id

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
	trainingId := "trainingId_example" // string | training id
	request := *openapiclient.NewMwTrainingBffInternalSchemasUpdateTrainingPayload() // MwTrainingBffInternalSchemasUpdateTrainingPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TrainingAPI.UpdateTraining(context.Background(), trainingId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingAPI.UpdateTraining``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateTraining`: MwTrainingBffInternalSchemasTraining
	fmt.Fprintf(os.Stdout, "Response from `TrainingAPI.UpdateTraining`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**trainingId** | **string** | training id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateTrainingRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTrainingBffInternalSchemasUpdateTrainingPayload**](MwTrainingBffInternalSchemasUpdateTrainingPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasTraining**](MwTrainingBffInternalSchemasTraining.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

