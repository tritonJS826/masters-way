# SchemasRoomPopulatedPayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ImageUrl** | **string** |  | 
**IsBlocked** | **bool** |  | 
**Messages** | [**[]SchemasMessageResponse**](SchemasMessageResponse.md) |  | 
**Name** | **string** |  | 
**RoomId** | **string** |  | 
**RoomType** | **string** |  | 
**Users** | [**[]SchemasUserResponse**](SchemasUserResponse.md) |  | 

## Methods

### NewSchemasRoomPopulatedPayload

`func NewSchemasRoomPopulatedPayload(imageUrl string, isBlocked bool, messages []SchemasMessageResponse, name string, roomId string, roomType string, users []SchemasUserResponse, ) *SchemasRoomPopulatedPayload`

NewSchemasRoomPopulatedPayload instantiates a new SchemasRoomPopulatedPayload object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasRoomPopulatedPayloadWithDefaults

`func NewSchemasRoomPopulatedPayloadWithDefaults() *SchemasRoomPopulatedPayload`

NewSchemasRoomPopulatedPayloadWithDefaults instantiates a new SchemasRoomPopulatedPayload object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetImageUrl

`func (o *SchemasRoomPopulatedPayload) GetImageUrl() string`

GetImageUrl returns the ImageUrl field if non-nil, zero value otherwise.

### GetImageUrlOk

`func (o *SchemasRoomPopulatedPayload) GetImageUrlOk() (*string, bool)`

GetImageUrlOk returns a tuple with the ImageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImageUrl

`func (o *SchemasRoomPopulatedPayload) SetImageUrl(v string)`

SetImageUrl sets ImageUrl field to given value.


### GetIsBlocked

`func (o *SchemasRoomPopulatedPayload) GetIsBlocked() bool`

GetIsBlocked returns the IsBlocked field if non-nil, zero value otherwise.

### GetIsBlockedOk

`func (o *SchemasRoomPopulatedPayload) GetIsBlockedOk() (*bool, bool)`

GetIsBlockedOk returns a tuple with the IsBlocked field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsBlocked

`func (o *SchemasRoomPopulatedPayload) SetIsBlocked(v bool)`

SetIsBlocked sets IsBlocked field to given value.


### GetMessages

`func (o *SchemasRoomPopulatedPayload) GetMessages() []SchemasMessageResponse`

GetMessages returns the Messages field if non-nil, zero value otherwise.

### GetMessagesOk

`func (o *SchemasRoomPopulatedPayload) GetMessagesOk() (*[]SchemasMessageResponse, bool)`

GetMessagesOk returns a tuple with the Messages field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessages

`func (o *SchemasRoomPopulatedPayload) SetMessages(v []SchemasMessageResponse)`

SetMessages sets Messages field to given value.


### GetName

`func (o *SchemasRoomPopulatedPayload) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SchemasRoomPopulatedPayload) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SchemasRoomPopulatedPayload) SetName(v string)`

SetName sets Name field to given value.


### GetRoomId

`func (o *SchemasRoomPopulatedPayload) GetRoomId() string`

GetRoomId returns the RoomId field if non-nil, zero value otherwise.

### GetRoomIdOk

`func (o *SchemasRoomPopulatedPayload) GetRoomIdOk() (*string, bool)`

GetRoomIdOk returns a tuple with the RoomId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomId

`func (o *SchemasRoomPopulatedPayload) SetRoomId(v string)`

SetRoomId sets RoomId field to given value.


### GetRoomType

`func (o *SchemasRoomPopulatedPayload) GetRoomType() string`

GetRoomType returns the RoomType field if non-nil, zero value otherwise.

### GetRoomTypeOk

`func (o *SchemasRoomPopulatedPayload) GetRoomTypeOk() (*string, bool)`

GetRoomTypeOk returns a tuple with the RoomType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomType

`func (o *SchemasRoomPopulatedPayload) SetRoomType(v string)`

SetRoomType sets RoomType field to given value.


### GetUsers

`func (o *SchemasRoomPopulatedPayload) GetUsers() []SchemasUserResponse`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *SchemasRoomPopulatedPayload) GetUsersOk() (*[]SchemasUserResponse, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *SchemasRoomPopulatedPayload) SetUsers(v []SchemasUserResponse)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


