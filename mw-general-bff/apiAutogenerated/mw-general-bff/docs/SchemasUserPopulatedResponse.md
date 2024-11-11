# SchemasUserPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**CustomWayCollections** | [**[]SchemasWayCollectionPopulatedResponse**](SchemasWayCollectionPopulatedResponse.md) |  | 
**DefaultWayCollections** | [**SchemasDefaultWayCollections**](SchemasDefaultWayCollections.md) |  | 
**Description** | **string** |  | 
**Email** | **string** |  | 
**FavoriteForUsers** | **[]string** |  | 
**FavoriteUsers** | [**[]SchemasUserPlainResponse**](SchemasUserPlainResponse.md) |  | 
**ImageUrl** | **string** |  | 
**IsMentor** | **bool** |  | 
**Name** | **string** |  | 
**Projects** | [**[]SchemasProjectPlainResponse**](SchemasProjectPlainResponse.md) |  | 
**Tags** | [**[]SchemasUserTagResponse**](SchemasUserTagResponse.md) |  | 
**Uuid** | **string** |  | 
**WayRequests** | [**[]SchemasWayPlainResponse**](SchemasWayPlainResponse.md) |  | 

## Methods

### NewSchemasUserPopulatedResponse

`func NewSchemasUserPopulatedResponse(createdAt string, customWayCollections []SchemasWayCollectionPopulatedResponse, defaultWayCollections SchemasDefaultWayCollections, description string, email string, favoriteForUsers []string, favoriteUsers []SchemasUserPlainResponse, imageUrl string, isMentor bool, name string, projects []SchemasProjectPlainResponse, tags []SchemasUserTagResponse, uuid string, wayRequests []SchemasWayPlainResponse, ) *SchemasUserPopulatedResponse`

NewSchemasUserPopulatedResponse instantiates a new SchemasUserPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasUserPopulatedResponseWithDefaults

`func NewSchemasUserPopulatedResponseWithDefaults() *SchemasUserPopulatedResponse`

NewSchemasUserPopulatedResponseWithDefaults instantiates a new SchemasUserPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *SchemasUserPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *SchemasUserPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *SchemasUserPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetCustomWayCollections

`func (o *SchemasUserPopulatedResponse) GetCustomWayCollections() []SchemasWayCollectionPopulatedResponse`

GetCustomWayCollections returns the CustomWayCollections field if non-nil, zero value otherwise.

### GetCustomWayCollectionsOk

`func (o *SchemasUserPopulatedResponse) GetCustomWayCollectionsOk() (*[]SchemasWayCollectionPopulatedResponse, bool)`

GetCustomWayCollectionsOk returns a tuple with the CustomWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCustomWayCollections

`func (o *SchemasUserPopulatedResponse) SetCustomWayCollections(v []SchemasWayCollectionPopulatedResponse)`

SetCustomWayCollections sets CustomWayCollections field to given value.


### GetDefaultWayCollections

`func (o *SchemasUserPopulatedResponse) GetDefaultWayCollections() SchemasDefaultWayCollections`

GetDefaultWayCollections returns the DefaultWayCollections field if non-nil, zero value otherwise.

### GetDefaultWayCollectionsOk

`func (o *SchemasUserPopulatedResponse) GetDefaultWayCollectionsOk() (*SchemasDefaultWayCollections, bool)`

GetDefaultWayCollectionsOk returns a tuple with the DefaultWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultWayCollections

`func (o *SchemasUserPopulatedResponse) SetDefaultWayCollections(v SchemasDefaultWayCollections)`

SetDefaultWayCollections sets DefaultWayCollections field to given value.


### GetDescription

`func (o *SchemasUserPopulatedResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SchemasUserPopulatedResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SchemasUserPopulatedResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetEmail

`func (o *SchemasUserPopulatedResponse) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *SchemasUserPopulatedResponse) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *SchemasUserPopulatedResponse) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetFavoriteForUsers

