# SchemasGetAllWaysResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Size** | **int32** |  | 
**Ways** | [**[]SchemasWayPlainResponse**](SchemasWayPlainResponse.md) |  | 

## Methods

### NewSchemasGetAllWaysResponse

`func NewSchemasGetAllWaysResponse(size int32, ways []SchemasWayPlainResponse, ) *SchemasGetAllWaysResponse`

NewSchemasGetAllWaysResponse instantiates a new SchemasGetAllWaysResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasGetAllWaysResponseWithDefaults

`func NewSchemasGetAllWaysResponseWithDefaults() *SchemasGetAllWaysResponse`

NewSchemasGetAllWaysResponseWithDefaults instantiates a new SchemasGetAllWaysResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSize

`func (o *SchemasGetAllWaysResponse) GetSize() int32`

GetSize returns the Size field if non-nil, zero value otherwise.

### GetSizeOk

`func (o *SchemasGetAllWaysResponse) GetSizeOk() (*int32, bool)`

GetSizeOk returns a tuple with the Size field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSize

`func (o *SchemasGetAllWaysResponse) SetSize(v int32)`

SetSize sets Size field to given value.


### GetWays

`func (o *SchemasGetAllWaysResponse) GetWays() []SchemasWayPlainResponse`

GetWays returns the Ways field if non-nil, zero value otherwise.

### GetWaysOk

`func (o *SchemasGetAllWaysResponse) GetWaysOk() (*[]SchemasWayPlainResponse, bool)`

GetWaysOk returns a tuple with the Ways field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWays

`func (o *SchemasGetAllWaysResponse) SetWays(v []SchemasWayPlainResponse)`

SetWays sets Ways field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


