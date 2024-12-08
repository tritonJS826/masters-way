# MwChatInternalSchemasMessageResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | **string** |  | 
**MessageId** | **string** |  | 
**MessageReaders** | [**[]MwChatInternalSchemasMessageReader**](MwChatInternalSchemasMessageReader.md) |  | 
**OwnerId** | **string** |  | 

## Methods

### NewMwChatInternalSchemasMessageResponse

`func NewMwChatInternalSchemasMessageResponse(message string, messageId string, messageReaders []MwChatInternalSchemasMessageReader, ownerId string, ) *MwChatInternalSchemasMessageResponse`

NewMwChatInternalSchemasMessageResponse instantiates a new MwChatInternalSchemasMessageResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwChatInternalSchemasMessageResponseWithDefaults

`func NewMwChatInternalSchemasMessageResponseWithDefaults() *MwChatInternalSchemasMessageResponse`

NewMwChatInternalSchemasMessageResponseWithDefaults instantiates a new MwChatInternalSchemasMessageResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *MwChatInternalSchemasMessageResponse) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *MwChatInternalSchemasMessageResponse) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *MwChatInternalSchemasMessageResponse) SetMessage(v string)`

SetMessage sets Message field to given value.


### GetMessageId

`func (o *MwChatInternalSchemasMessageResponse) GetMessageId() string`

GetMessageId returns the MessageId field if non-nil, zero value otherwise.

### GetMessageIdOk

`func (o *MwChatInternalSchemasMessageResponse) GetMessageIdOk() (*string, bool)`

GetMessageIdOk returns a tuple with the MessageId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessageId

`func (o *MwChatInternalSchemasMessageResponse) SetMessageId(v string)`

SetMessageId sets MessageId field to given value.


### GetMessageReaders

`func (o *MwChatInternalSchemasMessageResponse) GetMessageReaders() []MwChatInternalSchemasMessageReader`

GetMessageReaders returns the MessageReaders field if non-nil, zero value otherwise.

### GetMessageReadersOk

`func (o *MwChatInternalSchemasMessageResponse) GetMessageReadersOk() (*[]MwChatInternalSchemasMessageReader, bool)`

GetMessageReadersOk returns a tuple with the MessageReaders field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessageReaders

`func (o *MwChatInternalSchemasMessageResponse) SetMessageReaders(v []MwChatInternalSchemasMessageReader)`

SetMessageReaders sets MessageReaders field to given value.


### GetOwnerId

`func (o *MwChatInternalSchemasMessageResponse) GetOwnerId() string`

GetOwnerId returns the OwnerId field if non-nil, zero value otherwise.

### GetOwnerIdOk

`func (o *MwChatInternalSchemasMessageResponse) GetOwnerIdOk() (*string, bool)`

GetOwnerIdOk returns a tuple with the OwnerId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerId

`func (o *MwChatInternalSchemasMessageResponse) SetOwnerId(v string)`

SetOwnerId sets OwnerId field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


