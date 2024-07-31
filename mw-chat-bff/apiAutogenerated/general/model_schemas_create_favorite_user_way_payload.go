/*
Masters way general API

No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

API version: 1.0
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"encoding/json"
	"bytes"
	"fmt"
)

// checks if the SchemasCreateFavoriteUserWayPayload type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &SchemasCreateFavoriteUserWayPayload{}

// SchemasCreateFavoriteUserWayPayload struct for SchemasCreateFavoriteUserWayPayload
type SchemasCreateFavoriteUserWayPayload struct {
	UserUuid string `json:"userUuid"`
	WayUuid string `json:"wayUuid"`
}

type _SchemasCreateFavoriteUserWayPayload SchemasCreateFavoriteUserWayPayload

// NewSchemasCreateFavoriteUserWayPayload instantiates a new SchemasCreateFavoriteUserWayPayload object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewSchemasCreateFavoriteUserWayPayload(userUuid string, wayUuid string) *SchemasCreateFavoriteUserWayPayload {
	this := SchemasCreateFavoriteUserWayPayload{}
	this.UserUuid = userUuid
	this.WayUuid = wayUuid
	return &this
}

// NewSchemasCreateFavoriteUserWayPayloadWithDefaults instantiates a new SchemasCreateFavoriteUserWayPayload object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewSchemasCreateFavoriteUserWayPayloadWithDefaults() *SchemasCreateFavoriteUserWayPayload {
	this := SchemasCreateFavoriteUserWayPayload{}
	return &this
}

// GetUserUuid returns the UserUuid field value
func (o *SchemasCreateFavoriteUserWayPayload) GetUserUuid() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.UserUuid
}

// GetUserUuidOk returns a tuple with the UserUuid field value
// and a boolean to check if the value has been set.
func (o *SchemasCreateFavoriteUserWayPayload) GetUserUuidOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.UserUuid, true
}

// SetUserUuid sets field value
func (o *SchemasCreateFavoriteUserWayPayload) SetUserUuid(v string) {
	o.UserUuid = v
}

// GetWayUuid returns the WayUuid field value
func (o *SchemasCreateFavoriteUserWayPayload) GetWayUuid() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.WayUuid
}

// GetWayUuidOk returns a tuple with the WayUuid field value
// and a boolean to check if the value has been set.
func (o *SchemasCreateFavoriteUserWayPayload) GetWayUuidOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.WayUuid, true
}

// SetWayUuid sets field value
func (o *SchemasCreateFavoriteUserWayPayload) SetWayUuid(v string) {
	o.WayUuid = v
}

func (o SchemasCreateFavoriteUserWayPayload) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o SchemasCreateFavoriteUserWayPayload) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["userUuid"] = o.UserUuid
	toSerialize["wayUuid"] = o.WayUuid
	return toSerialize, nil
}

func (o *SchemasCreateFavoriteUserWayPayload) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"userUuid",
		"wayUuid",
	}

	allProperties := make(map[string]interface{})

	err = json.Unmarshal(data, &allProperties)

	if err != nil {
		return err;
	}

	for _, requiredProperty := range(requiredProperties) {
		if _, exists := allProperties[requiredProperty]; !exists {
			return fmt.Errorf("no value given for required property %v", requiredProperty)
		}
	}

	varSchemasCreateFavoriteUserWayPayload := _SchemasCreateFavoriteUserWayPayload{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varSchemasCreateFavoriteUserWayPayload)

	if err != nil {
		return err
	}

	*o = SchemasCreateFavoriteUserWayPayload(varSchemasCreateFavoriteUserWayPayload)

	return err
}

type NullableSchemasCreateFavoriteUserWayPayload struct {
	value *SchemasCreateFavoriteUserWayPayload
	isSet bool
}

func (v NullableSchemasCreateFavoriteUserWayPayload) Get() *SchemasCreateFavoriteUserWayPayload {
	return v.value
}

func (v *NullableSchemasCreateFavoriteUserWayPayload) Set(val *SchemasCreateFavoriteUserWayPayload) {
	v.value = val
	v.isSet = true
}

func (v NullableSchemasCreateFavoriteUserWayPayload) IsSet() bool {
	return v.isSet
}

func (v *NullableSchemasCreateFavoriteUserWayPayload) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableSchemasCreateFavoriteUserWayPayload(val *SchemasCreateFavoriteUserWayPayload) *NullableSchemasCreateFavoriteUserWayPayload {
	return &NullableSchemasCreateFavoriteUserWayPayload{value: val, isSet: true}
}

func (v NullableSchemasCreateFavoriteUserWayPayload) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableSchemasCreateFavoriteUserWayPayload) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


