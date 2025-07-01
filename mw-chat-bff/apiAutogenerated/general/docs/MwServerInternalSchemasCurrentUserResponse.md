# MwServerInternalSchemasCurrentUserResponse

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
**ProfileSetting** | [**MwServerInternalSchemasProfileSetting**](MwServerInternalSchemasProfileSetting.md) |  | 
**Projects** | [**[]MwServerInternalSchemasProjectPlainResponse**](MwServerInternalSchemasProjectPlainResponse.md) |  | 
**Tags** | [**[]MwServerInternalSchemasUserTagResponse**](MwServerInternalSchemasUserTagResponse.md) |  | 
**UserContacts** | [**[]MwServerInternalSchemasUserContact**](MwServerInternalSchemasUserContact.md) |  | 
**Uuid** | **string** |  | 
**WayRequests** | [**[]MwServerInternalSchemasWayPlainResponse**](MwServerInternalSchemasWayPlainResponse.md) |  | 

## Methods

### NewMwServerInternalSchemasCurrentUserResponse

`func NewMwServerInternalSchemasCurrentUserResponse(createdAt string, customWayCollections []MwServerInternalSchemasWayCollectionPopulatedResponse, defaultWayCollections MwServerInternalSchemasDefaultWayCollections, description string, email string, favoriteForUsers []string, favoriteUsers []MwServerInternalSchemasUserPlainResponse, imageUrl string, isMentor bool, name string, profileSetting MwServerInternalSchemasProfileSetting, projects []MwServerInternalSchemasProjectPlainResponse, tags []MwServerInternalSchemasUserTagResponse, userContacts []MwServerInternalSchemasUserContact, uuid string, wayRequests []MwServerInternalSchemasWayPlainResponse, ) *MwServerInternalSchemasCurrentUserResponse`

NewMwServerInternalSchemasCurrentUserResponse instantiates a new MwServerInternalSchemasCurrentUserResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwServerInternalSchemasCurrentUserResponseWithDefaults

`func NewMwServerInternalSchemasCurrentUserResponseWithDefaults() *MwServerInternalSchemasCurrentUserResponse`

NewMwServerInternalSchemasCurrentUserResponseWithDefaults instantiates a new MwServerInternalSchemasCurrentUserResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *MwServerInternalSchemasCurrentUserResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwServerInternalSchemasCurrentUserResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetCustomWayCollections

`func (o *MwServerInternalSchemasCurrentUserResponse) GetCustomWayCollections() []MwServerInternalSchemasWayCollectionPopulatedResponse`

GetCustomWayCollections returns the CustomWayCollections field if non-nil, zero value otherwise.

### GetCustomWayCollectionsOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetCustomWayCollectionsOk() (*[]MwServerInternalSchemasWayCollectionPopulatedResponse, bool)`

GetCustomWayCollectionsOk returns a tuple with the CustomWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCustomWayCollections

`func (o *MwServerInternalSchemasCurrentUserResponse) SetCustomWayCollections(v []MwServerInternalSchemasWayCollectionPopulatedResponse)`

SetCustomWayCollections sets CustomWayCollections field to given value.


### GetDefaultWayCollections

`func (o *MwServerInternalSchemasCurrentUserResponse) GetDefaultWayCollections() MwServerInternalSchemasDefaultWayCollections`

GetDefaultWayCollections returns the DefaultWayCollections field if non-nil, zero value otherwise.

### GetDefaultWayCollectionsOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetDefaultWayCollectionsOk() (*MwServerInternalSchemasDefaultWayCollections, bool)`

GetDefaultWayCollectionsOk returns a tuple with the DefaultWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultWayCollections

`func (o *MwServerInternalSchemasCurrentUserResponse) SetDefaultWayCollections(v MwServerInternalSchemasDefaultWayCollections)`

SetDefaultWayCollections sets DefaultWayCollections field to given value.


### GetDescription

`func (o *MwServerInternalSchemasCurrentUserResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwServerInternalSchemasCurrentUserResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetEmail

`func (o *MwServerInternalSchemasCurrentUserResponse) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *MwServerInternalSchemasCurrentUserResponse) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetFavoriteForUsers

`func (o *MwServerInternalSchemasCurrentUserResponse) GetFavoriteForUsers() []string`

GetFavoriteForUsers returns the FavoriteForUsers field if non-nil, zero value otherwise.

### GetFavoriteForUsersOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetFavoriteForUsersOk() (*[]string, bool)`

GetFavoriteForUsersOk returns a tuple with the FavoriteForUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsers

`func (o *MwServerInternalSchemasCurrentUserResponse) SetFavoriteForUsers(v []string)`

SetFavoriteForUsers sets FavoriteForUsers field to given value.


### GetFavoriteUsers

