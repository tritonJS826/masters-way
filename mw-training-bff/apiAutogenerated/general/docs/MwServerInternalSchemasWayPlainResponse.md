# MwServerInternalSchemasWayPlainResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ChildrenUuids** | **[]string** |  | 
**CopiedFromWayUuid** | **NullableString** |  | 
**CreatedAt** | **string** |  | 
**DayReportsAmount** | **int32** |  | 
**EstimationTime** | **int32** |  | 
**FavoriteForUsers** | **int32** |  | 
**GoalDescription** | **string** |  | 
**IsCompleted** | **bool** |  | 
**IsPrivate** | **bool** |  | 
**Mentors** | [**[]MwServerInternalSchemasUserPlainResponse**](MwServerInternalSchemasUserPlainResponse.md) |  | 
**MetricsDone** | **int32** |  | 
**MetricsTotal** | **int32** |  | 
**Name** | **string** |  | 
**Owner** | [**MwServerInternalSchemasUserPlainResponse**](MwServerInternalSchemasUserPlainResponse.md) |  | 
**ProjectUuid** | **NullableString** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 
**WayTags** | [**[]MwServerInternalSchemasWayTagResponse**](MwServerInternalSchemasWayTagResponse.md) |  | 

## Methods

### NewMwServerInternalSchemasWayPlainResponse

`func NewMwServerInternalSchemasWayPlainResponse(childrenUuids []string, copiedFromWayUuid NullableString, createdAt string, dayReportsAmount int32, estimationTime int32, favoriteForUsers int32, goalDescription string, isCompleted bool, isPrivate bool, mentors []MwServerInternalSchemasUserPlainResponse, metricsDone int32, metricsTotal int32, name string, owner MwServerInternalSchemasUserPlainResponse, projectUuid NullableString, updatedAt string, uuid string, wayTags []MwServerInternalSchemasWayTagResponse, ) *MwServerInternalSchemasWayPlainResponse`

NewMwServerInternalSchemasWayPlainResponse instantiates a new MwServerInternalSchemasWayPlainResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwServerInternalSchemasWayPlainResponseWithDefaults

`func NewMwServerInternalSchemasWayPlainResponseWithDefaults() *MwServerInternalSchemasWayPlainResponse`

NewMwServerInternalSchemasWayPlainResponseWithDefaults instantiates a new MwServerInternalSchemasWayPlainResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChildrenUuids

`func (o *MwServerInternalSchemasWayPlainResponse) GetChildrenUuids() []string`

GetChildrenUuids returns the ChildrenUuids field if non-nil, zero value otherwise.

### GetChildrenUuidsOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetChildrenUuidsOk() (*[]string, bool)`

GetChildrenUuidsOk returns a tuple with the ChildrenUuids field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChildrenUuids

`func (o *MwServerInternalSchemasWayPlainResponse) SetChildrenUuids(v []string)`

SetChildrenUuids sets ChildrenUuids field to given value.


### GetCopiedFromWayUuid

`func (o *MwServerInternalSchemasWayPlainResponse) GetCopiedFromWayUuid() string`

GetCopiedFromWayUuid returns the CopiedFromWayUuid field if non-nil, zero value otherwise.

### GetCopiedFromWayUuidOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetCopiedFromWayUuidOk() (*string, bool)`

GetCopiedFromWayUuidOk returns a tuple with the CopiedFromWayUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCopiedFromWayUuid

`func (o *MwServerInternalSchemasWayPlainResponse) SetCopiedFromWayUuid(v string)`

SetCopiedFromWayUuid sets CopiedFromWayUuid field to given value.


### SetCopiedFromWayUuidNil

`func (o *MwServerInternalSchemasWayPlainResponse) SetCopiedFromWayUuidNil(b bool)`

 SetCopiedFromWayUuidNil sets the value for CopiedFromWayUuid to be an explicit nil

### UnsetCopiedFromWayUuid
`func (o *MwServerInternalSchemasWayPlainResponse) UnsetCopiedFromWayUuid()`

UnsetCopiedFromWayUuid ensures that no value is present for CopiedFromWayUuid, not even an explicit nil
### GetCreatedAt

`func (o *MwServerInternalSchemasWayPlainResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwServerInternalSchemasWayPlainResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetDayReportsAmount

`func (o *MwServerInternalSchemasWayPlainResponse) GetDayReportsAmount() int32`

GetDayReportsAmount returns the DayReportsAmount field if non-nil, zero value otherwise.

### GetDayReportsAmountOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetDayReportsAmountOk() (*int32, bool)`

GetDayReportsAmountOk returns a tuple with the DayReportsAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReportsAmount

`func (o *MwServerInternalSchemasWayPlainResponse) SetDayReportsAmount(v int32)`

SetDayReportsAmount sets DayReportsAmount field to given value.


### GetEstimationTime

`func (o *MwServerInternalSchemasWayPlainResponse) GetEstimationTime() int32`

GetEstimationTime returns the EstimationTime field if non-nil, zero value otherwise.

### GetEstimationTimeOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetEstimationTimeOk() (*int32, bool)`

GetEstimationTimeOk returns a tuple with the EstimationTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEstimationTime

`func (o *MwServerInternalSchemasWayPlainResponse) SetEstimationTime(v int32)`

SetEstimationTime sets EstimationTime field to given value.


### GetFavoriteForUsers

`func (o *MwServerInternalSchemasWayPlainResponse) GetFavoriteForUsers() int32`

GetFavoriteForUsers returns the FavoriteForUsers field if non-nil, zero value otherwise.

### GetFavoriteForUsersOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetFavoriteForUsersOk() (*int32, bool)`

