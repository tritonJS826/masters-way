/*
Masters way API

Testing WayCollectionWayAPIService

*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech);

package openapi

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func Test_openapi_WayCollectionWayAPIService(t *testing.T) {

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)

	t.Run("Test WayCollectionWayAPIService CreateWayCollectionWay", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		httpRes, err := apiClient.WayCollectionWayAPI.CreateWayCollectionWay(context.Background()).Execute()

		require.Nil(t, err)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test WayCollectionWayAPIService DeleteWayCollectionWay", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var wayCollectionId string
		var wayId string

		httpRes, err := apiClient.WayCollectionWayAPI.DeleteWayCollectionWay(context.Background(), wayCollectionId, wayId).Execute()

		require.Nil(t, err)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

}
