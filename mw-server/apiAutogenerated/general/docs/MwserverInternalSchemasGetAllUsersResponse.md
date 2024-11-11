# MwserverInternalSchemasGetAllUsersResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Size** | **int32** |  | 
**Users** | [**[]MwserverInternalSchemasUserPlainResponseWithInfo**](MwserverInternalSchemasUserPlainResponseWithInfo.md) |  | 

## Methods

### NewMwserverInternalSchemasGetAllUsersResponse

`func NewMwserverInternalSchemasGetAllUsersResponse(size int32, users []MwserverInternalSchemasUserPlainResponseWithInfo, ) *MwserverInternalSchemasGetAllUsersResponse`

NewMwserverInternalSchemasGetAllUsersResponse instantiates a new MwserverInternalSchemasGetAllUsersResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwserverInternalSchemasGetAllUsersResponseWithDefaults

`func NewMwserverInternalSchemasGetAllUsersResponseWithDefaults() *MwserverInternalSchemasGetAllUsersResponse`

NewMwserverInternalSchemasGetAllUsersResponseWithDefaults instantiates a new MwserverInternalSchemasGetAllUsersResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSize

`func (o *MwserverInternalSchemasGetAllUsersResponse) GetSize() int32`

GetSize returns the Size field if non-nil, zero value otherwise.

### GetSizeOk

`func (o *MwserverInternalSchemasGetAllUsersResponse) GetSizeOk() (*int32, bool)`

GetSizeOk returns a tuple with the Size field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSize

`func (o *MwserverInternalSchemasGetAllUsersResponse) SetSize(v int32)`

SetSize sets Size field to given value.


### GetUsers

`func (o *MwserverInternalSchemasGetAllUsersResponse) GetUsers() []MwserverInternalSchemasUserPlainResponseWithInfo`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *MwserverInternalSchemasGetAllUsersResponse) GetUsersOk() (*[]MwserverInternalSchemasUserPlainResponseWithInfo, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *MwserverInternalSchemasGetAllUsersResponse) SetUsers(v []MwserverInternalSchemasUserPlainResponseWithInfo)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


