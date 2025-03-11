package routers

import (
	"time"
)

const DEFAULT_STRING_LAYOUT = "2006-01-02T15:04:05.000Z07:00"

func GetTimestampMinusDays(days int) string {
    date := time.Now().UTC()
    date = date.AddDate(0, 0, -days)
    date = time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, time.UTC)

    return date.Format(DEFAULT_STRING_LAYOUT)
}