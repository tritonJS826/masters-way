# MwserverInternalSchemasUserPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**CustomWayCollections** | [**[]MwserverInternalSchemasWayCollectionPopulatedResponse**](MwserverInternalSchemasWayCollectionPopulatedResponse.md) |  | 
**DefaultWayCollections** | [**MwserverInternalSchemasDefaultWayCollections**](MwserverInternalSchemasDefaultWayCollections.md) |  | 
**Description** | **string** |  | 
**Email** | **string** |  | 
**FavoriteForUsers** | **[]string** |  | 
**FavoriteUsers** | [**[]MwserverInternalSchemasUserPlainResponse**](MwserverInternalSchemasUserPlainResponse.md) |  | 
**ImageUrl** | **string** |  | 
**IsMentor** | **bool** |  | 
**Name** | **string** |  | 
**Projects** | [**[]MwserverInternalSchemasProjectPlainResponse**](MwserverInternalSchemasProjectPlainResponse.md) |  | 
**Tags** | [**[]MwserverInternalSchemasUserTagResponse**](MwserverInternalSchemasUserTagResponse.md) |  | 
**Uuid** | **string** |  | 
**WayRequests** | [**[]MwserverInternalSchemasWayPlainResponse**](MwserverInternalSchemasWayPlainResponse.md) |  | 

## Methods

### NewMwserverInternalSchemasUserPopulatedResponse

`func NewMwserverInternalSchemasUserPopulatedResponse(createdAt string, customWayCollections []MwserverInternalSchemasWayCollectionPopulatedResponse, defaultWayCollections MwserverInternalSchemasDefaultWayCollections, description string, email string, favoriteForUsers []string, favoriteUsers []MwserverInternalSchemasUserPlainResponse, imageUrl string, isMentor bool, name string, projects []MwserverInternalSchemasProjectPlainResponse, tags []MwserverInternalSchemasUserTagResponse, uuid string, wayRequests []MwserverInternalSchemasWayPlainResponse, ) *MwserverInternalSchemasUserPopulatedResponse`

NewMwserverInternalSchemasUserPopulatedResponse instantiates a new MwserverInternalSchemasUserPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwserverInternalSchemasUserPopulatedResponseWithDefaults

`func NewMwserverInternalSchemasUserPopulatedResponseWithDefaults() *MwserverInternalSchemasUserPopulatedResponse`

NewMwserverInternalSchemasUserPopulatedResponseWithDefaults instantiates a new MwserverInternalSchemasUserPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetCustomWayCollections

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetCustomWayCollections() []MwserverInternalSchemasWayCollectionPopulatedResponse`

GetCustomWayCollections returns the CustomWayCollections field if non-nil, zero value otherwise.

### GetCustomWayCollectionsOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetCustomWayCollectionsOk() (*[]MwserverInternalSchemasWayCollectionPopulatedResponse, bool)`

GetCustomWayCollectionsOk returns a tuple with the CustomWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCustomWayCollections

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetCustomWayCollections(v []MwserverInternalSchemasWayCollectionPopulatedResponse)`

SetCustomWayCollections sets CustomWayCollections field to given value.


### GetDefaultWayCollections

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetDefaultWayCollections() MwserverInternalSchemasDefaultWayCollections`

GetDefaultWayCollections returns the DefaultWayCollections field if non-nil, zero value otherwise.

### GetDefaultWayCollectionsOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetDefaultWayCollectionsOk() (*MwserverInternalSchemasDefaultWayCollections, bool)`

GetDefaultWayCollectionsOk returns a tuple with the DefaultWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultWayCollections

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetDefaultWayCollections(v MwserverInternalSchemasDefaultWayCollections)`

SetDefaultWayCollections sets DefaultWayCollections field to given value.


### GetDescription

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetEmail

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetFavoriteForUsers

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetFavoriteForUsers() []string`

GetFavoriteForUsers returns the FavoriteForUsers field if non-nil, zero value otherwise.

### GetFavoriteForUsersOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetFavoriteForUsersOk() (*[]string, bool)`

GetFavoriteForUsersOk returns a tuple with the FavoriteForUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsers

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetFavoriteForUsers(v []string)`

SetFavoriteForUsers sets FavoriteForUsers field to given value.


### GetFavoriteUsers

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetFavoriteUsers() []MwserverInternalSchemasUserPlainResponse`

GetFavoriteUsers returns the FavoriteUsers field if non-nil, zero value otherwise.

### GetFavoriteUsersOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetFavoriteUsersOk() (*[]MwserverInternalSchemasUserPlainResponse, bool)`

GetFavoriteUsersOk returns a tuple with the FavoriteUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteUsers

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetFavoriteUsers(v []MwserverInternalSchemasUserPlainResponse)`

SetFavoriteUsers sets FavoriteUsers field to given value.


### GetImageUrl

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetImageUrl() string`

GetImageUrl returns the ImageUrl field if non-nil, zero value otherwise.

### GetImageUrlOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetImageUrlOk() (*string, bool)`

GetImageUrlOk returns a tuple with the ImageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImageUrl

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetImageUrl(v string)`

SetImageUrl sets ImageUrl field to given value.


### GetIsMentor

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetIsMentor() bool`

GetIsMentor returns the IsMentor field if non-nil, zero value otherwise.

### GetIsMentorOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetIsMentorOk() (*bool, bool)`

GetIsMentorOk returns a tuple with the IsMentor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsMentor

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetIsMentor(v bool)`

SetIsMentor sets IsMentor field to given value.


### GetName

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetProjects

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetProjects() []MwserverInternalSchemasProjectPlainResponse`

GetProjects returns the Projects field if non-nil, zero value otherwise.

### GetProjectsOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetProjectsOk() (*[]MwserverInternalSchemasProjectPlainResponse, bool)`

GetProjectsOk returns a tuple with the Projects field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjects

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetProjects(v []MwserverInternalSchemasProjectPlainResponse)`

SetProjects sets Projects field to given value.


### GetTags

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetTags() []MwserverInternalSchemasUserTagResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetTagsOk() (*[]MwserverInternalSchemasUserTagResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetTags(v []MwserverInternalSchemasUserTagResponse)`

SetTags sets Tags field to given value.


### GetUuid

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayRequests

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetWayRequests() []MwserverInternalSchemasWayPlainResponse`

GetWayRequests returns the WayRequests field if non-nil, zero value otherwise.

### GetWayRequestsOk

`func (o *MwserverInternalSchemasUserPopulatedResponse) GetWayRequestsOk() (*[]MwserverInternalSchemasWayPlainResponse, bool)`

GetWayRequestsOk returns a tuple with the WayRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayRequests

`func (o *MwserverInternalSchemasUserPopulatedResponse) SetWayRequests(v []MwserverInternalSchemasWayPlainResponse)`

SetWayRequests sets WayRequests field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


