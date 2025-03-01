# MwGeneralBffInternalSchemasWayPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Children** | [**[]MwGeneralBffInternalSchemasWayPopulatedResponse**](MwGeneralBffInternalSchemasWayPopulatedResponse.md) |  | 
**CopiedFromWayUuid** | **NullableString** |  | 
**CreatedAt** | **string** |  | 
**EstimationTime** | **int32** |  | 
**FavoriteForUsersAmount** | **int32** |  | 
**FormerMentors** | [**[]MwGeneralBffInternalSchemasUserPlainResponse**](MwGeneralBffInternalSchemasUserPlainResponse.md) |  | 
**GoalDescription** | **string** |  | 
**IsCompleted** | **bool** |  | 
**IsPrivate** | **bool** |  | 
**JobTags** | [**[]MwGeneralBffInternalSchemasJobTagResponse**](MwGeneralBffInternalSchemasJobTagResponse.md) |  | 
**MentorRequests** | [**[]MwGeneralBffInternalSchemasUserPlainResponse**](MwGeneralBffInternalSchemasUserPlainResponse.md) |  | 
**Mentors** | [**[]MwGeneralBffInternalSchemasUserPlainResponse**](MwGeneralBffInternalSchemasUserPlainResponse.md) |  | 
**Metrics** | [**[]MwGeneralBffInternalSchemasMetricTreeNode**](MwGeneralBffInternalSchemasMetricTreeNode.md) |  | 
**Name** | **string** |  | 
**Owner** | [**MwGeneralBffInternalSchemasUserPlainResponse**](MwGeneralBffInternalSchemasUserPlainResponse.md) |  | 
**ProjectUuid** | **NullableString** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 
**WayTags** | [**[]MwGeneralBffInternalSchemasWayTagResponse**](MwGeneralBffInternalSchemasWayTagResponse.md) |  | 

## Methods

### NewMwGeneralBffInternalSchemasWayPopulatedResponse

`func NewMwGeneralBffInternalSchemasWayPopulatedResponse(children []MwGeneralBffInternalSchemasWayPopulatedResponse, copiedFromWayUuid NullableString, createdAt string, estimationTime int32, favoriteForUsersAmount int32, formerMentors []MwGeneralBffInternalSchemasUserPlainResponse, goalDescription string, isCompleted bool, isPrivate bool, jobTags []MwGeneralBffInternalSchemasJobTagResponse, mentorRequests []MwGeneralBffInternalSchemasUserPlainResponse, mentors []MwGeneralBffInternalSchemasUserPlainResponse, metrics []MwGeneralBffInternalSchemasMetricTreeNode, name string, owner MwGeneralBffInternalSchemasUserPlainResponse, projectUuid NullableString, updatedAt string, uuid string, wayTags []MwGeneralBffInternalSchemasWayTagResponse, ) *MwGeneralBffInternalSchemasWayPopulatedResponse`

NewMwGeneralBffInternalSchemasWayPopulatedResponse instantiates a new MwGeneralBffInternalSchemasWayPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwGeneralBffInternalSchemasWayPopulatedResponseWithDefaults

`func NewMwGeneralBffInternalSchemasWayPopulatedResponseWithDefaults() *MwGeneralBffInternalSchemasWayPopulatedResponse`

NewMwGeneralBffInternalSchemasWayPopulatedResponseWithDefaults instantiates a new MwGeneralBffInternalSchemasWayPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChildren

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetChildren() []MwGeneralBffInternalSchemasWayPopulatedResponse`

GetChildren returns the Children field if non-nil, zero value otherwise.

### GetChildrenOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetChildrenOk() (*[]MwGeneralBffInternalSchemasWayPopulatedResponse, bool)`

GetChildrenOk returns a tuple with the Children field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChildren

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetChildren(v []MwGeneralBffInternalSchemasWayPopulatedResponse)`

SetChildren sets Children field to given value.


### GetCopiedFromWayUuid

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetCopiedFromWayUuid() string`

GetCopiedFromWayUuid returns the CopiedFromWayUuid field if non-nil, zero value otherwise.

### GetCopiedFromWayUuidOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetCopiedFromWayUuidOk() (*string, bool)`

GetCopiedFromWayUuidOk returns a tuple with the CopiedFromWayUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCopiedFromWayUuid

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetCopiedFromWayUuid(v string)`

SetCopiedFromWayUuid sets CopiedFromWayUuid field to given value.


### SetCopiedFromWayUuidNil

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetCopiedFromWayUuidNil(b bool)`

 SetCopiedFromWayUuidNil sets the value for CopiedFromWayUuid to be an explicit nil

### UnsetCopiedFromWayUuid
`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) UnsetCopiedFromWayUuid()`

UnsetCopiedFromWayUuid ensures that no value is present for CopiedFromWayUuid, not even an explicit nil
### GetCreatedAt

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetEstimationTime

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetEstimationTime() int32`

GetEstimationTime returns the EstimationTime field if non-nil, zero value otherwise.

### GetEstimationTimeOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetEstimationTimeOk() (*int32, bool)`

GetEstimationTimeOk returns a tuple with the EstimationTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEstimationTime

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetEstimationTime(v int32)`

SetEstimationTime sets EstimationTime field to given value.


### GetFavoriteForUsersAmount

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetFavoriteForUsersAmount() int32`

GetFavoriteForUsersAmount returns the FavoriteForUsersAmount field if non-nil, zero value otherwise.

### GetFavoriteForUsersAmountOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetFavoriteForUsersAmountOk() (*int32, bool)`

