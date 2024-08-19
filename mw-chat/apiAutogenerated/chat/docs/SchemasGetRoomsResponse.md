# SchemasGetRoomsResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Rooms** | [**[]SchemasRoomPreviewResponse**](SchemasRoomPreviewResponse.md) |  | 
**Size** | **int32** |  | 

## Methods

### NewSchemasGetRoomsResponse

`func NewSchemasGetRoomsResponse(rooms []SchemasRoomPreviewResponse, size int32, ) *SchemasGetRoomsResponse`

NewSchemasGetRoomsResponse instantiates a new SchemasGetRoomsResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasGetRoomsResponseWithDefaults

`func NewSchemasGetRoomsResponseWithDefaults() *SchemasGetRoomsResponse`

NewSchemasGetRoomsResponseWithDefaults instantiates a new SchemasGetRoomsResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetRooms

`func (o *SchemasGetRoomsResponse) GetRooms() []SchemasRoomPreviewResponse`

GetRooms returns the Rooms field if non-nil, zero value otherwise.

### GetRoomsOk

`func (o *SchemasGetRoomsResponse) GetRoomsOk() (*[]SchemasRoomPreviewResponse, bool)`

GetRoomsOk returns a tuple with the Rooms field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRooms

`func (o *SchemasGetRoomsResponse) SetRooms(v []SchemasRoomPreviewResponse)`

SetRooms sets Rooms field to given value.


### GetSize

`func (o *SchemasGetRoomsResponse) GetSize() int32`

GetSize returns the Size field if non-nil, zero value otherwise.

### GetSizeOk

`func (o *SchemasGetRoomsResponse) GetSizeOk() (*int32, bool)`

GetSizeOk returns a tuple with the Size field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSize

`func (o *SchemasGetRoomsResponse) SetSize(v int32)`

SetSize sets Size field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


