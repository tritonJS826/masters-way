# SchemasMessageResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | **string** |  | 
**MessageReaders** | [**[]SchemasMessageReaders**](SchemasMessageReaders.md) |  | 
**OwnerId** | **string** |  | 

## Methods

### NewSchemasMessageResponse

`func NewSchemasMessageResponse(message string, messageReaders []SchemasMessageReaders, ownerId string, ) *SchemasMessageResponse`

NewSchemasMessageResponse instantiates a new SchemasMessageResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasMessageResponseWithDefaults

`func NewSchemasMessageResponseWithDefaults() *SchemasMessageResponse`

NewSchemasMessageResponseWithDefaults instantiates a new SchemasMessageResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *SchemasMessageResponse) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *SchemasMessageResponse) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *SchemasMessageResponse) SetMessage(v string)`

SetMessage sets Message field to given value.


### GetMessageReaders

`func (o *SchemasMessageResponse) GetMessageReaders() []SchemasMessageReaders`

GetMessageReaders returns the MessageReaders field if non-nil, zero value otherwise.

### GetMessageReadersOk

`func (o *SchemasMessageResponse) GetMessageReadersOk() (*[]SchemasMessageReaders, bool)`

GetMessageReadersOk returns a tuple with the MessageReaders field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessageReaders

`func (o *SchemasMessageResponse) SetMessageReaders(v []SchemasMessageReaders)`

SetMessageReaders sets MessageReaders field to given value.


### GetOwnerId

`func (o *SchemasMessageResponse) GetOwnerId() string`

GetOwnerId returns the OwnerId field if non-nil, zero value otherwise.

### GetOwnerIdOk

`func (o *SchemasMessageResponse) GetOwnerIdOk() (*string, bool)`

GetOwnerIdOk returns a tuple with the OwnerId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerId

`func (o *SchemasMessageResponse) SetOwnerId(v string)`

SetOwnerId sets OwnerId field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


