# MwGeneralBffInternalSchemasUserPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**CustomWayCollections** | [**[]MwGeneralBffInternalSchemasWayCollectionPopulatedResponse**](MwGeneralBffInternalSchemasWayCollectionPopulatedResponse.md) |  | 
**DefaultWayCollections** | [**MwGeneralBffInternalSchemasDefaultWayCollections**](MwGeneralBffInternalSchemasDefaultWayCollections.md) |  | 
**Description** | **string** |  | 
**Email** | **string** |  | 
**FavoriteForUsers** | **[]string** |  | 
**FavoriteUsers** | [**[]MwGeneralBffInternalSchemasUserPlainResponse**](MwGeneralBffInternalSchemasUserPlainResponse.md) |  | 
**ImageUrl** | **string** |  | 
**IsMentor** | **bool** |  | 
**Name** | **string** |  | 
**Projects** | [**[]MwGeneralBffInternalSchemasProjectPlainResponse**](MwGeneralBffInternalSchemasProjectPlainResponse.md) |  | 
**Tags** | [**[]MwGeneralBffInternalSchemasUserTagResponse**](MwGeneralBffInternalSchemasUserTagResponse.md) |  | 
**UserContacts** | [**[]MwGeneralBffInternalSchemasUserContact**](MwGeneralBffInternalSchemasUserContact.md) |  | 
**Uuid** | **string** |  | 
**WayRequests** | [**[]MwGeneralBffInternalSchemasWayPlainResponse**](MwGeneralBffInternalSchemasWayPlainResponse.md) |  | 

## Methods

### NewMwGeneralBffInternalSchemasUserPopulatedResponse

`func NewMwGeneralBffInternalSchemasUserPopulatedResponse(createdAt string, customWayCollections []MwGeneralBffInternalSchemasWayCollectionPopulatedResponse, defaultWayCollections MwGeneralBffInternalSchemasDefaultWayCollections, description string, email string, favoriteForUsers []string, favoriteUsers []MwGeneralBffInternalSchemasUserPlainResponse, imageUrl string, isMentor bool, name string, projects []MwGeneralBffInternalSchemasProjectPlainResponse, tags []MwGeneralBffInternalSchemasUserTagResponse, userContacts []MwGeneralBffInternalSchemasUserContact, uuid string, wayRequests []MwGeneralBffInternalSchemasWayPlainResponse, ) *MwGeneralBffInternalSchemasUserPopulatedResponse`

NewMwGeneralBffInternalSchemasUserPopulatedResponse instantiates a new MwGeneralBffInternalSchemasUserPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwGeneralBffInternalSchemasUserPopulatedResponseWithDefaults

`func NewMwGeneralBffInternalSchemasUserPopulatedResponseWithDefaults() *MwGeneralBffInternalSchemasUserPopulatedResponse`

NewMwGeneralBffInternalSchemasUserPopulatedResponseWithDefaults instantiates a new MwGeneralBffInternalSchemasUserPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetCustomWayCollections

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetCustomWayCollections() []MwGeneralBffInternalSchemasWayCollectionPopulatedResponse`

GetCustomWayCollections returns the CustomWayCollections field if non-nil, zero value otherwise.

### GetCustomWayCollectionsOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetCustomWayCollectionsOk() (*[]MwGeneralBffInternalSchemasWayCollectionPopulatedResponse, bool)`

GetCustomWayCollectionsOk returns a tuple with the CustomWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCustomWayCollections

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetCustomWayCollections(v []MwGeneralBffInternalSchemasWayCollectionPopulatedResponse)`

SetCustomWayCollections sets CustomWayCollections field to given value.


### GetDefaultWayCollections

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetDefaultWayCollections() MwGeneralBffInternalSchemasDefaultWayCollections`

GetDefaultWayCollections returns the DefaultWayCollections field if non-nil, zero value otherwise.

### GetDefaultWayCollectionsOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetDefaultWayCollectionsOk() (*MwGeneralBffInternalSchemasDefaultWayCollections, bool)`

