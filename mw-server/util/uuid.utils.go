package util

import (
	"database/sql"

	"github.com/google/uuid"
)

func ToNullUuid(someString string) uuid.NullUUID {
	parsedUuid, err := uuid.Parse(someString)

	nullUuid := uuid.NullUUID{
		UUID:  parsedUuid,
		Valid: false,
	}
	if err == nil {
		nullUuid.Valid = true
	}

	return nullUuid
}

func MarshalNullUuid(nullUuid uuid.NullUUID) *string {
	if nullUuid.Valid {
		str := nullUuid.UUID.String()
		return &str
	} else {
		return nil
	}
}

func MarshalNullString(nullString sql.NullString) *string {
	if nullString.Valid {
		str := nullString.String
		return &str
	} else {
		return nil
	}
}

func MarshalNullTime(nullTime sql.NullTime) *string {
	if nullTime.Valid {
		str := nullTime.Time.String()
		return &str
	} else {
		return nil
	}
}

var DEFAULT_STRING_LAYOUT string = "2006-01-02 15:04:05.000 -0700"
