package routers

import (
	"context"
	"mwserver/internal/config"
	"mwserver/internal/openapi"
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
	_, err = generalApi.DevAPI.DevResetDbGet(context.Background()).Execute()
	if err != nil {
		t.Fatalf("Failed to reset db: %v", err)
	}

	t.Run("should return a successful health check status and validate the response message", func(t *testing.T) {
		healthCheckStatus, response, err := generalApi.HealthAPI.HealthcheckGet(context.Background()).Execute()
		if err != nil {
			t.Fatalf("Failed to create FromUserMentoringRequest: %v", err)
		}

		expectedData := map[string]string(map[string]string{"message": "The way APi is working fine"})

		assert.Equal(t, http.StatusOK, response.StatusCode)
		assert.Equal(t, expectedData, healthCheckStatus)
	})
}