GetDefaultWayCollectionsOk returns a tuple with the DefaultWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultWayCollections

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetDefaultWayCollections(v MwGeneralBffInternalSchemasDefaultWayCollections)`

SetDefaultWayCollections sets DefaultWayCollections field to given value.


### GetDescription

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetEmail

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetFavoriteForUsers

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetFavoriteForUsers() []string`

GetFavoriteForUsers returns the FavoriteForUsers field if non-nil, zero value otherwise.

### GetFavoriteForUsersOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetFavoriteForUsersOk() (*[]string, bool)`

GetFavoriteForUsersOk returns a tuple with the FavoriteForUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsers

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetFavoriteForUsers(v []string)`

SetFavoriteForUsers sets FavoriteForUsers field to given value.


### GetFavoriteUsers

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetFavoriteUsers() []MwGeneralBffInternalSchemasUserPlainResponse`

GetFavoriteUsers returns the FavoriteUsers field if non-nil, zero value otherwise.

### GetFavoriteUsersOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetFavoriteUsersOk() (*[]MwGeneralBffInternalSchemasUserPlainResponse, bool)`

GetFavoriteUsersOk returns a tuple with the FavoriteUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteUsers

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetFavoriteUsers(v []MwGeneralBffInternalSchemasUserPlainResponse)`

SetFavoriteUsers sets FavoriteUsers field to given value.


### GetImageUrl

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetImageUrl() string`

GetImageUrl returns the ImageUrl field if non-nil, zero value otherwise.

### GetImageUrlOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetImageUrlOk() (*string, bool)`

GetImageUrlOk returns a tuple with the ImageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImageUrl

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetImageUrl(v string)`

SetImageUrl sets ImageUrl field to given value.


### GetIsMentor

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetIsMentor() bool`

GetIsMentor returns the IsMentor field if non-nil, zero value otherwise.

### GetIsMentorOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetIsMentorOk() (*bool, bool)`

GetIsMentorOk returns a tuple with the IsMentor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsMentor

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetIsMentor(v bool)`

SetIsMentor sets IsMentor field to given value.


### GetName

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetProjects

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetProjects() []MwGeneralBffInternalSchemasProjectPlainResponse`

GetProjects returns the Projects field if non-nil, zero value otherwise.

### GetProjectsOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetProjectsOk() (*[]MwGeneralBffInternalSchemasProjectPlainResponse, bool)`

GetProjectsOk returns a tuple with the Projects field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjects

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetProjects(v []MwGeneralBffInternalSchemasProjectPlainResponse)`

SetProjects sets Projects field to given value.


### GetTags

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetTags() []MwGeneralBffInternalSchemasUserTagResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetTagsOk() (*[]MwGeneralBffInternalSchemasUserTagResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetTags(v []MwGeneralBffInternalSchemasUserTagResponse)`

SetTags sets Tags field to given value.


### GetUserContacts

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetUserContacts() []MwGeneralBffInternalSchemasUserContact`

GetUserContacts returns the UserContacts field if non-nil, zero value otherwise.

### GetUserContactsOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetUserContactsOk() (*[]MwGeneralBffInternalSchemasUserContact, bool)`

GetUserContactsOk returns a tuple with the UserContacts field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserContacts

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetUserContacts(v []MwGeneralBffInternalSchemasUserContact)`

SetUserContacts sets UserContacts field to given value.


### GetUuid

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayRequests

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetWayRequests() []MwGeneralBffInternalSchemasWayPlainResponse`

GetWayRequests returns the WayRequests field if non-nil, zero value otherwise.

### GetWayRequestsOk

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) GetWayRequestsOk() (*[]MwGeneralBffInternalSchemasWayPlainResponse, bool)`

GetWayRequestsOk returns a tuple with the WayRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayRequests

`func (o *MwGeneralBffInternalSchemasUserPopulatedResponse) SetWayRequests(v []MwGeneralBffInternalSchemasWayPlainResponse)`

SetWayRequests sets WayRequests field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


