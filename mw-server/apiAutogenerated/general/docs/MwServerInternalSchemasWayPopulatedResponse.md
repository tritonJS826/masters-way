# MwServerInternalSchemasWayPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Children** | [**[]MwServerInternalSchemasWayPopulatedResponse**](MwServerInternalSchemasWayPopulatedResponse.md) |  | 
**CopiedFromWayUuid** | **NullableString** |  | 
**CreatedAt** | **string** |  | 
**EstimationTime** | **int32** |  | 
**FavoriteForUsersAmount** | **int32** |  | 
**FormerMentors** | [**[]MwServerInternalSchemasUserPlainResponse**](MwServerInternalSchemasUserPlainResponse.md) |  | 
**GoalDescription** | **string** |  | 
**IsCompleted** | **bool** |  | 
**IsPrivate** | **bool** |  | 
**JobTags** | [**[]MwServerInternalSchemasJobTagResponse**](MwServerInternalSchemasJobTagResponse.md) |  | 
**MentorRequests** | [**[]MwServerInternalSchemasUserPlainResponse**](MwServerInternalSchemasUserPlainResponse.md) |  | 
**Mentors** | [**[]MwServerInternalSchemasUserPlainResponse**](MwServerInternalSchemasUserPlainResponse.md) |  | 
**Metrics** | [**[]MwServerInternalSchemasMetricResponse**](MwServerInternalSchemasMetricResponse.md) |  | 
**Name** | **string** |  | 
**Owner** | [**MwServerInternalSchemasUserPlainResponse**](MwServerInternalSchemasUserPlainResponse.md) |  | 
**ProjectUuid** | **NullableString** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 
**WayTags** | [**[]MwServerInternalSchemasWayTagResponse**](MwServerInternalSchemasWayTagResponse.md) |  | 

## Methods

### NewMwServerInternalSchemasWayPopulatedResponse

`func NewMwServerInternalSchemasWayPopulatedResponse(children []MwServerInternalSchemasWayPopulatedResponse, copiedFromWayUuid NullableString, createdAt string, estimationTime int32, favoriteForUsersAmount int32, formerMentors []MwServerInternalSchemasUserPlainResponse, goalDescription string, isCompleted bool, isPrivate bool, jobTags []MwServerInternalSchemasJobTagResponse, mentorRequests []MwServerInternalSchemasUserPlainResponse, mentors []MwServerInternalSchemasUserPlainResponse, metrics []MwServerInternalSchemasMetricResponse, name string, owner MwServerInternalSchemasUserPlainResponse, projectUuid NullableString, updatedAt string, uuid string, wayTags []MwServerInternalSchemasWayTagResponse, ) *MwServerInternalSchemasWayPopulatedResponse`

NewMwServerInternalSchemasWayPopulatedResponse instantiates a new MwServerInternalSchemasWayPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwServerInternalSchemasWayPopulatedResponseWithDefaults

`func NewMwServerInternalSchemasWayPopulatedResponseWithDefaults() *MwServerInternalSchemasWayPopulatedResponse`

NewMwServerInternalSchemasWayPopulatedResponseWithDefaults instantiates a new MwServerInternalSchemasWayPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChildren

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetChildren() []MwServerInternalSchemasWayPopulatedResponse`

GetChildren returns the Children field if non-nil, zero value otherwise.

### GetChildrenOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetChildrenOk() (*[]MwServerInternalSchemasWayPopulatedResponse, bool)`

GetChildrenOk returns a tuple with the Children field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChildren

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetChildren(v []MwServerInternalSchemasWayPopulatedResponse)`

SetChildren sets Children field to given value.


### GetCopiedFromWayUuid

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetCopiedFromWayUuid() string`

GetCopiedFromWayUuid returns the CopiedFromWayUuid field if non-nil, zero value otherwise.

### GetCopiedFromWayUuidOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetCopiedFromWayUuidOk() (*string, bool)`

GetCopiedFromWayUuidOk returns a tuple with the CopiedFromWayUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCopiedFromWayUuid

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetCopiedFromWayUuid(v string)`

SetCopiedFromWayUuid sets CopiedFromWayUuid field to given value.


### SetCopiedFromWayUuidNil

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetCopiedFromWayUuidNil(b bool)`

 SetCopiedFromWayUuidNil sets the value for CopiedFromWayUuid to be an explicit nil

### UnsetCopiedFromWayUuid
`func (o *MwServerInternalSchemasWayPopulatedResponse) UnsetCopiedFromWayUuid()`

UnsetCopiedFromWayUuid ensures that no value is present for CopiedFromWayUuid, not even an explicit nil
### GetCreatedAt

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetEstimationTime

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetEstimationTime() int32`

GetEstimationTime returns the EstimationTime field if non-nil, zero value otherwise.

### GetEstimationTimeOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetEstimationTimeOk() (*int32, bool)`

GetEstimationTimeOk returns a tuple with the EstimationTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEstimationTime

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetEstimationTime(v int32)`

SetEstimationTime sets EstimationTime field to given value.


### GetFavoriteForUsersAmount

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetFavoriteForUsersAmount() int32`

GetFavoriteForUsersAmount returns the FavoriteForUsersAmount field if non-nil, zero value otherwise.

### GetFavoriteForUsersAmountOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetFavoriteForUsersAmountOk() (*int32, bool)`

