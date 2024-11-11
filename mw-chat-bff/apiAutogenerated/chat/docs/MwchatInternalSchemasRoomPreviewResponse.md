# MwchatInternalSchemasRoomPreviewResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**IsBlocked** | **bool** |  | 
**Name** | **NullableString** |  | 
**RoomId** | **string** |  | 
**RoomType** | **string** |  | 
**Users** | [**[]MwchatInternalSchemasUserResponse**](MwchatInternalSchemasUserResponse.md) |  | 

## Methods

### NewMwchatInternalSchemasRoomPreviewResponse

`func NewMwchatInternalSchemasRoomPreviewResponse(isBlocked bool, name NullableString, roomId string, roomType string, users []MwchatInternalSchemasUserResponse, ) *MwchatInternalSchemasRoomPreviewResponse`

NewMwchatInternalSchemasRoomPreviewResponse instantiates a new MwchatInternalSchemasRoomPreviewResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwchatInternalSchemasRoomPreviewResponseWithDefaults

`func NewMwchatInternalSchemasRoomPreviewResponseWithDefaults() *MwchatInternalSchemasRoomPreviewResponse`

NewMwchatInternalSchemasRoomPreviewResponseWithDefaults instantiates a new MwchatInternalSchemasRoomPreviewResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetIsBlocked

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetIsBlocked() bool`

GetIsBlocked returns the IsBlocked field if non-nil, zero value otherwise.

### GetIsBlockedOk

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetIsBlockedOk() (*bool, bool)`

GetIsBlockedOk returns a tuple with the IsBlocked field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsBlocked

`func (o *MwchatInternalSchemasRoomPreviewResponse) SetIsBlocked(v bool)`

SetIsBlocked sets IsBlocked field to given value.


### GetName

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwchatInternalSchemasRoomPreviewResponse) SetName(v string)`

SetName sets Name field to given value.


### SetNameNil

`func (o *MwchatInternalSchemasRoomPreviewResponse) SetNameNil(b bool)`

 SetNameNil sets the value for Name to be an explicit nil

### UnsetName
`func (o *MwchatInternalSchemasRoomPreviewResponse) UnsetName()`

UnsetName ensures that no value is present for Name, not even an explicit nil
### GetRoomId

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetRoomId() string`

GetRoomId returns the RoomId field if non-nil, zero value otherwise.

### GetRoomIdOk

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetRoomIdOk() (*string, bool)`

GetRoomIdOk returns a tuple with the RoomId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomId

`func (o *MwchatInternalSchemasRoomPreviewResponse) SetRoomId(v string)`

SetRoomId sets RoomId field to given value.


### GetRoomType

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetRoomType() string`

GetRoomType returns the RoomType field if non-nil, zero value otherwise.

### GetRoomTypeOk

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetRoomTypeOk() (*string, bool)`

GetRoomTypeOk returns a tuple with the RoomType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomType

`func (o *MwchatInternalSchemasRoomPreviewResponse) SetRoomType(v string)`

SetRoomType sets RoomType field to given value.


### GetUsers

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetUsers() []MwchatInternalSchemasUserResponse`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *MwchatInternalSchemasRoomPreviewResponse) GetUsersOk() (*[]MwchatInternalSchemasUserResponse, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *MwchatInternalSchemasRoomPreviewResponse) SetUsers(v []MwchatInternalSchemasUserResponse)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


