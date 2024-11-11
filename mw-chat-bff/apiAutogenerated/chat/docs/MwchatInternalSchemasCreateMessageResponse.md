# MwchatInternalSchemasCreateMessageResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | [**MwchatInternalSchemasMessageResponse**](MwchatInternalSchemasMessageResponse.md) |  | 
**Users** | **[]string** |  | 

## Methods

### NewMwchatInternalSchemasCreateMessageResponse

`func NewMwchatInternalSchemasCreateMessageResponse(message MwchatInternalSchemasMessageResponse, users []string, ) *MwchatInternalSchemasCreateMessageResponse`

NewMwchatInternalSchemasCreateMessageResponse instantiates a new MwchatInternalSchemasCreateMessageResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwchatInternalSchemasCreateMessageResponseWithDefaults

`func NewMwchatInternalSchemasCreateMessageResponseWithDefaults() *MwchatInternalSchemasCreateMessageResponse`

NewMwchatInternalSchemasCreateMessageResponseWithDefaults instantiates a new MwchatInternalSchemasCreateMessageResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *MwchatInternalSchemasCreateMessageResponse) GetMessage() MwchatInternalSchemasMessageResponse`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *MwchatInternalSchemasCreateMessageResponse) GetMessageOk() (*MwchatInternalSchemasMessageResponse, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *MwchatInternalSchemasCreateMessageResponse) SetMessage(v MwchatInternalSchemasMessageResponse)`

SetMessage sets Message field to given value.


### GetUsers

`func (o *MwchatInternalSchemasCreateMessageResponse) GetUsers() []string`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *MwchatInternalSchemasCreateMessageResponse) GetUsersOk() (*[]string, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *MwchatInternalSchemasCreateMessageResponse) SetUsers(v []string)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


