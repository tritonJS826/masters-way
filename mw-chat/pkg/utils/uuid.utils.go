package utils

import (
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

func ConvertPgUUIDToUUID(pgUUID pgtype.UUID) uuid.UUID {
	var uuid uuid.UUID
	copy(uuid[:], pgUUID.Bytes[:])
	return uuid
}

func MarshalPgUUID(pgUUID pgtype.UUID) *string {
	if pgUUID.Valid {
		u, err := uuid.FromBytes(pgUUID.Bytes[:])
		if err == nil {
			str := u.String()
			return &str
		}
	}
	return nil
}

func MarshalPgTimestamp(timestamp pgtype.Timestamp) *string {
	if timestamp.Valid {
		str := timestamp.Time.Format(DEFAULT_STRING_LAYOUT)
		return &str
	} else {
		return nil
	}
}

func MarshalPgText(pgText pgtype.Text) *string {
	if pgText.Valid {
		str := pgText.String
		return &str
	}
	return nil
}
