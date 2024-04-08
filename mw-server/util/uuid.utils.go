package util

import (
	"database/sql"
	"encoding/json"

	"github.com/google/uuid"
)

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

func MarshalNullUuid(nullUuid uuid.NullUUID) ([]byte, error) {
	if nullUuid.Valid {
		return json.Marshal(nullUuid.UUID)
	} else {
		return []byte("null"), nil
	}
}

func MarshalNullString(nullString sql.NullString) string {
	if nullString.Valid {
		return string(nullString.String)
	} else {
		strRaw, _ := json.Marshal(nil)

		return string(strRaw)
	}
}

func MarshalNullTime(nullTime sql.NullTime) interface{} {
	if nullTime.Valid {
		return nullTime.Time.String()
	} else {
		return nil
	}
}

var DEFAULT_STRING_LAYOUT string = "01/02/2006"
