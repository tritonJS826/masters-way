# \FileAPI

All URIs are relative to */storage*

Method | HTTP request | Description
------------- | ------------- | -------------
[**DeleteFiles**](FileAPI.md#DeleteFiles) | **Delete** /files | Delete files by IDs
[**UploadFile**](FileAPI.md#UploadFile) | **Post** /files | Upload file to storage



## DeleteFiles

> DeleteFiles(ctx).FileIDs(fileIDs).Execute()

Delete files by IDs



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
	fileIDs := []string{"Property_example"} // []string | List of file IDs to delete

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.FileAPI.DeleteFiles(context.Background()).FileIDs(fileIDs).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FileAPI.DeleteFiles``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiDeleteFilesRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fileIDs** | **[]string** | List of file IDs to delete | 

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


## UploadFile

> SchemasUploadFileResponse UploadFile(ctx).File(file).Execute()

Upload file to storage



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
	file := os.NewFile(1234, "some_file") // *os.File | File to upload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.FileAPI.UploadFile(context.Background()).File(file).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FileAPI.UploadFile``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UploadFile`: SchemasUploadFileResponse
	fmt.Fprintf(os.Stdout, "Response from `FileAPI.UploadFile`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiUploadFileRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **file** | ***os.File** | File to upload | 

### Return type

[**SchemasUploadFileResponse**](SchemasUploadFileResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

