# \SurveyAPI

All URIs are relative to */survey*

Method | HTTP request | Description
------------- | ------------- | -------------
[**SurveyUserIntro**](SurveyAPI.md#SurveyUserIntro) | **Post** /survey/user-intro | Post survey user intro



## SurveyUserIntro

> SurveyUserIntro(ctx).DeviceId(deviceId).PreferredInterfaceLanguage(preferredInterfaceLanguage).Role(role).Source(source).StudentExperience(studentExperience).StudentGoals(studentGoals).WhyRegistered(whyRegistered).Execute()

Post survey user intro



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
	deviceId := "deviceId_example" // string | 
	preferredInterfaceLanguage := "preferredInterfaceLanguage_example" // string | 
	role := "role_example" // string | 
	source := "source_example" // string | 
	studentExperience := "studentExperience_example" // string | 
	studentGoals := "studentGoals_example" // string | 
	whyRegistered := "whyRegistered_example" // string | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SurveyAPI.SurveyUserIntro(context.Background()).DeviceId(deviceId).PreferredInterfaceLanguage(preferredInterfaceLanguage).Role(role).Source(source).StudentExperience(studentExperience).StudentGoals(studentGoals).WhyRegistered(whyRegistered).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SurveyAPI.SurveyUserIntro``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSurveyUserIntroRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deviceId** | **string** |  | 
 **preferredInterfaceLanguage** | **string** |  | 
 **role** | **string** |  | 
 **source** | **string** |  | 
 **studentExperience** | **string** |  | 
 **studentGoals** | **string** |  | 
 **whyRegistered** | **string** |  | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

