package util

import "github.com/google/uuid"

func ToNullUuid(someString string) uuid.NullUUID {
	_, err := uuid.Parse(someString)

	var nullUuid uuid.NullUUID
	if err != nil {
		nullUuid.Valid = false
	} else {
		nullUuid.Valid = true
		nullUuid.UUID = uuid.MustParse(someString)
	}

	return nullUuid
}

func MarshalNullUuid(nullUuid uuid.NullUUID) interface{} {
	if nullUuid.Valid {
		return nullUuid.UUID
	} else {
		return nil
	}
}
