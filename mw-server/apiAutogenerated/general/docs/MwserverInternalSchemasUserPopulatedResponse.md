# MwServerInternalSchemasUserPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**CustomWayCollections** | [**[]MwServerInternalSchemasWayCollectionPopulatedResponse**](MwServerInternalSchemasWayCollectionPopulatedResponse.md) |  | 
**DefaultWayCollections** | [**MwServerInternalSchemasDefaultWayCollections**](MwServerInternalSchemasDefaultWayCollections.md) |  | 
**Description** | **string** |  | 
**Email** | **string** |  | 
**FavoriteForUsers** | **[]string** |  | 
**FavoriteUsers** | [**[]MwServerInternalSchemasUserPlainResponse**](MwServerInternalSchemasUserPlainResponse.md) |  | 
**ImageUrl** | **string** |  | 
**IsMentor** | **bool** |  | 
**Name** | **string** |  | 
**Projects** | [**[]MwServerInternalSchemasProjectPlainResponse**](MwServerInternalSchemasProjectPlainResponse.md) |  | 
**Tags** | [**[]MwServerInternalSchemasUserTagResponse**](MwServerInternalSchemasUserTagResponse.md) |  | 
**Uuid** | **string** |  | 
**WayRequests** | [**[]MwServerInternalSchemasWayPlainResponse**](MwServerInternalSchemasWayPlainResponse.md) |  | 

## Methods

### NewMwServerInternalSchemasUserPopulatedResponse

`func NewMwServerInternalSchemasUserPopulatedResponse(createdAt string, customWayCollections []MwServerInternalSchemasWayCollectionPopulatedResponse, defaultWayCollections MwServerInternalSchemasDefaultWayCollections, description string, email string, favoriteForUsers []string, favoriteUsers []MwServerInternalSchemasUserPlainResponse, imageUrl string, isMentor bool, name string, projects []MwServerInternalSchemasProjectPlainResponse, tags []MwServerInternalSchemasUserTagResponse, uuid string, wayRequests []MwServerInternalSchemasWayPlainResponse, ) *MwServerInternalSchemasUserPopulatedResponse`

NewMwServerInternalSchemasUserPopulatedResponse instantiates a new MwServerInternalSchemasUserPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwServerInternalSchemasUserPopulatedResponseWithDefaults

`func NewMwServerInternalSchemasUserPopulatedResponseWithDefaults() *MwServerInternalSchemasUserPopulatedResponse`

NewMwServerInternalSchemasUserPopulatedResponseWithDefaults instantiates a new MwServerInternalSchemasUserPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetCustomWayCollections

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetCustomWayCollections() []MwServerInternalSchemasWayCollectionPopulatedResponse`

GetCustomWayCollections returns the CustomWayCollections field if non-nil, zero value otherwise.

### GetCustomWayCollectionsOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetCustomWayCollectionsOk() (*[]MwServerInternalSchemasWayCollectionPopulatedResponse, bool)`

GetCustomWayCollectionsOk returns a tuple with the CustomWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCustomWayCollections

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetCustomWayCollections(v []MwServerInternalSchemasWayCollectionPopulatedResponse)`

SetCustomWayCollections sets CustomWayCollections field to given value.


### GetDefaultWayCollections

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetDefaultWayCollections() MwServerInternalSchemasDefaultWayCollections`

GetDefaultWayCollections returns the DefaultWayCollections field if non-nil, zero value otherwise.

### GetDefaultWayCollectionsOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetDefaultWayCollectionsOk() (*MwServerInternalSchemasDefaultWayCollections, bool)`

GetDefaultWayCollectionsOk returns a tuple with the DefaultWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultWayCollections

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetDefaultWayCollections(v MwServerInternalSchemasDefaultWayCollections)`

SetDefaultWayCollections sets DefaultWayCollections field to given value.


### GetDescription

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetEmail

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetFavoriteForUsers

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetFavoriteForUsers() []string`

GetFavoriteForUsers returns the FavoriteForUsers field if non-nil, zero value otherwise.

### GetFavoriteForUsersOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetFavoriteForUsersOk() (*[]string, bool)`

GetFavoriteForUsersOk returns a tuple with the FavoriteForUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsers

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetFavoriteForUsers(v []string)`

SetFavoriteForUsers sets FavoriteForUsers field to given value.


### GetFavoriteUsers

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetFavoriteUsers() []MwServerInternalSchemasUserPlainResponse`

GetFavoriteUsers returns the FavoriteUsers field if non-nil, zero value otherwise.

### GetFavoriteUsersOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetFavoriteUsersOk() (*[]MwServerInternalSchemasUserPlainResponse, bool)`

GetFavoriteUsersOk returns a tuple with the FavoriteUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteUsers

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetFavoriteUsers(v []MwServerInternalSchemasUserPlainResponse)`

SetFavoriteUsers sets FavoriteUsers field to given value.


### GetImageUrl

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetImageUrl() string`

GetImageUrl returns the ImageUrl field if non-nil, zero value otherwise.

### GetImageUrlOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetImageUrlOk() (*string, bool)`

GetImageUrlOk returns a tuple with the ImageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImageUrl

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetImageUrl(v string)`

SetImageUrl sets ImageUrl field to given value.


### GetIsMentor

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetIsMentor() bool`

GetIsMentor returns the IsMentor field if non-nil, zero value otherwise.

### GetIsMentorOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetIsMentorOk() (*bool, bool)`

GetIsMentorOk returns a tuple with the IsMentor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsMentor

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetIsMentor(v bool)`

SetIsMentor sets IsMentor field to given value.


### GetName

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetProjects

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetProjects() []MwServerInternalSchemasProjectPlainResponse`

GetProjects returns the Projects field if non-nil, zero value otherwise.

### GetProjectsOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetProjectsOk() (*[]MwServerInternalSchemasProjectPlainResponse, bool)`

GetProjectsOk returns a tuple with the Projects field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjects

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetProjects(v []MwServerInternalSchemasProjectPlainResponse)`

SetProjects sets Projects field to given value.


### GetTags

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetTags() []MwServerInternalSchemasUserTagResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetTagsOk() (*[]MwServerInternalSchemasUserTagResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetTags(v []MwServerInternalSchemasUserTagResponse)`

SetTags sets Tags field to given value.


### GetUuid

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayRequests

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetWayRequests() []MwServerInternalSchemasWayPlainResponse`

GetWayRequests returns the WayRequests field if non-nil, zero value otherwise.

### GetWayRequestsOk

`func (o *MwServerInternalSchemasUserPopulatedResponse) GetWayRequestsOk() (*[]MwServerInternalSchemasWayPlainResponse, bool)`

GetWayRequestsOk returns a tuple with the WayRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayRequests

`func (o *MwServerInternalSchemasUserPopulatedResponse) SetWayRequests(v []MwServerInternalSchemasWayPlainResponse)`

SetWayRequests sets WayRequests field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


