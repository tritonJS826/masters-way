# SchemasMessageResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | **string** |  | 
**MessageReaders** | [**[]SchemasMessageReader**](SchemasMessageReader.md) |  | 
**OwnerId** | **string** |  | 
**OwnerImageUrl** | **string** |  | 
**OwnerName** | **NullableString** |  | 
**RoomId** | **string** |  | 

## Methods

### NewSchemasMessageResponse

`func NewSchemasMessageResponse(message string, messageReaders []SchemasMessageReader, ownerId string, ownerImageUrl string, ownerName NullableString, roomId string, ) *SchemasMessageResponse`

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

`func (o *SchemasMessageResponse) GetMessageReaders() []SchemasMessageReader`

GetMessageReaders returns the MessageReaders field if non-nil, zero value otherwise.

### GetMessageReadersOk

`func (o *SchemasMessageResponse) GetMessageReadersOk() (*[]SchemasMessageReader, bool)`

GetMessageReadersOk returns a tuple with the MessageReaders field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessageReaders

`func (o *SchemasMessageResponse) SetMessageReaders(v []SchemasMessageReader)`

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


### GetOwnerImageUrl

`func (o *SchemasMessageResponse) GetOwnerImageUrl() string`

GetOwnerImageUrl returns the OwnerImageUrl field if non-nil, zero value otherwise.

### GetOwnerImageUrlOk

`func (o *SchemasMessageResponse) GetOwnerImageUrlOk() (*string, bool)`

GetOwnerImageUrlOk returns a tuple with the OwnerImageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerImageUrl

`func (o *SchemasMessageResponse) SetOwnerImageUrl(v string)`

SetOwnerImageUrl sets OwnerImageUrl field to given value.


### GetOwnerName

`func (o *SchemasMessageResponse) GetOwnerName() string`

GetOwnerName returns the OwnerName field if non-nil, zero value otherwise.

### GetOwnerNameOk

`func (o *SchemasMessageResponse) GetOwnerNameOk() (*string, bool)`

GetOwnerNameOk returns a tuple with the OwnerName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerName

`func (o *SchemasMessageResponse) SetOwnerName(v string)`

SetOwnerName sets OwnerName field to given value.


### SetOwnerNameNil

`func (o *SchemasMessageResponse) SetOwnerNameNil(b bool)`

 SetOwnerNameNil sets the value for OwnerName to be an explicit nil

### UnsetOwnerName
`func (o *SchemasMessageResponse) UnsetOwnerName()`

UnsetOwnerName ensures that no value is present for OwnerName, not even an explicit nil
### GetRoomId

`func (o *SchemasMessageResponse) GetRoomId() string`

GetRoomId returns the RoomId field if non-nil, zero value otherwise.

### GetRoomIdOk

`func (o *SchemasMessageResponse) GetRoomIdOk() (*string, bool)`

GetRoomIdOk returns a tuple with the RoomId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomId

`func (o *SchemasMessageResponse) SetRoomId(v string)`

SetRoomId sets RoomId field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