GetFavoriteForUsersAmountOk returns a tuple with the FavoriteForUsersAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsersAmount

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetFavoriteForUsersAmount(v int32)`

SetFavoriteForUsersAmount sets FavoriteForUsersAmount field to given value.


### GetFormerMentors

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetFormerMentors() []MwServerInternalSchemasUserPlainResponse`

GetFormerMentors returns the FormerMentors field if non-nil, zero value otherwise.

### GetFormerMentorsOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetFormerMentorsOk() (*[]MwServerInternalSchemasUserPlainResponse, bool)`

GetFormerMentorsOk returns a tuple with the FormerMentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormerMentors

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetFormerMentors(v []MwServerInternalSchemasUserPlainResponse)`

SetFormerMentors sets FormerMentors field to given value.


### GetGoalDescription

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetGoalDescription() string`

GetGoalDescription returns the GoalDescription field if non-nil, zero value otherwise.

### GetGoalDescriptionOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetGoalDescriptionOk() (*string, bool)`

GetGoalDescriptionOk returns a tuple with the GoalDescription field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGoalDescription

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetGoalDescription(v string)`

SetGoalDescription sets GoalDescription field to given value.


### GetIsCompleted

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetIsCompleted() bool`

GetIsCompleted returns the IsCompleted field if non-nil, zero value otherwise.

### GetIsCompletedOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetIsCompletedOk() (*bool, bool)`

GetIsCompletedOk returns a tuple with the IsCompleted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsCompleted

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetIsCompleted(v bool)`

SetIsCompleted sets IsCompleted field to given value.


### GetIsPrivate

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetJobTags

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetJobTags() []MwServerInternalSchemasJobTagResponse`

GetJobTags returns the JobTags field if non-nil, zero value otherwise.

### GetJobTagsOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetJobTagsOk() (*[]MwServerInternalSchemasJobTagResponse, bool)`

GetJobTagsOk returns a tuple with the JobTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJobTags

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetJobTags(v []MwServerInternalSchemasJobTagResponse)`

SetJobTags sets JobTags field to given value.


### GetMentorRequests

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetMentorRequests() []MwServerInternalSchemasUserPlainResponse`

GetMentorRequests returns the MentorRequests field if non-nil, zero value otherwise.

### GetMentorRequestsOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetMentorRequestsOk() (*[]MwServerInternalSchemasUserPlainResponse, bool)`

GetMentorRequestsOk returns a tuple with the MentorRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentorRequests

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetMentorRequests(v []MwServerInternalSchemasUserPlainResponse)`

SetMentorRequests sets MentorRequests field to given value.


### GetMentors

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetMentors() []MwServerInternalSchemasUserPlainResponse`

GetMentors returns the Mentors field if non-nil, zero value otherwise.

### GetMentorsOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetMentorsOk() (*[]MwServerInternalSchemasUserPlainResponse, bool)`

GetMentorsOk returns a tuple with the Mentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentors

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetMentors(v []MwServerInternalSchemasUserPlainResponse)`

SetMentors sets Mentors field to given value.


### GetMetrics

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetMetrics() []MwServerInternalSchemasMetricResponse`

GetMetrics returns the Metrics field if non-nil, zero value otherwise.

### GetMetricsOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetMetricsOk() (*[]MwServerInternalSchemasMetricResponse, bool)`

GetMetricsOk returns a tuple with the Metrics field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMetrics

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetMetrics(v []MwServerInternalSchemasMetricResponse)`

SetMetrics sets Metrics field to given value.


### GetName

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetOwner

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetOwner() MwServerInternalSchemasUserPlainResponse`

GetOwner returns the Owner field if non-nil, zero value otherwise.

### GetOwnerOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetOwnerOk() (*MwServerInternalSchemasUserPlainResponse, bool)`

GetOwnerOk returns a tuple with the Owner field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwner

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetOwner(v MwServerInternalSchemasUserPlainResponse)`

SetOwner sets Owner field to given value.


### GetProjectUuid

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetProjectUuid() string`

GetProjectUuid returns the ProjectUuid field if non-nil, zero value otherwise.

### GetProjectUuidOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetProjectUuidOk() (*string, bool)`

GetProjectUuidOk returns a tuple with the ProjectUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjectUuid

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetProjectUuid(v string)`

SetProjectUuid sets ProjectUuid field to given value.


### SetProjectUuidNil

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetProjectUuidNil(b bool)`

 SetProjectUuidNil sets the value for ProjectUuid to be an explicit nil

### UnsetProjectUuid
`func (o *MwServerInternalSchemasWayPopulatedResponse) UnsetProjectUuid()`

UnsetProjectUuid ensures that no value is present for ProjectUuid, not even an explicit nil
### GetUpdatedAt

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayTags

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetWayTags() []MwServerInternalSchemasWayTagResponse`

GetWayTags returns the WayTags field if non-nil, zero value otherwise.

### GetWayTagsOk

`func (o *MwServerInternalSchemasWayPopulatedResponse) GetWayTagsOk() (*[]MwServerInternalSchemasWayTagResponse, bool)`

GetWayTagsOk returns a tuple with the WayTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayTags

`func (o *MwServerInternalSchemasWayPopulatedResponse) SetWayTags(v []MwServerInternalSchemasWayTagResponse)`

SetWayTags sets WayTags field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