`func (o *MwServerInternalSchemasCurrentUserResponse) GetFavoriteUsers() []MwServerInternalSchemasUserPlainResponse`

GetFavoriteUsers returns the FavoriteUsers field if non-nil, zero value otherwise.

### GetFavoriteUsersOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetFavoriteUsersOk() (*[]MwServerInternalSchemasUserPlainResponse, bool)`

GetFavoriteUsersOk returns a tuple with the FavoriteUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteUsers

`func (o *MwServerInternalSchemasCurrentUserResponse) SetFavoriteUsers(v []MwServerInternalSchemasUserPlainResponse)`

SetFavoriteUsers sets FavoriteUsers field to given value.


### GetImageUrl

`func (o *MwServerInternalSchemasCurrentUserResponse) GetImageUrl() string`

GetImageUrl returns the ImageUrl field if non-nil, zero value otherwise.

### GetImageUrlOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetImageUrlOk() (*string, bool)`

GetImageUrlOk returns a tuple with the ImageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImageUrl

`func (o *MwServerInternalSchemasCurrentUserResponse) SetImageUrl(v string)`

SetImageUrl sets ImageUrl field to given value.


### GetIsMentor

`func (o *MwServerInternalSchemasCurrentUserResponse) GetIsMentor() bool`

GetIsMentor returns the IsMentor field if non-nil, zero value otherwise.

### GetIsMentorOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetIsMentorOk() (*bool, bool)`

GetIsMentorOk returns a tuple with the IsMentor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsMentor

`func (o *MwServerInternalSchemasCurrentUserResponse) SetIsMentor(v bool)`

SetIsMentor sets IsMentor field to given value.


### GetName

`func (o *MwServerInternalSchemasCurrentUserResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwServerInternalSchemasCurrentUserResponse) SetName(v string)`

SetName sets Name field to given value.


### GetProfileSetting

`func (o *MwServerInternalSchemasCurrentUserResponse) GetProfileSetting() MwServerInternalSchemasProfileSetting`

GetProfileSetting returns the ProfileSetting field if non-nil, zero value otherwise.

### GetProfileSettingOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetProfileSettingOk() (*MwServerInternalSchemasProfileSetting, bool)`

GetProfileSettingOk returns a tuple with the ProfileSetting field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProfileSetting

`func (o *MwServerInternalSchemasCurrentUserResponse) SetProfileSetting(v MwServerInternalSchemasProfileSetting)`

SetProfileSetting sets ProfileSetting field to given value.


### GetProjects

`func (o *MwServerInternalSchemasCurrentUserResponse) GetProjects() []MwServerInternalSchemasProjectPlainResponse`

GetProjects returns the Projects field if non-nil, zero value otherwise.

### GetProjectsOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetProjectsOk() (*[]MwServerInternalSchemasProjectPlainResponse, bool)`

GetProjectsOk returns a tuple with the Projects field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjects

`func (o *MwServerInternalSchemasCurrentUserResponse) SetProjects(v []MwServerInternalSchemasProjectPlainResponse)`

SetProjects sets Projects field to given value.


### GetTags

`func (o *MwServerInternalSchemasCurrentUserResponse) GetTags() []MwServerInternalSchemasUserTagResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetTagsOk() (*[]MwServerInternalSchemasUserTagResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *MwServerInternalSchemasCurrentUserResponse) SetTags(v []MwServerInternalSchemasUserTagResponse)`

SetTags sets Tags field to given value.


### GetUserContacts

`func (o *MwServerInternalSchemasCurrentUserResponse) GetUserContacts() []MwServerInternalSchemasUserContact`

GetUserContacts returns the UserContacts field if non-nil, zero value otherwise.

### GetUserContactsOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetUserContactsOk() (*[]MwServerInternalSchemasUserContact, bool)`

GetUserContactsOk returns a tuple with the UserContacts field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserContacts

`func (o *MwServerInternalSchemasCurrentUserResponse) SetUserContacts(v []MwServerInternalSchemasUserContact)`

SetUserContacts sets UserContacts field to given value.


### GetUuid

`func (o *MwServerInternalSchemasCurrentUserResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwServerInternalSchemasCurrentUserResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayRequests

`func (o *MwServerInternalSchemasCurrentUserResponse) GetWayRequests() []MwServerInternalSchemasWayPlainResponse`

GetWayRequests returns the WayRequests field if non-nil, zero value otherwise.

### GetWayRequestsOk

`func (o *MwServerInternalSchemasCurrentUserResponse) GetWayRequestsOk() (*[]MwServerInternalSchemasWayPlainResponse, bool)`

GetWayRequestsOk returns a tuple with the WayRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayRequests

`func (o *MwServerInternalSchemasCurrentUserResponse) SetWayRequests(v []MwServerInternalSchemasWayPlainResponse)`

SetWayRequests sets WayRequests field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


