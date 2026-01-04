# MwGeneralBffInternalSchemasCurrentUserResponse

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
**ProfileSetting** | [**MwGeneralBffInternalSchemasProfileSetting**](MwGeneralBffInternalSchemasProfileSetting.md) |  | 
**Projects** | [**[]MwGeneralBffInternalSchemasProjectPlainResponse**](MwGeneralBffInternalSchemasProjectPlainResponse.md) |  | 
**Tags** | [**[]MwGeneralBffInternalSchemasUserTagResponse**](MwGeneralBffInternalSchemasUserTagResponse.md) |  | 
**UserContacts** | [**[]MwGeneralBffInternalSchemasUserContact**](MwGeneralBffInternalSchemasUserContact.md) |  | 
**Uuid** | **string** |  | 
**WayRequests** | [**[]MwGeneralBffInternalSchemasWayPlainResponse**](MwGeneralBffInternalSchemasWayPlainResponse.md) |  | 

## Methods

### NewMwGeneralBffInternalSchemasCurrentUserResponse

`func NewMwGeneralBffInternalSchemasCurrentUserResponse(createdAt string, customWayCollections []MwGeneralBffInternalSchemasWayCollectionPopulatedResponse, defaultWayCollections MwGeneralBffInternalSchemasDefaultWayCollections, description string, email string, favoriteForUsers []string, favoriteUsers []MwGeneralBffInternalSchemasUserPlainResponse, imageUrl string, isMentor bool, name string, profileSetting MwGeneralBffInternalSchemasProfileSetting, projects []MwGeneralBffInternalSchemasProjectPlainResponse, tags []MwGeneralBffInternalSchemasUserTagResponse, userContacts []MwGeneralBffInternalSchemasUserContact, uuid string, wayRequests []MwGeneralBffInternalSchemasWayPlainResponse, ) *MwGeneralBffInternalSchemasCurrentUserResponse`

NewMwGeneralBffInternalSchemasCurrentUserResponse instantiates a new MwGeneralBffInternalSchemasCurrentUserResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwGeneralBffInternalSchemasCurrentUserResponseWithDefaults

`func NewMwGeneralBffInternalSchemasCurrentUserResponseWithDefaults() *MwGeneralBffInternalSchemasCurrentUserResponse`

NewMwGeneralBffInternalSchemasCurrentUserResponseWithDefaults instantiates a new MwGeneralBffInternalSchemasCurrentUserResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetCustomWayCollections

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetCustomWayCollections() []MwGeneralBffInternalSchemasWayCollectionPopulatedResponse`

GetCustomWayCollections returns the CustomWayCollections field if non-nil, zero value otherwise.

### GetCustomWayCollectionsOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetCustomWayCollectionsOk() (*[]MwGeneralBffInternalSchemasWayCollectionPopulatedResponse, bool)`

GetCustomWayCollectionsOk returns a tuple with the CustomWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCustomWayCollections

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetCustomWayCollections(v []MwGeneralBffInternalSchemasWayCollectionPopulatedResponse)`

SetCustomWayCollections sets CustomWayCollections field to given value.


### GetDefaultWayCollections

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetDefaultWayCollections() MwGeneralBffInternalSchemasDefaultWayCollections`

GetDefaultWayCollections returns the DefaultWayCollections field if non-nil, zero value otherwise.

### GetDefaultWayCollectionsOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetDefaultWayCollectionsOk() (*MwGeneralBffInternalSchemasDefaultWayCollections, bool)`

GetDefaultWayCollectionsOk returns a tuple with the DefaultWayCollections field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultWayCollections

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetDefaultWayCollections(v MwGeneralBffInternalSchemasDefaultWayCollections)`

SetDefaultWayCollections sets DefaultWayCollections field to given value.


### GetDescription

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetEmail

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetFavoriteForUsers

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetFavoriteForUsers() []string`

GetFavoriteForUsers returns the FavoriteForUsers field if non-nil, zero value otherwise.

### GetFavoriteForUsersOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetFavoriteForUsersOk() (*[]string, bool)`

