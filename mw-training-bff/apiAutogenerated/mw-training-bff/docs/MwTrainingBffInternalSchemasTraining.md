# MwTrainingBffInternalSchemasTraining

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**Description** | **string** |  | 
**FavoriteForUserUuids** | **[]string** |  | 
**IsPrivate** | **bool** |  | 
**Mentors** | [**[]MwTrainingBffInternalSchemasUser**](MwTrainingBffInternalSchemasUser.md) |  | 
**Name** | **string** |  | 
**Owner** | [**MwTrainingBffInternalSchemasUser**](MwTrainingBffInternalSchemasUser.md) |  | 
**Students** | [**[]MwTrainingBffInternalSchemasUser**](MwTrainingBffInternalSchemasUser.md) |  | 
**Topics** | [**[]MwTrainingBffInternalSchemasTopic**](MwTrainingBffInternalSchemasTopic.md) |  | 
**TrainingTags** | [**[]MwTrainingBffInternalSchemasTrainingTag**](MwTrainingBffInternalSchemasTrainingTag.md) |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 

## Methods

### NewMwTrainingBffInternalSchemasTraining

`func NewMwTrainingBffInternalSchemasTraining(createdAt string, description string, favoriteForUserUuids []string, isPrivate bool, mentors []MwTrainingBffInternalSchemasUser, name string, owner MwTrainingBffInternalSchemasUser, students []MwTrainingBffInternalSchemasUser, topics []MwTrainingBffInternalSchemasTopic, trainingTags []MwTrainingBffInternalSchemasTrainingTag, updatedAt string, uuid string, ) *MwTrainingBffInternalSchemasTraining`

NewMwTrainingBffInternalSchemasTraining instantiates a new MwTrainingBffInternalSchemasTraining object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwTrainingBffInternalSchemasTrainingWithDefaults

`func NewMwTrainingBffInternalSchemasTrainingWithDefaults() *MwTrainingBffInternalSchemasTraining`

NewMwTrainingBffInternalSchemasTrainingWithDefaults instantiates a new MwTrainingBffInternalSchemasTraining object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *MwTrainingBffInternalSchemasTraining) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwTrainingBffInternalSchemasTraining) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwTrainingBffInternalSchemasTraining) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetDescription

`func (o *MwTrainingBffInternalSchemasTraining) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwTrainingBffInternalSchemasTraining) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwTrainingBffInternalSchemasTraining) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetFavoriteForUserUuids

`func (o *MwTrainingBffInternalSchemasTraining) GetFavoriteForUserUuids() []string`

GetFavoriteForUserUuids returns the FavoriteForUserUuids field if non-nil, zero value otherwise.

### GetFavoriteForUserUuidsOk

`func (o *MwTrainingBffInternalSchemasTraining) GetFavoriteForUserUuidsOk() (*[]string, bool)`

GetFavoriteForUserUuidsOk returns a tuple with the FavoriteForUserUuids field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUserUuids

`func (o *MwTrainingBffInternalSchemasTraining) SetFavoriteForUserUuids(v []string)`

SetFavoriteForUserUuids sets FavoriteForUserUuids field to given value.


### GetIsPrivate

`func (o *MwTrainingBffInternalSchemasTraining) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *MwTrainingBffInternalSchemasTraining) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *MwTrainingBffInternalSchemasTraining) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetMentors

`func (o *MwTrainingBffInternalSchemasTraining) GetMentors() []MwTrainingBffInternalSchemasUser`

GetMentors returns the Mentors field if non-nil, zero value otherwise.

### GetMentorsOk

`func (o *MwTrainingBffInternalSchemasTraining) GetMentorsOk() (*[]MwTrainingBffInternalSchemasUser, bool)`

GetMentorsOk returns a tuple with the Mentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentors

`func (o *MwTrainingBffInternalSchemasTraining) SetMentors(v []MwTrainingBffInternalSchemasUser)`

SetMentors sets Mentors field to given value.


### GetName

`func (o *MwTrainingBffInternalSchemasTraining) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwTrainingBffInternalSchemasTraining) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwTrainingBffInternalSchemasTraining) SetName(v string)`

SetName sets Name field to given value.


### GetOwner

`func (o *MwTrainingBffInternalSchemasTraining) GetOwner() MwTrainingBffInternalSchemasUser`

GetOwner returns the Owner field if non-nil, zero value otherwise.

### GetOwnerOk

`func (o *MwTrainingBffInternalSchemasTraining) GetOwnerOk() (*MwTrainingBffInternalSchemasUser, bool)`

GetOwnerOk returns a tuple with the Owner field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwner

`func (o *MwTrainingBffInternalSchemasTraining) SetOwner(v MwTrainingBffInternalSchemasUser)`

SetOwner sets Owner field to given value.


### GetStudents

`func (o *MwTrainingBffInternalSchemasTraining) GetStudents() []MwTrainingBffInternalSchemasUser`

GetStudents returns the Students field if non-nil, zero value otherwise.

### GetStudentsOk

`func (o *MwTrainingBffInternalSchemasTraining) GetStudentsOk() (*[]MwTrainingBffInternalSchemasUser, bool)`

GetStudentsOk returns a tuple with the Students field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStudents

`func (o *MwTrainingBffInternalSchemasTraining) SetStudents(v []MwTrainingBffInternalSchemasUser)`

SetStudents sets Students field to given value.


### GetTopics

`func (o *MwTrainingBffInternalSchemasTraining) GetTopics() []MwTrainingBffInternalSchemasTopic`

GetTopics returns the Topics field if non-nil, zero value otherwise.

### GetTopicsOk

`func (o *MwTrainingBffInternalSchemasTraining) GetTopicsOk() (*[]MwTrainingBffInternalSchemasTopic, bool)`

GetTopicsOk returns a tuple with the Topics field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTopics

`func (o *MwTrainingBffInternalSchemasTraining) SetTopics(v []MwTrainingBffInternalSchemasTopic)`

SetTopics sets Topics field to given value.


### GetTrainingTags

`func (o *MwTrainingBffInternalSchemasTraining) GetTrainingTags() []MwTrainingBffInternalSchemasTrainingTag`

GetTrainingTags returns the TrainingTags field if non-nil, zero value otherwise.

### GetTrainingTagsOk

`func (o *MwTrainingBffInternalSchemasTraining) GetTrainingTagsOk() (*[]MwTrainingBffInternalSchemasTrainingTag, bool)`

GetTrainingTagsOk returns a tuple with the TrainingTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTrainingTags

`func (o *MwTrainingBffInternalSchemasTraining) SetTrainingTags(v []MwTrainingBffInternalSchemasTrainingTag)`

SetTrainingTags sets TrainingTags field to given value.


### GetUpdatedAt

`func (o *MwTrainingBffInternalSchemasTraining) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwTrainingBffInternalSchemasTraining) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwTrainingBffInternalSchemasTraining) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwTrainingBffInternalSchemasTraining) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwTrainingBffInternalSchemasTraining) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwTrainingBffInternalSchemasTraining) SetUuid(v string)`

SetUuid sets Uuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


