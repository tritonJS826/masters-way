package customErrors

// LastDayReportDateError

type LastDayReportDateError struct {
	Err string `json:"error" validate:"required"`
}

func MakeLastDayReportDateError() *LastDayReportDateError {
	return &LastDayReportDateError{
		Err: "EndDate is invalid.",
	}
}

func (err *LastDayReportDateError) Error() string {
	return err.Err
}
