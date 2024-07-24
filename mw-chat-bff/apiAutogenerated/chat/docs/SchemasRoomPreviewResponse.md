# SchemasRoomPreviewResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**IsBlocked** | **bool** |  | 
**Name** | **NullableString** |  | 
**RoomId** | **string** |  | 
**Users** | [**[]SchemasUserResponse**](SchemasUserResponse.md) |  | 

## Methods

### NewSchemasRoomPreviewResponse

`func NewSchemasRoomPreviewResponse(isBlocked bool, name NullableString, roomId string, users []SchemasUserResponse, ) *SchemasRoomPreviewResponse`

NewSchemasRoomPreviewResponse instantiates a new SchemasRoomPreviewResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasRoomPreviewResponseWithDefaults

`func NewSchemasRoomPreviewResponseWithDefaults() *SchemasRoomPreviewResponse`

NewSchemasRoomPreviewResponseWithDefaults instantiates a new SchemasRoomPreviewResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetIsBlocked

`func (o *SchemasRoomPreviewResponse) GetIsBlocked() bool`

GetIsBlocked returns the IsBlocked field if non-nil, zero value otherwise.

### GetIsBlockedOk

`func (o *SchemasRoomPreviewResponse) GetIsBlockedOk() (*bool, bool)`

GetIsBlockedOk returns a tuple with the IsBlocked field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsBlocked

`func (o *SchemasRoomPreviewResponse) SetIsBlocked(v bool)`

SetIsBlocked sets IsBlocked field to given value.


### GetName

`func (o *SchemasRoomPreviewResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SchemasRoomPreviewResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SchemasRoomPreviewResponse) SetName(v string)`

SetName sets Name field to given value.


### SetNameNil

`func (o *SchemasRoomPreviewResponse) SetNameNil(b bool)`

 SetNameNil sets the value for Name to be an explicit nil

### UnsetName
`func (o *SchemasRoomPreviewResponse) UnsetName()`

UnsetName ensures that no value is present for Name, not even an explicit nil
### GetRoomId

`func (o *SchemasRoomPreviewResponse) GetRoomId() string`

GetRoomId returns the RoomId field if non-nil, zero value otherwise.

### GetRoomIdOk

`func (o *SchemasRoomPreviewResponse) GetRoomIdOk() (*string, bool)`

GetRoomIdOk returns a tuple with the RoomId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomId

`func (o *SchemasRoomPreviewResponse) SetRoomId(v string)`

SetRoomId sets RoomId field to given value.


### GetUsers

`func (o *SchemasRoomPreviewResponse) GetUsers() []SchemasUserResponse`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *SchemasRoomPreviewResponse) GetUsersOk() (*[]SchemasUserResponse, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *SchemasRoomPreviewResponse) SetUsers(v []SchemasUserResponse)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


