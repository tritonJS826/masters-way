# SchemasProjectResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  | 
**IsPrivate** | **bool** |  | 
**Name** | **string** |  | 
**OwnerId** | **string** |  | 
**Users** | [**[]SchemasUserPlainResponseWithInfo**](SchemasUserPlainResponseWithInfo.md) |  | 
**Ways** | [**[]SchemasWayPlainResponse**](SchemasWayPlainResponse.md) |  | 

## Methods

### NewSchemasProjectResponse

`func NewSchemasProjectResponse(id string, isPrivate bool, name string, ownerId string, users []SchemasUserPlainResponseWithInfo, ways []SchemasWayPlainResponse, ) *SchemasProjectResponse`

NewSchemasProjectResponse instantiates a new SchemasProjectResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasProjectResponseWithDefaults

`func NewSchemasProjectResponseWithDefaults() *SchemasProjectResponse`

NewSchemasProjectResponseWithDefaults instantiates a new SchemasProjectResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SchemasProjectResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SchemasProjectResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SchemasProjectResponse) SetId(v string)`

SetId sets Id field to given value.


### GetIsPrivate

`func (o *SchemasProjectResponse) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *SchemasProjectResponse) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *SchemasProjectResponse) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetName

`func (o *SchemasProjectResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SchemasProjectResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SchemasProjectResponse) SetName(v string)`

SetName sets Name field to given value.


### GetOwnerId

`func (o *SchemasProjectResponse) GetOwnerId() string`

GetOwnerId returns the OwnerId field if non-nil, zero value otherwise.

### GetOwnerIdOk

`func (o *SchemasProjectResponse) GetOwnerIdOk() (*string, bool)`

GetOwnerIdOk returns a tuple with the OwnerId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerId

`func (o *SchemasProjectResponse) SetOwnerId(v string)`

SetOwnerId sets OwnerId field to given value.


### GetUsers

`func (o *SchemasProjectResponse) GetUsers() []SchemasUserPlainResponseWithInfo`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *SchemasProjectResponse) GetUsersOk() (*[]SchemasUserPlainResponseWithInfo, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *SchemasProjectResponse) SetUsers(v []SchemasUserPlainResponseWithInfo)`

SetUsers sets Users field to given value.


### GetWays

`func (o *SchemasProjectResponse) GetWays() []SchemasWayPlainResponse`

GetWays returns the Ways field if non-nil, zero value otherwise.

### GetWaysOk

`func (o *SchemasProjectResponse) GetWaysOk() (*[]SchemasWayPlainResponse, bool)`

GetWaysOk returns a tuple with the Ways field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWays

`func (o *SchemasProjectResponse) SetWays(v []SchemasWayPlainResponse)`

SetWays sets Ways field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


