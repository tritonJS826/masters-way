# MwserverInternalSchemasCreateWayPayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CopiedFromWayId** | **NullableString** |  | 
**EstimationTime** | **int32** |  | 
**GoalDescription** | **string** |  | 
**IsCompleted** | **bool** |  | 
**IsPrivate** | **bool** |  | 
**Name** | **string** |  | 
**OwnerId** | **string** |  | 
**ProjectId** | **NullableString** |  | 

## Methods

### NewMwserverInternalSchemasCreateWayPayload

`func NewMwserverInternalSchemasCreateWayPayload(copiedFromWayId NullableString, estimationTime int32, goalDescription string, isCompleted bool, isPrivate bool, name string, ownerId string, projectId NullableString, ) *MwserverInternalSchemasCreateWayPayload`

NewMwserverInternalSchemasCreateWayPayload instantiates a new MwserverInternalSchemasCreateWayPayload object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwserverInternalSchemasCreateWayPayloadWithDefaults

`func NewMwserverInternalSchemasCreateWayPayloadWithDefaults() *MwserverInternalSchemasCreateWayPayload`

NewMwserverInternalSchemasCreateWayPayloadWithDefaults instantiates a new MwserverInternalSchemasCreateWayPayload object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCopiedFromWayId

`func (o *MwserverInternalSchemasCreateWayPayload) GetCopiedFromWayId() string`

GetCopiedFromWayId returns the CopiedFromWayId field if non-nil, zero value otherwise.

### GetCopiedFromWayIdOk

`func (o *MwserverInternalSchemasCreateWayPayload) GetCopiedFromWayIdOk() (*string, bool)`

GetCopiedFromWayIdOk returns a tuple with the CopiedFromWayId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCopiedFromWayId

`func (o *MwserverInternalSchemasCreateWayPayload) SetCopiedFromWayId(v string)`

SetCopiedFromWayId sets CopiedFromWayId field to given value.


### SetCopiedFromWayIdNil

`func (o *MwserverInternalSchemasCreateWayPayload) SetCopiedFromWayIdNil(b bool)`

 SetCopiedFromWayIdNil sets the value for CopiedFromWayId to be an explicit nil

### UnsetCopiedFromWayId
`func (o *MwserverInternalSchemasCreateWayPayload) UnsetCopiedFromWayId()`

UnsetCopiedFromWayId ensures that no value is present for CopiedFromWayId, not even an explicit nil
### GetEstimationTime

`func (o *MwserverInternalSchemasCreateWayPayload) GetEstimationTime() int32`

GetEstimationTime returns the EstimationTime field if non-nil, zero value otherwise.

### GetEstimationTimeOk

`func (o *MwserverInternalSchemasCreateWayPayload) GetEstimationTimeOk() (*int32, bool)`

GetEstimationTimeOk returns a tuple with the EstimationTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEstimationTime

`func (o *MwserverInternalSchemasCreateWayPayload) SetEstimationTime(v int32)`

SetEstimationTime sets EstimationTime field to given value.


### GetGoalDescription

`func (o *MwserverInternalSchemasCreateWayPayload) GetGoalDescription() string`

GetGoalDescription returns the GoalDescription field if non-nil, zero value otherwise.

### GetGoalDescriptionOk

`func (o *MwserverInternalSchemasCreateWayPayload) GetGoalDescriptionOk() (*string, bool)`

GetGoalDescriptionOk returns a tuple with the GoalDescription field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGoalDescription

`func (o *MwserverInternalSchemasCreateWayPayload) SetGoalDescription(v string)`

SetGoalDescription sets GoalDescription field to given value.


### GetIsCompleted

`func (o *MwserverInternalSchemasCreateWayPayload) GetIsCompleted() bool`

GetIsCompleted returns the IsCompleted field if non-nil, zero value otherwise.

### GetIsCompletedOk

`func (o *MwserverInternalSchemasCreateWayPayload) GetIsCompletedOk() (*bool, bool)`

GetIsCompletedOk returns a tuple with the IsCompleted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsCompleted

`func (o *MwserverInternalSchemasCreateWayPayload) SetIsCompleted(v bool)`

SetIsCompleted sets IsCompleted field to given value.


### GetIsPrivate

`func (o *MwserverInternalSchemasCreateWayPayload) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *MwserverInternalSchemasCreateWayPayload) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *MwserverInternalSchemasCreateWayPayload) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetName

`func (o *MwserverInternalSchemasCreateWayPayload) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwserverInternalSchemasCreateWayPayload) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwserverInternalSchemasCreateWayPayload) SetName(v string)`

SetName sets Name field to given value.


### GetOwnerId

`func (o *MwserverInternalSchemasCreateWayPayload) GetOwnerId() string`

GetOwnerId returns the OwnerId field if non-nil, zero value otherwise.

### GetOwnerIdOk

`func (o *MwserverInternalSchemasCreateWayPayload) GetOwnerIdOk() (*string, bool)`

GetOwnerIdOk returns a tuple with the OwnerId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerId

`func (o *MwserverInternalSchemasCreateWayPayload) SetOwnerId(v string)`

SetOwnerId sets OwnerId field to given value.


### GetProjectId

`func (o *MwserverInternalSchemasCreateWayPayload) GetProjectId() string`

GetProjectId returns the ProjectId field if non-nil, zero value otherwise.

### GetProjectIdOk

`func (o *MwserverInternalSchemasCreateWayPayload) GetProjectIdOk() (*string, bool)`

GetProjectIdOk returns a tuple with the ProjectId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjectId

`func (o *MwserverInternalSchemasCreateWayPayload) SetProjectId(v string)`

SetProjectId sets ProjectId field to given value.


### SetProjectIdNil

`func (o *MwserverInternalSchemasCreateWayPayload) SetProjectIdNil(b bool)`

 SetProjectIdNil sets the value for ProjectId to be an explicit nil

### UnsetProjectId
`func (o *MwserverInternalSchemasCreateWayPayload) UnsetProjectId()`

UnsetProjectId ensures that no value is present for ProjectId, not even an explicit nil

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


