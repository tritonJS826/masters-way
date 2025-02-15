# \FavoriteUserTrainingAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateFavoriteUserTraining**](FavoriteUserTrainingAPI.md#CreateFavoriteUserTraining) | **Post** /favoriteUserTrainings/{trainingId} | Create favorite user training
[**DeleteFavoriteUserTraining**](FavoriteUserTrainingAPI.md#DeleteFavoriteUserTraining) | **Delete** /favoriteUserTrainings/{trainingId} | Delete favorite user training



## CreateFavoriteUserTraining

> CreateFavoriteUserTraining(ctx, trainingId).Execute()

Create favorite user training

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
	r, err := apiClient.FavoriteUserTrainingAPI.CreateFavoriteUserTraining(context.Background(), trainingId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FavoriteUserTrainingAPI.CreateFavoriteUserTraining``: %v\n", err)
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

Other parameters are passed through a pointer to a apiCreateFavoriteUserTrainingRequest struct via the builder pattern


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


## DeleteFavoriteUserTraining

> DeleteFavoriteUserTraining(ctx, trainingId).Execute()

Delete favorite user training

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
	r, err := apiClient.FavoriteUserTrainingAPI.DeleteFavoriteUserTraining(context.Background(), trainingId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FavoriteUserTrainingAPI.DeleteFavoriteUserTraining``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteFavoriteUserTrainingRequest struct via the builder pattern


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

