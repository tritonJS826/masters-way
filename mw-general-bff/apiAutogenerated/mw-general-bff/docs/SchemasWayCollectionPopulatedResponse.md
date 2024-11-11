# SchemasWayCollectionPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**Name** | **string** |  | 
**OwnerUuid** | **string** |  | 
**Type** | **string** | should be removed after separation custom collections and default pseudocollections | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 
**Ways** | [**[]SchemasWayPlainResponse**](SchemasWayPlainResponse.md) |  | 

## Methods

### NewSchemasWayCollectionPopulatedResponse

`func NewSchemasWayCollectionPopulatedResponse(createdAt string, name string, ownerUuid string, type_ string, updatedAt string, uuid string, ways []SchemasWayPlainResponse, ) *SchemasWayCollectionPopulatedResponse`

NewSchemasWayCollectionPopulatedResponse instantiates a new SchemasWayCollectionPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasWayCollectionPopulatedResponseWithDefaults

`func NewSchemasWayCollectionPopulatedResponseWithDefaults() *SchemasWayCollectionPopulatedResponse`

NewSchemasWayCollectionPopulatedResponseWithDefaults instantiates a new SchemasWayCollectionPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *SchemasWayCollectionPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *SchemasWayCollectionPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *SchemasWayCollectionPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetName

`func (o *SchemasWayCollectionPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SchemasWayCollectionPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SchemasWayCollectionPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetOwnerUuid

`func (o *SchemasWayCollectionPopulatedResponse) GetOwnerUuid() string`

GetOwnerUuid returns the OwnerUuid field if non-nil, zero value otherwise.

### GetOwnerUuidOk

`func (o *SchemasWayCollectionPopulatedResponse) GetOwnerUuidOk() (*string, bool)`

GetOwnerUuidOk returns a tuple with the OwnerUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerUuid

`func (o *SchemasWayCollectionPopulatedResponse) SetOwnerUuid(v string)`

SetOwnerUuid sets OwnerUuid field to given value.


### GetType

`func (o *SchemasWayCollectionPopulatedResponse) GetType() string`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *SchemasWayCollectionPopulatedResponse) GetTypeOk() (*string, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *SchemasWayCollectionPopulatedResponse) SetType(v string)`

SetType sets Type field to given value.


### GetUpdatedAt

`func (o *SchemasWayCollectionPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *SchemasWayCollectionPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *SchemasWayCollectionPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *SchemasWayCollectionPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *SchemasWayCollectionPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *SchemasWayCollectionPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWays

`func (o *SchemasWayCollectionPopulatedResponse) GetWays() []SchemasWayPlainResponse`

GetWays returns the Ways field if non-nil, zero value otherwise.

### GetWaysOk

`func (o *SchemasWayCollectionPopulatedResponse) GetWaysOk() (*[]SchemasWayPlainResponse, bool)`

GetWaysOk returns a tuple with the Ways field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWays

`func (o *SchemasWayCollectionPopulatedResponse) SetWays(v []SchemasWayPlainResponse)`

SetWays sets Ways field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


