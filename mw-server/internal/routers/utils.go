package routers

import (
	"mw-server/pkg/util"

	"time"
)

func GetTimestampMinusDays(days int) string {
    date := time.Now().UTC()
    date = date.AddDate(0, 0, -days)
    date = time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, time.UTC)

    return date.Format(util.DEFAULT_STRING_LAYOUT)
}