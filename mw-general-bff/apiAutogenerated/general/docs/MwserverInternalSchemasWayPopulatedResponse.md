# MwserverInternalSchemasWayPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Children** | [**[]MwserverInternalSchemasWayPopulatedResponse**](MwserverInternalSchemasWayPopulatedResponse.md) |  | 
**CopiedFromWayUuid** | **NullableString** |  | 
**CreatedAt** | **string** |  | 
**EstimationTime** | **int32** |  | 
**FavoriteForUsersAmount** | **int32** |  | 
**FormerMentors** | [**[]MwserverInternalSchemasUserPlainResponse**](MwserverInternalSchemasUserPlainResponse.md) |  | 
**GoalDescription** | **string** |  | 
**IsCompleted** | **bool** |  | 
**IsPrivate** | **bool** |  | 
**JobTags** | [**[]MwserverInternalSchemasJobTagResponse**](MwserverInternalSchemasJobTagResponse.md) |  | 
**MentorRequests** | [**[]MwserverInternalSchemasUserPlainResponse**](MwserverInternalSchemasUserPlainResponse.md) |  | 
**Mentors** | [**[]MwserverInternalSchemasUserPlainResponse**](MwserverInternalSchemasUserPlainResponse.md) |  | 
**Metrics** | [**[]MwserverInternalSchemasMetricResponse**](MwserverInternalSchemasMetricResponse.md) |  | 
**Name** | **string** |  | 
**Owner** | [**MwserverInternalSchemasUserPlainResponse**](MwserverInternalSchemasUserPlainResponse.md) |  | 
**ProjectUuid** | **NullableString** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 
**WayTags** | [**[]MwserverInternalSchemasWayTagResponse**](MwserverInternalSchemasWayTagResponse.md) |  | 

## Methods

### NewMwserverInternalSchemasWayPopulatedResponse

`func NewMwserverInternalSchemasWayPopulatedResponse(children []MwserverInternalSchemasWayPopulatedResponse, copiedFromWayUuid NullableString, createdAt string, estimationTime int32, favoriteForUsersAmount int32, formerMentors []MwserverInternalSchemasUserPlainResponse, goalDescription string, isCompleted bool, isPrivate bool, jobTags []MwserverInternalSchemasJobTagResponse, mentorRequests []MwserverInternalSchemasUserPlainResponse, mentors []MwserverInternalSchemasUserPlainResponse, metrics []MwserverInternalSchemasMetricResponse, name string, owner MwserverInternalSchemasUserPlainResponse, projectUuid NullableString, updatedAt string, uuid string, wayTags []MwserverInternalSchemasWayTagResponse, ) *MwserverInternalSchemasWayPopulatedResponse`

NewMwserverInternalSchemasWayPopulatedResponse instantiates a new MwserverInternalSchemasWayPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwserverInternalSchemasWayPopulatedResponseWithDefaults

`func NewMwserverInternalSchemasWayPopulatedResponseWithDefaults() *MwserverInternalSchemasWayPopulatedResponse`

NewMwserverInternalSchemasWayPopulatedResponseWithDefaults instantiates a new MwserverInternalSchemasWayPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChildren

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetChildren() []MwserverInternalSchemasWayPopulatedResponse`

GetChildren returns the Children field if non-nil, zero value otherwise.

### GetChildrenOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetChildrenOk() (*[]MwserverInternalSchemasWayPopulatedResponse, bool)`

GetChildrenOk returns a tuple with the Children field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChildren

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetChildren(v []MwserverInternalSchemasWayPopulatedResponse)`

SetChildren sets Children field to given value.


### GetCopiedFromWayUuid

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetCopiedFromWayUuid() string`

GetCopiedFromWayUuid returns the CopiedFromWayUuid field if non-nil, zero value otherwise.

### GetCopiedFromWayUuidOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetCopiedFromWayUuidOk() (*string, bool)`

GetCopiedFromWayUuidOk returns a tuple with the CopiedFromWayUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCopiedFromWayUuid

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetCopiedFromWayUuid(v string)`

SetCopiedFromWayUuid sets CopiedFromWayUuid field to given value.


### SetCopiedFromWayUuidNil

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetCopiedFromWayUuidNil(b bool)`

 SetCopiedFromWayUuidNil sets the value for CopiedFromWayUuid to be an explicit nil

### UnsetCopiedFromWayUuid
`func (o *MwserverInternalSchemasWayPopulatedResponse) UnsetCopiedFromWayUuid()`

UnsetCopiedFromWayUuid ensures that no value is present for CopiedFromWayUuid, not even an explicit nil
### GetCreatedAt

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetEstimationTime

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetEstimationTime() int32`

GetEstimationTime returns the EstimationTime field if non-nil, zero value otherwise.

### GetEstimationTimeOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetEstimationTimeOk() (*int32, bool)`

GetEstimationTimeOk returns a tuple with the EstimationTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEstimationTime

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetEstimationTime(v int32)`

SetEstimationTime sets EstimationTime field to given value.


### GetFavoriteForUsersAmount

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetFavoriteForUsersAmount() int32`

GetFavoriteForUsersAmount returns the FavoriteForUsersAmount field if non-nil, zero value otherwise.

### GetFavoriteForUsersAmountOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetFavoriteForUsersAmountOk() (*int32, bool)`

