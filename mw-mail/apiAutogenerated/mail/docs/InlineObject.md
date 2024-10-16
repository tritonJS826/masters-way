# InlineObject

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Subject** | **string** | Subject of the email | 
**To** | **[]string** | Recipient email addresses (array) | 
**Cc** | Pointer to **[]string** | CC email addresses (array) | [optional] 
**Bcc** | Pointer to **[]string** | BCC email addresses (array) | [optional] 
**ReplyTo** | Pointer to **[]string** | reply_to email addresses (array) | [optional] 
**Message** | **string** | Plain text or HTML formatted message content | 

## Methods

### NewInlineObject

`func NewInlineObject(subject string, to []string, message string, ) *InlineObject`

NewInlineObject instantiates a new InlineObject object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewInlineObjectWithDefaults

`func NewInlineObjectWithDefaults() *InlineObject`

NewInlineObjectWithDefaults instantiates a new InlineObject object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSubject

`func (o *InlineObject) GetSubject() string`

GetSubject returns the Subject field if non-nil, zero value otherwise.

### GetSubjectOk

`func (o *InlineObject) GetSubjectOk() (*string, bool)`

GetSubjectOk returns a tuple with the Subject field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubject

`func (o *InlineObject) SetSubject(v string)`

SetSubject sets Subject field to given value.


### GetTo

`func (o *InlineObject) GetTo() []string`

GetTo returns the To field if non-nil, zero value otherwise.

### GetToOk

`func (o *InlineObject) GetToOk() (*[]string, bool)`

GetToOk returns a tuple with the To field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTo

`func (o *InlineObject) SetTo(v []string)`

SetTo sets To field to given value.


### GetCc

`func (o *InlineObject) GetCc() []string`

GetCc returns the Cc field if non-nil, zero value otherwise.

### GetCcOk

`func (o *InlineObject) GetCcOk() (*[]string, bool)`

GetCcOk returns a tuple with the Cc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCc

`func (o *InlineObject) SetCc(v []string)`

SetCc sets Cc field to given value.

### HasCc

`func (o *InlineObject) HasCc() bool`

HasCc returns a boolean if a field has been set.

### GetBcc

`func (o *InlineObject) GetBcc() []string`

GetBcc returns the Bcc field if non-nil, zero value otherwise.

### GetBccOk

`func (o *InlineObject) GetBccOk() (*[]string, bool)`

GetBccOk returns a tuple with the Bcc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBcc

`func (o *InlineObject) SetBcc(v []string)`

SetBcc sets Bcc field to given value.

### HasBcc

`func (o *InlineObject) HasBcc() bool`

HasBcc returns a boolean if a field has been set.

### GetReplyTo

`func (o *InlineObject) GetReplyTo() []string`

GetReplyTo returns the ReplyTo field if non-nil, zero value otherwise.

### GetReplyToOk

`func (o *InlineObject) GetReplyToOk() (*[]string, bool)`

GetReplyToOk returns a tuple with the ReplyTo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReplyTo

`func (o *InlineObject) SetReplyTo(v []string)`

SetReplyTo sets ReplyTo field to given value.

### HasReplyTo

`func (o *InlineObject) HasReplyTo() bool`

HasReplyTo returns a boolean if a field has been set.

### GetMessage

`func (o *InlineObject) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *InlineObject) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *InlineObject) SetMessage(v string)`

SetMessage sets Message field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


