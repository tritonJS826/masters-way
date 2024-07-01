package util

import (
	"database/sql"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

// DEFAULT_STRING_LAYOUT is based on the RFC3339 standard, but includes three digits for milliseconds.
const DEFAULT_STRING_LAYOUT = "2006-01-02T15:04:05.000Z07:00"

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

func ConvertPgUUIDToUUID(pgUUID pgtype.UUID) uuid.UUID {
	var uuid uuid.UUID
	copy(uuid[:], pgUUID.Bytes[:])
	return uuid
}
