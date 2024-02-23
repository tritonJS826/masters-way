package util

import "github.com/google/uuid"

func ToUuids(stringList []string) []uuid.UUID {
	uuidList := make([]uuid.UUID, len(stringList))
	for i := range stringList {
		uuidList[i] = uuid.MustParse(stringList[i])
	}

	return uuidList
}

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