GetFavoriteForUsersOk returns a tuple with the FavoriteForUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsers

`func (o *MwServerInternalSchemasWayPlainResponse) SetFavoriteForUsers(v int32)`

SetFavoriteForUsers sets FavoriteForUsers field to given value.


### GetGoalDescription

`func (o *MwServerInternalSchemasWayPlainResponse) GetGoalDescription() string`

GetGoalDescription returns the GoalDescription field if non-nil, zero value otherwise.

### GetGoalDescriptionOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetGoalDescriptionOk() (*string, bool)`

GetGoalDescriptionOk returns a tuple with the GoalDescription field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGoalDescription

`func (o *MwServerInternalSchemasWayPlainResponse) SetGoalDescription(v string)`

SetGoalDescription sets GoalDescription field to given value.


### GetIsCompleted

`func (o *MwServerInternalSchemasWayPlainResponse) GetIsCompleted() bool`

GetIsCompleted returns the IsCompleted field if non-nil, zero value otherwise.

### GetIsCompletedOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetIsCompletedOk() (*bool, bool)`

GetIsCompletedOk returns a tuple with the IsCompleted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsCompleted

`func (o *MwServerInternalSchemasWayPlainResponse) SetIsCompleted(v bool)`

SetIsCompleted sets IsCompleted field to given value.


### GetIsPrivate

`func (o *MwServerInternalSchemasWayPlainResponse) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *MwServerInternalSchemasWayPlainResponse) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetMentors

`func (o *MwServerInternalSchemasWayPlainResponse) GetMentors() []MwServerInternalSchemasUserPlainResponse`

GetMentors returns the Mentors field if non-nil, zero value otherwise.

### GetMentorsOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetMentorsOk() (*[]MwServerInternalSchemasUserPlainResponse, bool)`

GetMentorsOk returns a tuple with the Mentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentors

`func (o *MwServerInternalSchemasWayPlainResponse) SetMentors(v []MwServerInternalSchemasUserPlainResponse)`

SetMentors sets Mentors field to given value.


### GetMetricsDone

`func (o *MwServerInternalSchemasWayPlainResponse) GetMetricsDone() int32`

GetMetricsDone returns the MetricsDone field if non-nil, zero value otherwise.

### GetMetricsDoneOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetMetricsDoneOk() (*int32, bool)`

GetMetricsDoneOk returns a tuple with the MetricsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMetricsDone

`func (o *MwServerInternalSchemasWayPlainResponse) SetMetricsDone(v int32)`

SetMetricsDone sets MetricsDone field to given value.


### GetMetricsTotal

`func (o *MwServerInternalSchemasWayPlainResponse) GetMetricsTotal() int32`

GetMetricsTotal returns the MetricsTotal field if non-nil, zero value otherwise.

### GetMetricsTotalOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetMetricsTotalOk() (*int32, bool)`

GetMetricsTotalOk returns a tuple with the MetricsTotal field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMetricsTotal

`func (o *MwServerInternalSchemasWayPlainResponse) SetMetricsTotal(v int32)`

SetMetricsTotal sets MetricsTotal field to given value.


### GetName

`func (o *MwServerInternalSchemasWayPlainResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwServerInternalSchemasWayPlainResponse) SetName(v string)`

SetName sets Name field to given value.


### GetOwner

`func (o *MwServerInternalSchemasWayPlainResponse) GetOwner() MwServerInternalSchemasUserPlainResponse`

GetOwner returns the Owner field if non-nil, zero value otherwise.

### GetOwnerOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetOwnerOk() (*MwServerInternalSchemasUserPlainResponse, bool)`

GetOwnerOk returns a tuple with the Owner field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwner

`func (o *MwServerInternalSchemasWayPlainResponse) SetOwner(v MwServerInternalSchemasUserPlainResponse)`

SetOwner sets Owner field to given value.


### GetProjectUuid

`func (o *MwServerInternalSchemasWayPlainResponse) GetProjectUuid() string`

GetProjectUuid returns the ProjectUuid field if non-nil, zero value otherwise.

### GetProjectUuidOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetProjectUuidOk() (*string, bool)`

GetProjectUuidOk returns a tuple with the ProjectUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjectUuid

`func (o *MwServerInternalSchemasWayPlainResponse) SetProjectUuid(v string)`

SetProjectUuid sets ProjectUuid field to given value.


### SetProjectUuidNil

`func (o *MwServerInternalSchemasWayPlainResponse) SetProjectUuidNil(b bool)`

 SetProjectUuidNil sets the value for ProjectUuid to be an explicit nil

### UnsetProjectUuid
`func (o *MwServerInternalSchemasWayPlainResponse) UnsetProjectUuid()`

UnsetProjectUuid ensures that no value is present for ProjectUuid, not even an explicit nil
### GetUpdatedAt

`func (o *MwServerInternalSchemasWayPlainResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwServerInternalSchemasWayPlainResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwServerInternalSchemasWayPlainResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwServerInternalSchemasWayPlainResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayTags

`func (o *MwServerInternalSchemasWayPlainResponse) GetWayTags() []MwServerInternalSchemasWayTagResponse`

GetWayTags returns the WayTags field if non-nil, zero value otherwise.

### GetWayTagsOk

`func (o *MwServerInternalSchemasWayPlainResponse) GetWayTagsOk() (*[]MwServerInternalSchemasWayTagResponse, bool)`

GetWayTagsOk returns a tuple with the WayTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayTags

`func (o *MwServerInternalSchemasWayPlainResponse) SetWayTags(v []MwServerInternalSchemasWayTagResponse)`

SetWayTags sets WayTags field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


