# MwTrainingBffInternalSchemasQuestion

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Answer** | **string** |  | 
**CreatedAt** | **string** |  | 
**IsActive** | **bool** |  | 
**Name** | Pointer to **string** |  | [optional] 
**Order** | **int32** |  | 
**QuestionText** | **string** |  | 
**TestUuid** | **string** |  | 
**TimeToAnswer** | **int32** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 

## Methods

### NewMwTrainingBffInternalSchemasQuestion

`func NewMwTrainingBffInternalSchemasQuestion(answer string, createdAt string, isActive bool, order int32, questionText string, testUuid string, timeToAnswer int32, updatedAt string, uuid string, ) *MwTrainingBffInternalSchemasQuestion`

NewMwTrainingBffInternalSchemasQuestion instantiates a new MwTrainingBffInternalSchemasQuestion object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwTrainingBffInternalSchemasQuestionWithDefaults

`func NewMwTrainingBffInternalSchemasQuestionWithDefaults() *MwTrainingBffInternalSchemasQuestion`

NewMwTrainingBffInternalSchemasQuestionWithDefaults instantiates a new MwTrainingBffInternalSchemasQuestion object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAnswer

`func (o *MwTrainingBffInternalSchemasQuestion) GetAnswer() string`

GetAnswer returns the Answer field if non-nil, zero value otherwise.

### GetAnswerOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetAnswerOk() (*string, bool)`

GetAnswerOk returns a tuple with the Answer field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAnswer

`func (o *MwTrainingBffInternalSchemasQuestion) SetAnswer(v string)`

SetAnswer sets Answer field to given value.


### GetCreatedAt

`func (o *MwTrainingBffInternalSchemasQuestion) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwTrainingBffInternalSchemasQuestion) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetIsActive

`func (o *MwTrainingBffInternalSchemasQuestion) GetIsActive() bool`

GetIsActive returns the IsActive field if non-nil, zero value otherwise.

### GetIsActiveOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetIsActiveOk() (*bool, bool)`

GetIsActiveOk returns a tuple with the IsActive field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsActive

`func (o *MwTrainingBffInternalSchemasQuestion) SetIsActive(v bool)`

SetIsActive sets IsActive field to given value.


### GetName

`func (o *MwTrainingBffInternalSchemasQuestion) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwTrainingBffInternalSchemasQuestion) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *MwTrainingBffInternalSchemasQuestion) HasName() bool`

HasName returns a boolean if a field has been set.

### GetOrder

`func (o *MwTrainingBffInternalSchemasQuestion) GetOrder() int32`

GetOrder returns the Order field if non-nil, zero value otherwise.

### GetOrderOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetOrderOk() (*int32, bool)`

GetOrderOk returns a tuple with the Order field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOrder

`func (o *MwTrainingBffInternalSchemasQuestion) SetOrder(v int32)`

SetOrder sets Order field to given value.


### GetQuestionText

`func (o *MwTrainingBffInternalSchemasQuestion) GetQuestionText() string`

GetQuestionText returns the QuestionText field if non-nil, zero value otherwise.

### GetQuestionTextOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetQuestionTextOk() (*string, bool)`

GetQuestionTextOk returns a tuple with the QuestionText field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetQuestionText

`func (o *MwTrainingBffInternalSchemasQuestion) SetQuestionText(v string)`

SetQuestionText sets QuestionText field to given value.


### GetTestUuid

`func (o *MwTrainingBffInternalSchemasQuestion) GetTestUuid() string`

GetTestUuid returns the TestUuid field if non-nil, zero value otherwise.

### GetTestUuidOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetTestUuidOk() (*string, bool)`

GetTestUuidOk returns a tuple with the TestUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTestUuid

`func (o *MwTrainingBffInternalSchemasQuestion) SetTestUuid(v string)`

SetTestUuid sets TestUuid field to given value.


### GetTimeToAnswer

`func (o *MwTrainingBffInternalSchemasQuestion) GetTimeToAnswer() int32`

GetTimeToAnswer returns the TimeToAnswer field if non-nil, zero value otherwise.

### GetTimeToAnswerOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetTimeToAnswerOk() (*int32, bool)`

GetTimeToAnswerOk returns a tuple with the TimeToAnswer field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimeToAnswer

`func (o *MwTrainingBffInternalSchemasQuestion) SetTimeToAnswer(v int32)`

SetTimeToAnswer sets TimeToAnswer field to given value.


### GetUpdatedAt

`func (o *MwTrainingBffInternalSchemasQuestion) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwTrainingBffInternalSchemasQuestion) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwTrainingBffInternalSchemasQuestion) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwTrainingBffInternalSchemasQuestion) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwTrainingBffInternalSchemasQuestion) SetUuid(v string)`

SetUuid sets Uuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


