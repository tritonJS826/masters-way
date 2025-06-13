package controllers

import (
	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TestController struct {
	generalService *services.GeneralService
	testService    *services.TestService
}

func NewTestController(generalService *services.GeneralService, testService *services.TestService) *TestController {
	return &TestController{generalService, testService}
}

// @Summary Create test
// @Description
// @Tags test
// @ID create-test
// @Accept json
// @Produce json
// @Param request body schemas.CreateTestRequest true "query params"
// @Success 200 {object} schemas.Test
// @Router /test [post]
func (tc *TestController) CreateTest(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)

	var payload *schemas.CreateTestRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.CreateTestParams{
		Name:        payload.Name,
		Description: &payload.Description,
		IsPrivate:   payload.IsPrivate,
		UserUuid:    userUUID,
	}

	test, err := tc.testService.CreateTest(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, test)
}

// @Summary Update test by uuid
// @Description
// @Tags test
// @ID update-test
// @Accept json
// @Produce json
// @Param testId path string true "test id"
// @Param request body schemas.UpdateTestRequest true "query params"
// @Success 200 {object} schemas.TestPreview
// @Router /test/{testId} [patch]
func (tc *TestController) UpdateTest(ctx *gin.Context) {
	testId := ctx.Param("testId")
	userId := ctx.Value(auth.ContextKeyUserID).(string)

	var payload *schemas.UpdateTestRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	args := &services.UpdateTestParams{
		TestUuid:    testId,
		UserUuid:    userId,
		IsPrivate:   payload.IsPrivate,
		Name:        payload.Name,
		Description: payload.Description,
	}
	test, err := tc.testService.UpdateTest(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, test)
}

// @Summary Delete test by Uuid
// @Description
// @Tags test
// @ID delete-test
// @Accept json
// @Produce json
// @Param testId path string true "test id"
// @Success 200
// @Router /test/{testId} [delete]
func (tc *TestController) DeleteTest(ctx *gin.Context) {
	userUUID := ctx.Value(auth.ContextKeyUserID).(string)
	testId := ctx.Param("testId")

	args := &services.DeleteTestParams{
		TestUuid: testId,
		UserUuid: userUUID,
	}
	err := tc.testService.DeleteTest(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}

// @Summary Get test list
// @Description
// @Tags test
// @ID get-test-list
// @Accept json
// @Produce json
// @Param name query string false "name"
// @Param page query int false "page"
// @Param limit query int false "limit"
// @Success 200 {object} schemas.TestPreviewList
// @Router /test [get]
func (tc *TestController) GetTestList(ctx *gin.Context) {
	name := ctx.Query("name")
	pageStr := ctx.DefaultQuery("page", "1")
	limitStr := ctx.DefaultQuery("limit", "10")

	reqPage, err := strconv.Atoi(pageStr)
	util.HandleErrorGin(ctx, err)
	reqLimit, err := strconv.Atoi(limitStr)
	util.HandleErrorGin(ctx, err)

	args := &services.GetTestListParams{
		PartialName: name,
		Page:        int32(reqPage),
		Limit:       int32(reqLimit),
	}

	tests, err := tc.testService.GetTestList(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, tests)
}

// @Summary Get tests amount by user id
// @Description
// @Tags test
// @ID get-tests-amount-by-user-id
// @Accept json
// @Produce json
// @Param userId path string true "user id"
// @Success 200 {object} schemas.TestsAmount
// @Router /test/amount/user/{userId} [get]
func (tc *TestController) GetTestsAmountByUserId(ctx *gin.Context) {
	userUuid := ctx.Param("userId")

	args := &services.GetTestsAmountByUserIdParams{
		UserUuid: userUuid,
	}

	testsAmount, err := tc.testService.GetTestsAmountByUserId(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, testsAmount)
}

// @Summary Get tests by user id
// @Description
// @Tags test
// @ID get-tests-by-user-id
// @Accept json
// @Produce json
// @Param userId path string true "user id"
// @Param type path string true "user id"
// @Success 200 {object} schemas.TestPreviewList
// @Router /test/user/{userId} [get]
func (tc *TestController) GetTestsByUserId(ctx *gin.Context) {
	userIDRaw, isExist := ctx.Get(auth.ContextKeyUserID)
	var userID *string
	if isExist {
		userIDa := userIDRaw.(string)
		userID = &userIDa
	} else {
		userID = nil
	}
	ownerUserUuid := ctx.Param("userId")

	args := &services.GetTestsByUserIdParams{
		OwnerUuid: ownerUserUuid,
		UserUuid:  userID,
	}

	tests, err := tc.testService.GetTestsByUserId(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, tests)
}

// @Summary Get test by id
// @Description
// @Tags test
// @ID get-test-by-id
// @Accept json
// @Produce json
// @Param testId path string true "test id"
// @Success 200 {object} schemas.Test
// @Router /test/{testId} [get]
func (tc *TestController) GetTestById(ctx *gin.Context) {
	requestOwnerUuid := ctx.Value(auth.ContextKeyUserID).(string)
	testId := ctx.Param("testId")

	args := &services.GetTestByIdParams{
		Uuid:             testId,
		RequestOwnerUuid: requestOwnerUuid,
	}

	test, err := tc.testService.GetTestById(ctx, args)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, test)
}
