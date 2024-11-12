# MwchatInternalSchemasMessageResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | **string** |  | 
**MessageId** | **string** |  | 
**MessageReaders** | [**[]MwchatInternalSchemasMessageReader**](MwchatInternalSchemasMessageReader.md) |  | 
**OwnerId** | **string** |  | 

## Methods

### NewMwchatInternalSchemasMessageResponse

`func NewMwchatInternalSchemasMessageResponse(message string, messageId string, messageReaders []MwchatInternalSchemasMessageReader, ownerId string, ) *MwchatInternalSchemasMessageResponse`

NewMwchatInternalSchemasMessageResponse instantiates a new MwchatInternalSchemasMessageResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwchatInternalSchemasMessageResponseWithDefaults

`func NewMwchatInternalSchemasMessageResponseWithDefaults() *MwchatInternalSchemasMessageResponse`

NewMwchatInternalSchemasMessageResponseWithDefaults instantiates a new MwchatInternalSchemasMessageResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *MwchatInternalSchemasMessageResponse) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *MwchatInternalSchemasMessageResponse) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *MwchatInternalSchemasMessageResponse) SetMessage(v string)`

SetMessage sets Message field to given value.


### GetMessageId

`func (o *MwchatInternalSchemasMessageResponse) GetMessageId() string`

GetMessageId returns the MessageId field if non-nil, zero value otherwise.

### GetMessageIdOk

`func (o *MwchatInternalSchemasMessageResponse) GetMessageIdOk() (*string, bool)`

GetMessageIdOk returns a tuple with the MessageId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessageId

`func (o *MwchatInternalSchemasMessageResponse) SetMessageId(v string)`

SetMessageId sets MessageId field to given value.


### GetMessageReaders

`func (o *MwchatInternalSchemasMessageResponse) GetMessageReaders() []MwchatInternalSchemasMessageReader`

GetMessageReaders returns the MessageReaders field if non-nil, zero value otherwise.

### GetMessageReadersOk

`func (o *MwchatInternalSchemasMessageResponse) GetMessageReadersOk() (*[]MwchatInternalSchemasMessageReader, bool)`

GetMessageReadersOk returns a tuple with the MessageReaders field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessageReaders

`func (o *MwchatInternalSchemasMessageResponse) SetMessageReaders(v []MwchatInternalSchemasMessageReader)`

SetMessageReaders sets MessageReaders field to given value.


### GetOwnerId

`func (o *MwchatInternalSchemasMessageResponse) GetOwnerId() string`

GetOwnerId returns the OwnerId field if non-nil, zero value otherwise.

### GetOwnerIdOk

`func (o *MwchatInternalSchemasMessageResponse) GetOwnerIdOk() (*string, bool)`

GetOwnerIdOk returns a tuple with the OwnerId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerId

`func (o *MwchatInternalSchemasMessageResponse) SetOwnerId(v string)`

SetOwnerId sets OwnerId field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


