# SchemasGetAllUsersResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Size** | **int32** |  | 
**Users** | [**[]SchemasUserPlainResponseWithInfo**](SchemasUserPlainResponseWithInfo.md) |  | 

## Methods

### NewSchemasGetAllUsersResponse

`func NewSchemasGetAllUsersResponse(size int32, users []SchemasUserPlainResponseWithInfo, ) *SchemasGetAllUsersResponse`

NewSchemasGetAllUsersResponse instantiates a new SchemasGetAllUsersResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasGetAllUsersResponseWithDefaults

`func NewSchemasGetAllUsersResponseWithDefaults() *SchemasGetAllUsersResponse`

NewSchemasGetAllUsersResponseWithDefaults instantiates a new SchemasGetAllUsersResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSize

`func (o *SchemasGetAllUsersResponse) GetSize() int32`

GetSize returns the Size field if non-nil, zero value otherwise.

### GetSizeOk

`func (o *SchemasGetAllUsersResponse) GetSizeOk() (*int32, bool)`

GetSizeOk returns a tuple with the Size field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSize

`func (o *SchemasGetAllUsersResponse) SetSize(v int32)`

SetSize sets Size field to given value.


### GetUsers

`func (o *SchemasGetAllUsersResponse) GetUsers() []SchemasUserPlainResponseWithInfo`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *SchemasGetAllUsersResponse) GetUsersOk() (*[]SchemasUserPlainResponseWithInfo, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *SchemasGetAllUsersResponse) SetUsers(v []SchemasUserPlainResponseWithInfo)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


