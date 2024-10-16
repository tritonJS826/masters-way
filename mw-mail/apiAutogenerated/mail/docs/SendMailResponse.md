# SendMailResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**FromEmail** | Pointer to **string** |  | [optional] 
**Recipients** | Pointer to **string** |  | [optional] 
**Subject** | Pointer to **string** |  | [optional] 
**Message** | Pointer to **string** |  | [optional] 

## Methods

### NewSendMailResponse

`func NewSendMailResponse() *SendMailResponse`

NewSendMailResponse instantiates a new SendMailResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSendMailResponseWithDefaults

`func NewSendMailResponseWithDefaults() *SendMailResponse`

NewSendMailResponseWithDefaults instantiates a new SendMailResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SendMailResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SendMailResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SendMailResponse) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *SendMailResponse) HasId() bool`

HasId returns a boolean if a field has been set.

### GetFromEmail

`func (o *SendMailResponse) GetFromEmail() string`

GetFromEmail returns the FromEmail field if non-nil, zero value otherwise.

### GetFromEmailOk

`func (o *SendMailResponse) GetFromEmailOk() (*string, bool)`

GetFromEmailOk returns a tuple with the FromEmail field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFromEmail

`func (o *SendMailResponse) SetFromEmail(v string)`

SetFromEmail sets FromEmail field to given value.

### HasFromEmail

`func (o *SendMailResponse) HasFromEmail() bool`

HasFromEmail returns a boolean if a field has been set.

### GetRecipients

`func (o *SendMailResponse) GetRecipients() string`

GetRecipients returns the Recipients field if non-nil, zero value otherwise.

### GetRecipientsOk

`func (o *SendMailResponse) GetRecipientsOk() (*string, bool)`

GetRecipientsOk returns a tuple with the Recipients field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRecipients

`func (o *SendMailResponse) SetRecipients(v string)`

SetRecipients sets Recipients field to given value.

### HasRecipients

`func (o *SendMailResponse) HasRecipients() bool`

HasRecipients returns a boolean if a field has been set.

### GetSubject

`func (o *SendMailResponse) GetSubject() string`

GetSubject returns the Subject field if non-nil, zero value otherwise.

### GetSubjectOk

`func (o *SendMailResponse) GetSubjectOk() (*string, bool)`

GetSubjectOk returns a tuple with the Subject field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubject

`func (o *SendMailResponse) SetSubject(v string)`

SetSubject sets Subject field to given value.

### HasSubject

`func (o *SendMailResponse) HasSubject() bool`

HasSubject returns a boolean if a field has been set.

### GetMessage

`func (o *SendMailResponse) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *SendMailResponse) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *SendMailResponse) SetMessage(v string)`

SetMessage sets Message field to given value.

### HasMessage

`func (o *SendMailResponse) HasMessage() bool`

HasMessage returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


