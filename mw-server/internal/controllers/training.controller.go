package controllers

import (
	"mw-server/internal/auth"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/services"
	"mw-server/pkg/util"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type TrainingController struct {
	trainingService *services.TrainingService
}

func NewTrainingController(trainingService *services.TrainingService) *TrainingController {
	return &TrainingController{trainingService}
}

type createTrainingRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
	IsPrivate   bool   `json:"isPrivate"`
}

func (tc *TrainingController) GetTrainingList(ctx *gin.Context) {
	trainingName := ctx.Query("trainingName")
	offsetStr := ctx.Query("offset")
	limitStr := ctx.Query("limit")

	offset, _ := strconv.Atoi(offsetStr)
	limit, _ := strconv.Atoi(limitStr)
	if limit <= 0 {
		limit = 10
	}

	params := &services.GetTrainingListParams{
		TrainingName:  trainingName,
		RequestOffset: int32(offset),
		RequestLimit:  int32(limit),
	}

	result, err := tc.trainingService.GetTrainingList(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TrainingController) GetTrainingListForUser(ctx *gin.Context) {
	trainingsType := ctx.Query("trainingsType")

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := &services.GetTrainingListForUserParams{
		TrainingsType: services.TrainingType(trainingsType),
		UserUuid:      pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
	}

	result, err := tc.trainingService.GetTrainingListForUser(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TrainingController) GetTrainingsAmountByUserId(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := &services.GetGetTrainingsAmountByUserIdParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
	}

	result, err := tc.trainingService.GetTrainingsAmountByUserId(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TrainingController) GetTrainingById(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")

	result, err := tc.trainingService.GetTrainingById(ctx, pgtype.UUID{Bytes: uuid.MustParse(trainingID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TrainingController) CreateTraining(ctx *gin.Context) {
	var payload createTrainingRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := db.CreateTrainingParams{
		Name:        payload.Name,
		Description: payload.Description,
		OwnerUuid:   pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		IsPrivate:   payload.IsPrivate,
	}

	result, err := tc.trainingService.CreateTraining(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TrainingController) UpdateTraining(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")

	var payload struct {
		Name        *string `json:"name"`
		Description *string `json:"description"`
		IsPrivate   *bool   `json:"isPrivate"`
	}
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.UpdateTrainingParams{
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(trainingID), Valid: true},
	}
	if payload.Name != nil {
		params.Name = pgtype.Text{String: *payload.Name, Valid: true}
	}
	if payload.Description != nil {
		params.Description = pgtype.Text{String: *payload.Description, Valid: true}
	}
	if payload.IsPrivate != nil {
		params.IsPrivate = pgtype.Bool{Bool: *payload.IsPrivate, Valid: true}
	}

	result, err := tc.trainingService.UpdateTraining(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TrainingController) DeleteTraining(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")

	err := tc.trainingService.DeleteTraining(ctx, pgtype.UUID{Bytes: uuid.MustParse(trainingID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type TopicController struct {
	topicService *services.TopicService
}

func NewTopicController(topicService *services.TopicService) *TopicController {
	return &TopicController{topicService}
}

type createTopicRequest struct {
	Name         string  `json:"name" binding:"required"`
	TrainingUuid string  `json:"trainingUuid" binding:"required"`
	TopicOrder   int32   `json:"topicOrder"`
	ParentUuid   *string `json:"parentUuid"`
}

func (tc *TopicController) GetTopicById(ctx *gin.Context) {
	topicID := ctx.Param("topicId")

	result, err := tc.topicService.GetTopicByUuid(ctx, pgtype.UUID{Bytes: uuid.MustParse(topicID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TopicController) CreateTopic(ctx *gin.Context) {
	var payload createTopicRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.CreateTopicInTrainingParams{
		Name:         pgtype.Text{String: payload.Name, Valid: true},
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.TrainingUuid), Valid: true},
		TopicOrder:   payload.TopicOrder,
	}
	if payload.ParentUuid != nil && *payload.ParentUuid != "" {
		params.Parent = pgtype.UUID{Bytes: uuid.MustParse(*payload.ParentUuid), Valid: true}
	}

	result, err := tc.topicService.CreateTopic(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TopicController) UpdateTopic(ctx *gin.Context) {
	topicID := ctx.Param("topicId")

	var payload struct {
		Name       *string `json:"name"`
		TopicOrder *int32  `json:"topicOrder"`
		ParentUuid *string `json:"parentUuid"`
	}
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.UpdateTopicParams{
		Uuid: pgtype.UUID{Bytes: uuid.MustParse(topicID), Valid: true},
	}
	if payload.Name != nil {
		params.Name = pgtype.Text{String: *payload.Name, Valid: true}
	}
	if payload.TopicOrder != nil {
		params.TopicOrder = pgtype.Int4{Int32: *payload.TopicOrder, Valid: true}
	}
	if payload.ParentUuid != nil {
		if *payload.ParentUuid == "" {
			params.Parent = pgtype.UUID{Valid: true}
		} else {
			params.Parent = pgtype.UUID{Bytes: uuid.MustParse(*payload.ParentUuid), Valid: true}
		}
	}

	result, err := tc.topicService.UpdateTopic(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TopicController) DeleteTopic(ctx *gin.Context) {
	topicID := ctx.Param("topicId")

	_, err := tc.topicService.DeleteTopic(ctx, pgtype.UUID{Bytes: uuid.MustParse(topicID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type TheoryMaterialController struct {
	theoryMaterialService *services.TheoryMaterialService
}

func NewTheoryMaterialController(theoryMaterialService *services.TheoryMaterialService) *TheoryMaterialController {
	return &TheoryMaterialController{theoryMaterialService}
}

type createTheoryMaterialRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
	TopicUuid   string `json:"topicUuid" binding:"required"`
}

func (tmc *TheoryMaterialController) CreateTheoryMaterial(ctx *gin.Context) {
	var payload createTheoryMaterialRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.CreateTheoryMaterialInTopicParams{
		Name:        pgtype.Text{String: payload.Name, Valid: true},
		Description: pgtype.Text{String: payload.Description, Valid: true},
		TopicUuid:   pgtype.UUID{Bytes: uuid.MustParse(payload.TopicUuid), Valid: true},
	}

	result, err := tmc.theoryMaterialService.CreateTheoryMaterial(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tmc *TheoryMaterialController) UpdateTheoryMaterial(ctx *gin.Context) {
	materialID := ctx.Param("materialId")

	var payload struct {
		Name        *string `json:"name"`
		Description *string `json:"description"`
	}
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.UpdateTheoryMaterialParams{
		Uuid: pgtype.UUID{Bytes: uuid.MustParse(materialID), Valid: true},
	}
	if payload.Name != nil {
		params.Name = pgtype.Text{String: *payload.Name, Valid: true}
	}
	if payload.Description != nil {
		params.Description = pgtype.Text{String: *payload.Description, Valid: true}
	}

	result, err := tmc.theoryMaterialService.UpdateTheoryMaterial(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tmc *TheoryMaterialController) DeleteTheoryMaterial(ctx *gin.Context) {
	materialID := ctx.Param("materialId")

	_, err := tmc.theoryMaterialService.DeleteTheoryMaterial(ctx, pgtype.UUID{Bytes: uuid.MustParse(materialID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type PracticeMaterialController struct {
	practiceMaterialService *services.PracticeMaterialService
}

func NewPracticeMaterialController(practiceMaterialService *services.PracticeMaterialService) *PracticeMaterialController {
	return &PracticeMaterialController{practiceMaterialService}
}

type createPracticeMaterialRequest struct {
	TopicUuid   string `json:"topicUuid" binding:"required"`
	Name        string `json:"name" binding:"required"`
	Order       int32  `json:"order"`
	Description string `json:"description"`
	Answer      string `json:"answer"`
	PracticeType string `json:"practiceType"`
	TimeToAnswer int32 `json:"timeToAnswer"`
}

func (pmc *PracticeMaterialController) CreatePracticeMaterial(ctx *gin.Context) {
	var payload createPracticeMaterialRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.CreatePracticeMaterialInTopicParams{
		TopicUuid:             pgtype.UUID{Bytes: uuid.MustParse(payload.TopicUuid), Valid: true},
		Name:                  pgtype.Text{String: payload.Name, Valid: true},
		PracticeMaterialOrder: payload.Order,
		TaskDescription:       pgtype.Text{String: payload.Description, Valid: true},
		Answer:                pgtype.Text{String: payload.Answer, Valid: true},
		PracticeType:          db.PracticeType(payload.PracticeType),
		TimeToAnswer:          payload.TimeToAnswer,
	}

	result, err := pmc.practiceMaterialService.CreatePracticeMaterial(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (pmc *PracticeMaterialController) UpdatePracticeMaterial(ctx *gin.Context) {
	materialID := ctx.Param("materialId")

	var payload struct {
		Name         *string `json:"name"`
		Order        *int32  `json:"order"`
		Description  *string `json:"description"`
		Answer       *string `json:"answer"`
		PracticeType *string `json:"practiceType"`
		TimeToAnswer *int32  `json:"timeToAnswer"`
	}
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.UpdatePracticeMaterialParams{
		Uuid: pgtype.UUID{Bytes: uuid.MustParse(materialID), Valid: true},
	}
	if payload.Name != nil {
		params.Name = pgtype.Text{String: *payload.Name, Valid: true}
	}
	if payload.Order != nil {
		params.PracticeMaterialOrder = pgtype.Int4{Int32: *payload.Order, Valid: true}
	}
	if payload.Description != nil {
		params.TaskDescription = pgtype.Text{String: *payload.Description, Valid: true}
	}
	if payload.Answer != nil {
		params.Answer = pgtype.Text{String: *payload.Answer, Valid: true}
	}
	if payload.PracticeType != nil {
		params.PracticeType = db.NullPracticeType{PracticeType: db.PracticeType(*payload.PracticeType), Valid: true}
	}
	if payload.TimeToAnswer != nil {
		params.TimeToAnswer = pgtype.Int4{Int32: *payload.TimeToAnswer, Valid: true}
	}

	result, err := pmc.practiceMaterialService.UpdatePracticeMaterial(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (pmc *PracticeMaterialController) DeletePracticeMaterial(ctx *gin.Context) {
	materialID := ctx.Param("materialId")

	_, err := pmc.practiceMaterialService.DeletePracticeMaterial(ctx, pgtype.UUID{Bytes: uuid.MustParse(materialID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type TestController struct {
	testService *services.TestService
}

func NewTestController(testService *services.TestService) *TestController {
	return &TestController{testService}
}

type createTestRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
	IsPrivate   bool   `json:"isPrivate"`
}

func (tc *TestController) GetTestList(ctx *gin.Context) {
	testName := ctx.Query("testName")
	offsetStr := ctx.Query("offset")
	limitStr := ctx.Query("limit")

	offset, _ := strconv.Atoi(offsetStr)
	limit, _ := strconv.Atoi(limitStr)
	if limit <= 0 {
		limit = 10
	}

	params := &db.GetPublicTestsParams{
		TestName:      testName,
		RequestOffset: int32(offset),
		RequestLimit:  int32(limit),
	}

	result, err := tc.testService.GetTestList(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TestController) GetTestsByUserId(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	isOwner, _ := strconv.ParseBool(ctx.DefaultQuery("isOwner", "true"))

	params := &db.GetTestsByOwnerIdParams{
		OwnerUuid:      pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		IncludePrivate: isOwner,
	}

	result, err := tc.testService.GetTestsByUserId(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TestController) GetTestAmountByUserId(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	result, err := tc.testService.GetTestsAmountByUserId(ctx, pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TestController) GetTestById(ctx *gin.Context) {
	testID := ctx.Param("testId")

	userIDRaw, exists := ctx.Get(auth.ContextKeyUserID)
	var userID string
	if exists {
		userID = userIDRaw.(string)
	}

	params := &services.GetTestByIdParams{
		TestUuid: pgtype.UUID{Bytes: uuid.MustParse(testID), Valid: true},
	}
	if userID != "" {
		params.UserUuid = pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}
	}

	result, err := tc.testService.GetTestById(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TestController) CreateTest(ctx *gin.Context) {
	var payload createTestRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := &db.CreateTestParams{
		Name:        payload.Name,
		Description: payload.Description,
		OwnerUuid:   pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		IsPrivate:   payload.IsPrivate,
	}

	result, err := tc.testService.CreateTest(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TestController) UpdateTest(ctx *gin.Context) {
	testID := ctx.Param("testId")

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	var payload struct {
		Name        *string `json:"name"`
		Description *string `json:"description"`
		IsPrivate   *bool   `json:"isPrivate"`
	}
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := &db.UpdateTestParams{
		TestUuid: pgtype.UUID{Bytes: uuid.MustParse(testID), Valid: true},
	}
	if payload.Name != nil {
		params.Name = pgtype.Text{String: *payload.Name, Valid: true}
	}
	if payload.Description != nil {
		params.Description = pgtype.Text{String: *payload.Description, Valid: true}
	}
	if payload.IsPrivate != nil {
		params.IsPrivate = pgtype.Bool{Bool: *payload.IsPrivate, Valid: true}
	}

	result, err := tc.testService.UpdateTest(ctx, params, pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tc *TestController) DeleteTest(ctx *gin.Context) {
	testID := ctx.Param("testId")

	err := tc.testService.DeleteTest(ctx, pgtype.UUID{Bytes: uuid.MustParse(testID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type QuestionController struct {
	questionService *services.QuestionService
}

func NewQuestionController(questionService *services.QuestionService) *QuestionController {
	return &QuestionController{questionService}
}

type createQuestionRequest struct {
	TestUuid     string `json:"testUuid" binding:"required"`
	Name         string `json:"name"`
	PracticeType string `json:"practiceType"`
	QuestionText string `json:"questionText" binding:"required"`
	TimeToAnswer int32  `json:"timeToAnswer"`
	Answer       string `json:"answer" binding:"required"`
	IsActive     bool   `json:"isActive"`
	IsPrivate    bool   `json:"isPrivate"`
}

func (qc *QuestionController) CreateQuestion(ctx *gin.Context) {
	var payload createQuestionRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.CreateQuestionParams{
		TestUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.TestUuid), Valid: true},
		Name:         pgtype.Text{String: payload.Name, Valid: true},
		PracticeType: db.PracticeType(payload.PracticeType),
		QuestionText: payload.QuestionText,
		TimeToAnswer: payload.TimeToAnswer,
		Answer:       payload.Answer,
		IsActive:     payload.IsActive,
		IsPrivate:    payload.IsPrivate,
	}

	result, err := qc.questionService.CreateQuestion(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (qc *QuestionController) UpdateQuestion(ctx *gin.Context) {
	questionID := ctx.Param("questionId")

	var payload struct {
		Name          *string `json:"name"`
		PracticeType  *string `json:"practiceType"`
		QuestionText  *string `json:"questionText"`
		QuestionOrder *int32  `json:"questionOrder"`
		TimeToAnswer  *int32  `json:"timeToAnswer"`
		Answer        *string `json:"answer"`
		IsActive      *bool   `json:"isActive"`
		IsPrivate     *bool   `json:"isPrivate"`
	}
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.UpdateQuestionParams{
		QuestionUuid: pgtype.UUID{Bytes: uuid.MustParse(questionID), Valid: true},
	}
	if payload.Name != nil {
		params.Name = pgtype.Text{String: *payload.Name, Valid: true}
	}
	if payload.PracticeType != nil {
		params.PracticeType = db.NullPracticeType{PracticeType: db.PracticeType(*payload.PracticeType), Valid: true}
	}
	if payload.QuestionText != nil {
		params.QuestionText = pgtype.Text{String: *payload.QuestionText, Valid: true}
	}
	if payload.QuestionOrder != nil {
		params.QuestionOrder = pgtype.Int4{Int32: *payload.QuestionOrder, Valid: true}
	}
	if payload.TimeToAnswer != nil {
		params.TimeToAnswer = pgtype.Int4{Int32: *payload.TimeToAnswer, Valid: true}
	}
	if payload.Answer != nil {
		params.Answer = pgtype.Text{String: *payload.Answer, Valid: true}
	}
	if payload.IsActive != nil {
		params.IsActive = pgtype.Bool{Bool: *payload.IsActive, Valid: true}
	}
	if payload.IsPrivate != nil {
		params.IsPrivate = pgtype.Bool{Bool: *payload.IsPrivate, Valid: true}
	}

	result, err := qc.questionService.UpdateQuestion(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (qc *QuestionController) DeleteQuestion(ctx *gin.Context) {
	questionID := ctx.Param("questionId")

	err := qc.questionService.DeleteQuestion(ctx, pgtype.UUID{Bytes: uuid.MustParse(questionID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type QuestionResultController struct {
	questionResultService *services.QuestionResultService
}

func NewQuestionResultController(questionResultService *services.QuestionResultService) *QuestionResultController {
	return &QuestionResultController{questionResultService}
}

type createQuestionResultRequest struct {
	QuestionUuid    string `json:"questionUuid" binding:"required"`
	UserAnswer      string `json:"userAnswer" binding:"required"`
	TestSessionUuid string `json:"testSessionUuid" binding:"required"`
	TestUuid        string `json:"testUuid" binding:"required"`
	IsOk            bool   `json:"isOk"`
	ResultDescription string `json:"resultDescription"`
}

func (qrc *QuestionResultController) CreateQuestionResult(ctx *gin.Context) {
	var payload createQuestionResultRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := db.CreateQuestionResultParams{
		QuestionUuid:    pgtype.UUID{Bytes: uuid.MustParse(payload.QuestionUuid), Valid: true},
		UserAnswer:      payload.UserAnswer,
		TestSessionUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.TestSessionUuid), Valid: true},
		UserUuid:        pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		TestUuid:        pgtype.UUID{Bytes: uuid.MustParse(payload.TestUuid), Valid: true},
		IsOk:            payload.IsOk,
		ResultDescription: payload.ResultDescription,
	}

	result, err := qrc.questionResultService.CreateQuestionResult(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (qrc *QuestionResultController) GetQuestionResultsBySessionUuid(ctx *gin.Context) {
	sessionID := ctx.Param("sessionId")

	result, err := qrc.questionResultService.GetQuestionResultsBySessionUuid(ctx, pgtype.UUID{Bytes: uuid.MustParse(sessionID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

type SessionController struct {
	sessionService *services.SessionService
}

func NewSessionController(sessionService *services.SessionService) *SessionController {
	return &SessionController{sessionService}
}

func (sc *SessionController) CreateTestSession(ctx *gin.Context) {
	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	result, err := sc.sessionService.CreateSession(ctx, pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

type TestSessionResultController struct {
	testSessionResultService *services.TestSessionResultService
}

func NewTestSessionResultController(testSessionResultService *services.TestSessionResultService) *TestSessionResultController {
	return &TestSessionResultController{testSessionResultService}
}

type createTestSessionResultRequest struct {
	TestUuid    string `json:"testUuid" binding:"required"`
	SessionUuid string `json:"sessionUuid" binding:"required"`
	ResultDescription string `json:"resultDescription"`
}

func (tsrc *TestSessionResultController) GetTestSessionResult(ctx *gin.Context) {
	sessionID := ctx.Param("sessionId")

	result, err := tsrc.testSessionResultService.GetTestSessionResult(ctx, pgtype.UUID{Bytes: uuid.MustParse(sessionID), Valid: true})
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tsrc *TestSessionResultController) CreateTestSessionResult(ctx *gin.Context) {
	var payload createTestSessionResultRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := services.CreateTestSessionResultParams{
		TestUuid:          pgtype.UUID{Bytes: uuid.MustParse(payload.TestUuid), Valid: true},
		SessionUuid:       pgtype.UUID{Bytes: uuid.MustParse(payload.SessionUuid), Valid: true},
		UserUuid:          pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		ResultDescription: payload.ResultDescription,
	}

	result, err := tsrc.testSessionResultService.CreateTestSessionResult(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

type TrainingMentorController struct {
	trainingMentorService *services.TrainingMentorService
}

func NewTrainingMentorController(trainingMentorService *services.TrainingMentorService) *TrainingMentorController {
	return &TrainingMentorController{trainingMentorService}
}

type createTrainingMentorRequest struct {
	MentorUuid string `json:"mentorUuid" binding:"required"`
}

func (tmc *TrainingMentorController) CreateTrainingMentor(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")

	var payload createTrainingMentorRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.CreateTrainingMentorParams{
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(trainingID), Valid: true},
		MentorUuid:   pgtype.UUID{Bytes: uuid.MustParse(payload.MentorUuid), Valid: true},
	}

	result, err := tmc.trainingMentorService.CreateTrainingMentor(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tmc *TrainingMentorController) DeleteTrainingMentor(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")
	userID := ctx.Param("userId")

	params := db.DeleteTrainingMentorByIdsParams{
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(trainingID), Valid: true},
		MentorUuid:   pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
	}

	err := tmc.trainingMentorService.DeleteTrainingMentorByIds(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type TrainingStudentController struct {
	trainingStudentService *services.TrainingStudentService
}

func NewTrainingStudentController(trainingStudentService *services.TrainingStudentService) *TrainingStudentController {
	return &TrainingStudentController{trainingStudentService}
}

type createTrainingStudentRequest struct {
	StudentUuid string `json:"studentUuid" binding:"required"`
}

func (tsc *TrainingStudentController) CreateTrainingStudent(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")

	var payload createTrainingStudentRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := db.CreateTrainingStudentParams{
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(trainingID), Valid: true},
		StudentUuid:  pgtype.UUID{Bytes: uuid.MustParse(payload.StudentUuid), Valid: true},
	}

	result, err := tsc.trainingStudentService.CreateTrainingStudent(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

func (tsc *TrainingStudentController) DeleteTrainingStudent(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")
	userID := ctx.Param("userId")

	params := db.DeleteTrainingStudentByIdsParams{
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(trainingID), Valid: true},
		StudentUuid:  pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
	}

	err := tsc.trainingStudentService.DeleteTrainingStudentByIds(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type TrainingTrainingTagController struct {
	trainingTagService *services.TrainingTrainingTagService
}

func NewTrainingTrainingTagController(trainingTagService *services.TrainingTrainingTagService) *TrainingTrainingTagController {
	return &TrainingTrainingTagController{trainingTagService}
}

type createTrainingTrainingTagRequest struct {
	TagName string `json:"tagName" binding:"required"`
}

func (tttc *TrainingTrainingTagController) CreateTrainingTrainingTag(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")

	var payload createTrainingTrainingTagRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := services.CreateTrainingTrainingTagParams{
		TrainingTagName: payload.TagName,
		TrainingUuid:    trainingID,
	}

	result, err := tttc.trainingTagService.CreateTrainingTrainingTag(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, gin.H{"tagName": result})
}

func (tttc *TrainingTrainingTagController) DeleteTrainingTrainingTag(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")
	tagName := ctx.Param("tagName")

	params := db.DeleteTrainingsTrainingTagParams{
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(trainingID), Valid: true},
		TagName:      tagName,
	}

	err := tttc.trainingTagService.DeleteTrainingTrainingTag(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type FavoriteUserTrainingController struct {
	favoriteUserTrainingService *services.FavoriteTrainingUserService
}

func NewFavoriteUserTrainingController(favoriteUserTrainingService *services.FavoriteTrainingUserService) *FavoriteUserTrainingController {
	return &FavoriteUserTrainingController{favoriteUserTrainingService}
}

type createFavoriteUserTrainingRequest struct {
	TrainingUuid string `json:"trainingUuid" binding:"required"`
}

func (futc *FavoriteUserTrainingController) CreateFavoriteUserTraining(ctx *gin.Context) {
	var payload createFavoriteUserTrainingRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := db.CreateFavoriteTrainingForUserParams{
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.TrainingUuid), Valid: true},
		UserUuid:     pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
	}

	result, err := futc.favoriteUserTrainingService.CreateFavoriteUserTraining(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.JSON(http.StatusOK, result)
}

type deleteFavoriteUserTrainingRequest struct {
	TrainingUuid string `json:"trainingUuid" binding:"required"`
}

func (futc *FavoriteUserTrainingController) DeleteFavoriteUserTraining(ctx *gin.Context) {
	var payload deleteFavoriteUserTrainingRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	userID := userIDRaw.(string)

	params := db.DeleteFavoriteTrainingUserByIdsParams{
		UserUuid:     pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.TrainingUuid), Valid: true},
	}

	err := futc.favoriteUserTrainingService.DeleteFavoriteUserTraining(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusNoContent)
}

type TrainingTestController struct {
	trainingTestService *services.TrainingTestService
}

func NewTrainingTestController(trainingTestService *services.TrainingTestService) *TrainingTestController {
	return &TrainingTestController{trainingTestService}
}

type createTrainingTestRequest struct {
	TestUuid string `json:"testUuid" binding:"required"`
}

func (ttc *TrainingTestController) CreateTrainingTest(ctx *gin.Context) {
	trainingID := ctx.Param("trainingId")

	var payload createTrainingTestRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := &db.CreateTrainingsTestsParams{
		TrainingUuid: pgtype.UUID{Bytes: uuid.MustParse(trainingID), Valid: true},
		TestUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.TestUuid), Valid: true},
	}

	err := ttc.trainingTestService.CreateTrainingTest(ctx, params)
	util.HandleErrorGin(ctx, err)
	ctx.Status(http.StatusOK)
}