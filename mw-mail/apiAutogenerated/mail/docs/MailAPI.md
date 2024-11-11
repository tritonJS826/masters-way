# \MailAPI

All URIs are relative to */mail*

Method | HTTP request | Description
------------- | ------------- | -------------
[**SendMail**](MailAPI.md#SendMail) | **Post** /mail | Sending messages to recipients and save logs



## SendMail

> MwmailInternalSchemasSendMailResponse SendMail(ctx).Message(message).Execute()

Sending messages to recipients and save logs



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
	message := "message_example" // string | Message content to be sent. Can be plain text or HTML-formatted text

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.MailAPI.SendMail(context.Background()).Message(message).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MailAPI.SendMail``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SendMail`: MwmailInternalSchemasSendMailResponse
	fmt.Fprintf(os.Stdout, "Response from `MailAPI.SendMail`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSendMailRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **message** | **string** | Message content to be sent. Can be plain text or HTML-formatted text | 

### Return type

[**MwmailInternalSchemasSendMailResponse**](MwmailInternalSchemasSendMailResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