`func (o *SchemasUserPopulatedResponse) GetFavoriteForUsers() []string`

GetFavoriteForUsers returns the FavoriteForUsers field if non-nil, zero value otherwise.

### GetFavoriteForUsersOk

`func (o *SchemasUserPopulatedResponse) GetFavoriteForUsersOk() (*[]string, bool)`

GetFavoriteForUsersOk returns a tuple with the FavoriteForUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsers

`func (o *SchemasUserPopulatedResponse) SetFavoriteForUsers(v []string)`

SetFavoriteForUsers sets FavoriteForUsers field to given value.


### GetFavoriteUsers

`func (o *SchemasUserPopulatedResponse) GetFavoriteUsers() []SchemasUserPlainResponse`

GetFavoriteUsers returns the FavoriteUsers field if non-nil, zero value otherwise.

### GetFavoriteUsersOk

`func (o *SchemasUserPopulatedResponse) GetFavoriteUsersOk() (*[]SchemasUserPlainResponse, bool)`

GetFavoriteUsersOk returns a tuple with the FavoriteUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteUsers

`func (o *SchemasUserPopulatedResponse) SetFavoriteUsers(v []SchemasUserPlainResponse)`

SetFavoriteUsers sets FavoriteUsers field to given value.


### GetImageUrl

`func (o *SchemasUserPopulatedResponse) GetImageUrl() string`

GetImageUrl returns the ImageUrl field if non-nil, zero value otherwise.

### GetImageUrlOk

`func (o *SchemasUserPopulatedResponse) GetImageUrlOk() (*string, bool)`

GetImageUrlOk returns a tuple with the ImageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImageUrl

`func (o *SchemasUserPopulatedResponse) SetImageUrl(v string)`

SetImageUrl sets ImageUrl field to given value.


### GetIsMentor

`func (o *SchemasUserPopulatedResponse) GetIsMentor() bool`

GetIsMentor returns the IsMentor field if non-nil, zero value otherwise.

### GetIsMentorOk

`func (o *SchemasUserPopulatedResponse) GetIsMentorOk() (*bool, bool)`

GetIsMentorOk returns a tuple with the IsMentor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsMentor

`func (o *SchemasUserPopulatedResponse) SetIsMentor(v bool)`

SetIsMentor sets IsMentor field to given value.


### GetName

`func (o *SchemasUserPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SchemasUserPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SchemasUserPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetProjects

`func (o *SchemasUserPopulatedResponse) GetProjects() []SchemasProjectPlainResponse`

GetProjects returns the Projects field if non-nil, zero value otherwise.

### GetProjectsOk

`func (o *SchemasUserPopulatedResponse) GetProjectsOk() (*[]SchemasProjectPlainResponse, bool)`

GetProjectsOk returns a tuple with the Projects field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjects

`func (o *SchemasUserPopulatedResponse) SetProjects(v []SchemasProjectPlainResponse)`

SetProjects sets Projects field to given value.


### GetTags

`func (o *SchemasUserPopulatedResponse) GetTags() []SchemasUserTagResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *SchemasUserPopulatedResponse) GetTagsOk() (*[]SchemasUserTagResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *SchemasUserPopulatedResponse) SetTags(v []SchemasUserTagResponse)`

SetTags sets Tags field to given value.


### GetUuid

`func (o *SchemasUserPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *SchemasUserPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *SchemasUserPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayRequests

`func (o *SchemasUserPopulatedResponse) GetWayRequests() []SchemasWayPlainResponse`

GetWayRequests returns the WayRequests field if non-nil, zero value otherwise.

### GetWayRequestsOk

`func (o *SchemasUserPopulatedResponse) GetWayRequestsOk() (*[]SchemasWayPlainResponse, bool)`

GetWayRequestsOk returns a tuple with the WayRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayRequests

`func (o *SchemasUserPopulatedResponse) SetWayRequests(v []SchemasWayPlainResponse)`

SetWayRequests sets WayRequests field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