GetFavoriteForUsersOk returns a tuple with the FavoriteForUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsers

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetFavoriteForUsers(v []string)`

SetFavoriteForUsers sets FavoriteForUsers field to given value.


### GetFavoriteUsers

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetFavoriteUsers() []MwGeneralBffInternalSchemasUserPlainResponse`

GetFavoriteUsers returns the FavoriteUsers field if non-nil, zero value otherwise.

### GetFavoriteUsersOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetFavoriteUsersOk() (*[]MwGeneralBffInternalSchemasUserPlainResponse, bool)`

GetFavoriteUsersOk returns a tuple with the FavoriteUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteUsers

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetFavoriteUsers(v []MwGeneralBffInternalSchemasUserPlainResponse)`

SetFavoriteUsers sets FavoriteUsers field to given value.


### GetImageUrl

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetImageUrl() string`

GetImageUrl returns the ImageUrl field if non-nil, zero value otherwise.

### GetImageUrlOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetImageUrlOk() (*string, bool)`

GetImageUrlOk returns a tuple with the ImageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImageUrl

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetImageUrl(v string)`

SetImageUrl sets ImageUrl field to given value.


### GetIsMentor

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetIsMentor() bool`

GetIsMentor returns the IsMentor field if non-nil, zero value otherwise.

### GetIsMentorOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetIsMentorOk() (*bool, bool)`

GetIsMentorOk returns a tuple with the IsMentor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsMentor

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetIsMentor(v bool)`

SetIsMentor sets IsMentor field to given value.


### GetName

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetName(v string)`

SetName sets Name field to given value.


### GetProfileSetting

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetProfileSetting() MwGeneralBffInternalSchemasProfileSetting`

GetProfileSetting returns the ProfileSetting field if non-nil, zero value otherwise.

### GetProfileSettingOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetProfileSettingOk() (*MwGeneralBffInternalSchemasProfileSetting, bool)`

GetProfileSettingOk returns a tuple with the ProfileSetting field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProfileSetting

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetProfileSetting(v MwGeneralBffInternalSchemasProfileSetting)`

SetProfileSetting sets ProfileSetting field to given value.


### GetProjects

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetProjects() []MwGeneralBffInternalSchemasProjectPlainResponse`

GetProjects returns the Projects field if non-nil, zero value otherwise.

### GetProjectsOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetProjectsOk() (*[]MwGeneralBffInternalSchemasProjectPlainResponse, bool)`

GetProjectsOk returns a tuple with the Projects field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjects

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetProjects(v []MwGeneralBffInternalSchemasProjectPlainResponse)`

SetProjects sets Projects field to given value.


### GetTags

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetTags() []MwGeneralBffInternalSchemasUserTagResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetTagsOk() (*[]MwGeneralBffInternalSchemasUserTagResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetTags(v []MwGeneralBffInternalSchemasUserTagResponse)`

SetTags sets Tags field to given value.


### GetUserContacts

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetUserContacts() []MwGeneralBffInternalSchemasUserContact`

GetUserContacts returns the UserContacts field if non-nil, zero value otherwise.

### GetUserContactsOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetUserContactsOk() (*[]MwGeneralBffInternalSchemasUserContact, bool)`

GetUserContactsOk returns a tuple with the UserContacts field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserContacts

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetUserContacts(v []MwGeneralBffInternalSchemasUserContact)`

SetUserContacts sets UserContacts field to given value.


### GetUuid

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayRequests

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetWayRequests() []MwGeneralBffInternalSchemasWayPlainResponse`

GetWayRequests returns the WayRequests field if non-nil, zero value otherwise.

### GetWayRequestsOk

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) GetWayRequestsOk() (*[]MwGeneralBffInternalSchemasWayPlainResponse, bool)`

GetWayRequestsOk returns a tuple with the WayRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayRequests

`func (o *MwGeneralBffInternalSchemasCurrentUserResponse) SetWayRequests(v []MwGeneralBffInternalSchemasWayPlainResponse)`

SetWayRequests sets WayRequests field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


