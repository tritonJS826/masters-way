# SchemasProjectPopulatedResponse

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

### NewSchemasProjectPopulatedResponse

`func NewSchemasProjectPopulatedResponse(id string, isPrivate bool, name string, ownerId string, users []SchemasUserPlainResponseWithInfo, ways []SchemasWayPlainResponse, ) *SchemasProjectPopulatedResponse`

NewSchemasProjectPopulatedResponse instantiates a new SchemasProjectPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasProjectPopulatedResponseWithDefaults

`func NewSchemasProjectPopulatedResponseWithDefaults() *SchemasProjectPopulatedResponse`

NewSchemasProjectPopulatedResponseWithDefaults instantiates a new SchemasProjectPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SchemasProjectPopulatedResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SchemasProjectPopulatedResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SchemasProjectPopulatedResponse) SetId(v string)`

SetId sets Id field to given value.


### GetIsPrivate

`func (o *SchemasProjectPopulatedResponse) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *SchemasProjectPopulatedResponse) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *SchemasProjectPopulatedResponse) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetName

`func (o *SchemasProjectPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SchemasProjectPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SchemasProjectPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetOwnerId

`func (o *SchemasProjectPopulatedResponse) GetOwnerId() string`

GetOwnerId returns the OwnerId field if non-nil, zero value otherwise.

### GetOwnerIdOk

`func (o *SchemasProjectPopulatedResponse) GetOwnerIdOk() (*string, bool)`

GetOwnerIdOk returns a tuple with the OwnerId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerId

`func (o *SchemasProjectPopulatedResponse) SetOwnerId(v string)`

SetOwnerId sets OwnerId field to given value.


### GetUsers

`func (o *SchemasProjectPopulatedResponse) GetUsers() []SchemasUserPlainResponseWithInfo`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *SchemasProjectPopulatedResponse) GetUsersOk() (*[]SchemasUserPlainResponseWithInfo, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *SchemasProjectPopulatedResponse) SetUsers(v []SchemasUserPlainResponseWithInfo)`

SetUsers sets Users field to given value.


### GetWays

`func (o *SchemasProjectPopulatedResponse) GetWays() []SchemasWayPlainResponse`

GetWays returns the Ways field if non-nil, zero value otherwise.

### GetWaysOk

`func (o *SchemasProjectPopulatedResponse) GetWaysOk() (*[]SchemasWayPlainResponse, bool)`

GetWaysOk returns a tuple with the Ways field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWays

`func (o *SchemasProjectPopulatedResponse) SetWays(v []SchemasWayPlainResponse)`

SetWays sets Ways field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


