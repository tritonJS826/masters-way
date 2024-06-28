package util

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

func FormatDateString(dateStr string) string {
	layouts := []string{
		"2006-01-02T15:04:05.000",
		"2006-01-02T15:04:05.00",
		"2006-01-02T15:04:05.0",
		"2006-01-02T15:04:05",
	}

	var t time.Time
	var err error
	for _, layout := range layouts {
		t, err = time.Parse(layout, dateStr)
		if err == nil {
			return t.Format(DEFAULT_STRING_LAYOUT)
		}
	}
	return ""
}

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
		str := nullTime.Time.Format(DEFAULT_STRING_LAYOUT)
		return &str
	} else {
		return nil
	}
}

var DEFAULT_STRING_LAYOUT string = "2006-01-02T15:04:05.000Z07:00"
