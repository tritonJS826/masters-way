package routers

import (
	"context"
	"mwgeneral/internal/config"
	"mwgeneral/internal/openapi"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetAPIHealthStatus(t *testing.T) {
	newConfig, err := config.LoadConfig("../../")
	if err != nil {
		t.Fatalf("Failed to load config: %v", err)
	}

	generalApi := openapi.MakeGeneralAPIClient(&newConfig)

	t.Run("should return a successful health check status and validate the response message", func(t *testing.T) {
		response, err := generalApi.HealthAPI.HealthcheckGet(context.Background()).Execute()
		if err != nil {
			t.Fatalf("Failed to get healthcheck: %v", err)
		}

		assert.Equal(t, http.StatusNoContent, response.StatusCode)
	})
}