GetFavoriteForUsersAmountOk returns a tuple with the FavoriteForUsersAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsersAmount

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetFavoriteForUsersAmount(v int32)`

SetFavoriteForUsersAmount sets FavoriteForUsersAmount field to given value.


### GetFormerMentors

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetFormerMentors() []MwGeneralBffInternalSchemasUserPlainResponse`

GetFormerMentors returns the FormerMentors field if non-nil, zero value otherwise.

### GetFormerMentorsOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetFormerMentorsOk() (*[]MwGeneralBffInternalSchemasUserPlainResponse, bool)`

GetFormerMentorsOk returns a tuple with the FormerMentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormerMentors

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetFormerMentors(v []MwGeneralBffInternalSchemasUserPlainResponse)`

SetFormerMentors sets FormerMentors field to given value.


### GetGoalDescription

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetGoalDescription() string`

GetGoalDescription returns the GoalDescription field if non-nil, zero value otherwise.

### GetGoalDescriptionOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetGoalDescriptionOk() (*string, bool)`

GetGoalDescriptionOk returns a tuple with the GoalDescription field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGoalDescription

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetGoalDescription(v string)`

SetGoalDescription sets GoalDescription field to given value.


### GetIsCompleted

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetIsCompleted() bool`

GetIsCompleted returns the IsCompleted field if non-nil, zero value otherwise.

### GetIsCompletedOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetIsCompletedOk() (*bool, bool)`

GetIsCompletedOk returns a tuple with the IsCompleted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsCompleted

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetIsCompleted(v bool)`

SetIsCompleted sets IsCompleted field to given value.


### GetIsPrivate

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetJobTags

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetJobTags() []MwGeneralBffInternalSchemasJobTagResponse`

GetJobTags returns the JobTags field if non-nil, zero value otherwise.

### GetJobTagsOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetJobTagsOk() (*[]MwGeneralBffInternalSchemasJobTagResponse, bool)`

GetJobTagsOk returns a tuple with the JobTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJobTags

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetJobTags(v []MwGeneralBffInternalSchemasJobTagResponse)`

SetJobTags sets JobTags field to given value.


### GetMentorRequests

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetMentorRequests() []MwGeneralBffInternalSchemasUserPlainResponse`

GetMentorRequests returns the MentorRequests field if non-nil, zero value otherwise.

### GetMentorRequestsOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetMentorRequestsOk() (*[]MwGeneralBffInternalSchemasUserPlainResponse, bool)`

GetMentorRequestsOk returns a tuple with the MentorRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentorRequests

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetMentorRequests(v []MwGeneralBffInternalSchemasUserPlainResponse)`

SetMentorRequests sets MentorRequests field to given value.


### GetMentors

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetMentors() []MwGeneralBffInternalSchemasUserPlainResponse`

GetMentors returns the Mentors field if non-nil, zero value otherwise.

### GetMentorsOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetMentorsOk() (*[]MwGeneralBffInternalSchemasUserPlainResponse, bool)`

GetMentorsOk returns a tuple with the Mentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentors

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetMentors(v []MwGeneralBffInternalSchemasUserPlainResponse)`

SetMentors sets Mentors field to given value.


### GetMetrics

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetMetrics() []MwGeneralBffInternalSchemasMetricTreeNode`

GetMetrics returns the Metrics field if non-nil, zero value otherwise.

### GetMetricsOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetMetricsOk() (*[]MwGeneralBffInternalSchemasMetricTreeNode, bool)`

GetMetricsOk returns a tuple with the Metrics field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMetrics

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetMetrics(v []MwGeneralBffInternalSchemasMetricTreeNode)`

SetMetrics sets Metrics field to given value.


### GetName

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetOwner

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetOwner() MwGeneralBffInternalSchemasUserPlainResponse`

GetOwner returns the Owner field if non-nil, zero value otherwise.

### GetOwnerOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetOwnerOk() (*MwGeneralBffInternalSchemasUserPlainResponse, bool)`

GetOwnerOk returns a tuple with the Owner field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwner

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetOwner(v MwGeneralBffInternalSchemasUserPlainResponse)`

SetOwner sets Owner field to given value.


### GetProjectUuid

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetProjectUuid() string`

GetProjectUuid returns the ProjectUuid field if non-nil, zero value otherwise.

### GetProjectUuidOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetProjectUuidOk() (*string, bool)`

GetProjectUuidOk returns a tuple with the ProjectUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjectUuid

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetProjectUuid(v string)`

SetProjectUuid sets ProjectUuid field to given value.


### SetProjectUuidNil

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetProjectUuidNil(b bool)`

 SetProjectUuidNil sets the value for ProjectUuid to be an explicit nil

### UnsetProjectUuid
`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) UnsetProjectUuid()`

UnsetProjectUuid ensures that no value is present for ProjectUuid, not even an explicit nil
### GetUpdatedAt

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayTags

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetWayTags() []MwGeneralBffInternalSchemasWayTagResponse`

GetWayTags returns the WayTags field if non-nil, zero value otherwise.

### GetWayTagsOk

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) GetWayTagsOk() (*[]MwGeneralBffInternalSchemasWayTagResponse, bool)`

GetWayTagsOk returns a tuple with the WayTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayTags

`func (o *MwGeneralBffInternalSchemasWayPopulatedResponse) SetWayTags(v []MwGeneralBffInternalSchemasWayTagResponse)`

SetWayTags sets WayTags field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


