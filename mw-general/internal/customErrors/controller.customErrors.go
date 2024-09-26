package customErrors

import "fmt"

// NoRightToChangeDayReportError

type NoRightToChangeDayReportError struct {
	Err   string `json:"error" validate:"required"`
	ErrID string `json:"errorId" validate:"required"`
}

func MakeNoRightToChangeDayReportError(wayID string) *NoRightToChangeDayReportError {
	return &NoRightToChangeDayReportError{
		Err:   fmt.Sprintf("Not enough rights! You can request editing rights on the way %s.", wayID),
		ErrID: "no-access-rights",
	}
}

func (err *NoRightToChangeDayReportError) Error() string {
	return err.Err
}
