# MwTrainingBffInternalSchemasTrainingPreview

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**Description** | **string** |  | 
**FavoriteForUsersAmount** | **int32** |  | 
**IsPrivate** | **bool** |  | 
**Mentors** | [**[]MwTrainingBffInternalSchemasUser**](MwTrainingBffInternalSchemasUser.md) |  | 
**Name** | **string** |  | 
**Owner** | [**MwTrainingBffInternalSchemasUser**](MwTrainingBffInternalSchemasUser.md) |  | 
**StudentsAmount** | **int32** |  | 
**TopicsAmount** | **int32** |  | 
**TrainingTag** | [**[]MwTrainingBffInternalSchemasTrainingTag**](MwTrainingBffInternalSchemasTrainingTag.md) |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 

## Methods

### NewMwTrainingBffInternalSchemasTrainingPreview

`func NewMwTrainingBffInternalSchemasTrainingPreview(createdAt string, description string, favoriteForUsersAmount int32, isPrivate bool, mentors []MwTrainingBffInternalSchemasUser, name string, owner MwTrainingBffInternalSchemasUser, studentsAmount int32, topicsAmount int32, trainingTag []MwTrainingBffInternalSchemasTrainingTag, updatedAt string, uuid string, ) *MwTrainingBffInternalSchemasTrainingPreview`

NewMwTrainingBffInternalSchemasTrainingPreview instantiates a new MwTrainingBffInternalSchemasTrainingPreview object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwTrainingBffInternalSchemasTrainingPreviewWithDefaults

`func NewMwTrainingBffInternalSchemasTrainingPreviewWithDefaults() *MwTrainingBffInternalSchemasTrainingPreview`

NewMwTrainingBffInternalSchemasTrainingPreviewWithDefaults instantiates a new MwTrainingBffInternalSchemasTrainingPreview object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetDescription

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetFavoriteForUsersAmount

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetFavoriteForUsersAmount() int32`

GetFavoriteForUsersAmount returns the FavoriteForUsersAmount field if non-nil, zero value otherwise.

### GetFavoriteForUsersAmountOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetFavoriteForUsersAmountOk() (*int32, bool)`

GetFavoriteForUsersAmountOk returns a tuple with the FavoriteForUsersAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsersAmount

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetFavoriteForUsersAmount(v int32)`

SetFavoriteForUsersAmount sets FavoriteForUsersAmount field to given value.


### GetIsPrivate

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetMentors

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetMentors() []MwTrainingBffInternalSchemasUser`

GetMentors returns the Mentors field if non-nil, zero value otherwise.

### GetMentorsOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetMentorsOk() (*[]MwTrainingBffInternalSchemasUser, bool)`

GetMentorsOk returns a tuple with the Mentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentors

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetMentors(v []MwTrainingBffInternalSchemasUser)`

SetMentors sets Mentors field to given value.


### GetName

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetName(v string)`

SetName sets Name field to given value.


### GetOwner

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetOwner() MwTrainingBffInternalSchemasUser`

GetOwner returns the Owner field if non-nil, zero value otherwise.

### GetOwnerOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetOwnerOk() (*MwTrainingBffInternalSchemasUser, bool)`

GetOwnerOk returns a tuple with the Owner field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwner

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetOwner(v MwTrainingBffInternalSchemasUser)`

SetOwner sets Owner field to given value.


### GetStudentsAmount

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetStudentsAmount() int32`

GetStudentsAmount returns the StudentsAmount field if non-nil, zero value otherwise.

### GetStudentsAmountOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetStudentsAmountOk() (*int32, bool)`

GetStudentsAmountOk returns a tuple with the StudentsAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStudentsAmount

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetStudentsAmount(v int32)`

SetStudentsAmount sets StudentsAmount field to given value.


### GetTopicsAmount

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetTopicsAmount() int32`

GetTopicsAmount returns the TopicsAmount field if non-nil, zero value otherwise.

### GetTopicsAmountOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetTopicsAmountOk() (*int32, bool)`

GetTopicsAmountOk returns a tuple with the TopicsAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTopicsAmount

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetTopicsAmount(v int32)`

SetTopicsAmount sets TopicsAmount field to given value.


### GetTrainingTag

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetTrainingTag() []MwTrainingBffInternalSchemasTrainingTag`

GetTrainingTag returns the TrainingTag field if non-nil, zero value otherwise.

### GetTrainingTagOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetTrainingTagOk() (*[]MwTrainingBffInternalSchemasTrainingTag, bool)`

GetTrainingTagOk returns a tuple with the TrainingTag field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTrainingTag

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetTrainingTag(v []MwTrainingBffInternalSchemasTrainingTag)`

SetTrainingTag sets TrainingTag field to given value.


### GetUpdatedAt

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwTrainingBffInternalSchemasTrainingPreview) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwTrainingBffInternalSchemasTrainingPreview) SetUuid(v string)`

SetUuid sets Uuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