GetFavoriteForUsersAmountOk returns a tuple with the FavoriteForUsersAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsersAmount

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetFavoriteForUsersAmount(v int32)`

SetFavoriteForUsersAmount sets FavoriteForUsersAmount field to given value.


### GetFormerMentors

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetFormerMentors() []MwserverInternalSchemasUserPlainResponse`

GetFormerMentors returns the FormerMentors field if non-nil, zero value otherwise.

### GetFormerMentorsOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetFormerMentorsOk() (*[]MwserverInternalSchemasUserPlainResponse, bool)`

GetFormerMentorsOk returns a tuple with the FormerMentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormerMentors

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetFormerMentors(v []MwserverInternalSchemasUserPlainResponse)`

SetFormerMentors sets FormerMentors field to given value.


### GetGoalDescription

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetGoalDescription() string`

GetGoalDescription returns the GoalDescription field if non-nil, zero value otherwise.

### GetGoalDescriptionOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetGoalDescriptionOk() (*string, bool)`

GetGoalDescriptionOk returns a tuple with the GoalDescription field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGoalDescription

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetGoalDescription(v string)`

SetGoalDescription sets GoalDescription field to given value.


### GetIsCompleted

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetIsCompleted() bool`

GetIsCompleted returns the IsCompleted field if non-nil, zero value otherwise.

### GetIsCompletedOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetIsCompletedOk() (*bool, bool)`

GetIsCompletedOk returns a tuple with the IsCompleted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsCompleted

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetIsCompleted(v bool)`

SetIsCompleted sets IsCompleted field to given value.


### GetIsPrivate

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetJobTags

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetJobTags() []MwserverInternalSchemasJobTagResponse`

GetJobTags returns the JobTags field if non-nil, zero value otherwise.

### GetJobTagsOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetJobTagsOk() (*[]MwserverInternalSchemasJobTagResponse, bool)`

GetJobTagsOk returns a tuple with the JobTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJobTags

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetJobTags(v []MwserverInternalSchemasJobTagResponse)`

SetJobTags sets JobTags field to given value.


### GetMentorRequests

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetMentorRequests() []MwserverInternalSchemasUserPlainResponse`

GetMentorRequests returns the MentorRequests field if non-nil, zero value otherwise.

### GetMentorRequestsOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetMentorRequestsOk() (*[]MwserverInternalSchemasUserPlainResponse, bool)`

GetMentorRequestsOk returns a tuple with the MentorRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentorRequests

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetMentorRequests(v []MwserverInternalSchemasUserPlainResponse)`

SetMentorRequests sets MentorRequests field to given value.


### GetMentors

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetMentors() []MwserverInternalSchemasUserPlainResponse`

GetMentors returns the Mentors field if non-nil, zero value otherwise.

### GetMentorsOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetMentorsOk() (*[]MwserverInternalSchemasUserPlainResponse, bool)`

GetMentorsOk returns a tuple with the Mentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentors

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetMentors(v []MwserverInternalSchemasUserPlainResponse)`

SetMentors sets Mentors field to given value.


### GetMetrics

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetMetrics() []MwserverInternalSchemasMetricResponse`

GetMetrics returns the Metrics field if non-nil, zero value otherwise.

### GetMetricsOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetMetricsOk() (*[]MwserverInternalSchemasMetricResponse, bool)`

GetMetricsOk returns a tuple with the Metrics field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMetrics

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetMetrics(v []MwserverInternalSchemasMetricResponse)`

SetMetrics sets Metrics field to given value.


### GetName

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetOwner

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetOwner() MwserverInternalSchemasUserPlainResponse`

GetOwner returns the Owner field if non-nil, zero value otherwise.

### GetOwnerOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetOwnerOk() (*MwserverInternalSchemasUserPlainResponse, bool)`

GetOwnerOk returns a tuple with the Owner field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwner

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetOwner(v MwserverInternalSchemasUserPlainResponse)`

SetOwner sets Owner field to given value.


### GetProjectUuid

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetProjectUuid() string`

GetProjectUuid returns the ProjectUuid field if non-nil, zero value otherwise.

### GetProjectUuidOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetProjectUuidOk() (*string, bool)`

GetProjectUuidOk returns a tuple with the ProjectUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjectUuid

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetProjectUuid(v string)`

SetProjectUuid sets ProjectUuid field to given value.


### SetProjectUuidNil

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetProjectUuidNil(b bool)`

 SetProjectUuidNil sets the value for ProjectUuid to be an explicit nil

### UnsetProjectUuid
`func (o *MwserverInternalSchemasWayPopulatedResponse) UnsetProjectUuid()`

UnsetProjectUuid ensures that no value is present for ProjectUuid, not even an explicit nil
### GetUpdatedAt

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayTags

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetWayTags() []MwserverInternalSchemasWayTagResponse`

GetWayTags returns the WayTags field if non-nil, zero value otherwise.

### GetWayTagsOk

`func (o *MwserverInternalSchemasWayPopulatedResponse) GetWayTagsOk() (*[]MwserverInternalSchemasWayTagResponse, bool)`

GetWayTagsOk returns a tuple with the WayTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayTags

`func (o *MwserverInternalSchemasWayPopulatedResponse) SetWayTags(v []MwserverInternalSchemasWayTagResponse)`

SetWayTags sets WayTags field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


