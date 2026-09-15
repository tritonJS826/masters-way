package routers

import (
	"mw-server/internal/auth"
	"mw-server/internal/config"
	"mw-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

type trainingRouter struct {
	config *config.Config

	trainingController            *controllers.TrainingController
	topicController               *controllers.TopicController
	theoryMaterialController      *controllers.TheoryMaterialController
	practiceMaterialController    *controllers.PracticeMaterialController
	testController                *controllers.TestController
	questionController            *controllers.QuestionController
	questionResultController      *controllers.QuestionResultController
	sessionController             *controllers.SessionController
	testSessionResultController   *controllers.TestSessionResultController
	trainingMentorController      *controllers.TrainingMentorController
	trainingStudentController     *controllers.TrainingStudentController
	trainingTrainingTagController *controllers.TrainingTrainingTagController
	favoriteUserTrainingController *controllers.FavoriteUserTrainingController
	trainingTestController        *controllers.TrainingTestController
}

func newTrainingRouter(
	config *config.Config,
	trainingController *controllers.TrainingController,
	topicController *controllers.TopicController,
	theoryMaterialController *controllers.TheoryMaterialController,
	practiceMaterialController *controllers.PracticeMaterialController,
	testController *controllers.TestController,
	questionController *controllers.QuestionController,
	questionResultController *controllers.QuestionResultController,
	sessionController *controllers.SessionController,
	testSessionResultController *controllers.TestSessionResultController,
	trainingMentorController *controllers.TrainingMentorController,
	trainingStudentController *controllers.TrainingStudentController,
	trainingTrainingTagController *controllers.TrainingTrainingTagController,
	favoriteUserTrainingController *controllers.FavoriteUserTrainingController,
	trainingTestController *controllers.TrainingTestController,
) *trainingRouter {
	return &trainingRouter{
		config:                         config,
		trainingController:             trainingController,
		topicController:                topicController,
		theoryMaterialController:       theoryMaterialController,
		practiceMaterialController:     practiceMaterialController,
		testController:                 testController,
		questionController:             questionController,
		questionResultController:       questionResultController,
		sessionController:              sessionController,
		testSessionResultController:    testSessionResultController,
		trainingMentorController:       trainingMentorController,
		trainingStudentController:      trainingStudentController,
		trainingTrainingTagController:  trainingTrainingTagController,
		favoriteUserTrainingController: favoriteUserTrainingController,
		trainingTestController:         trainingTestController,
	}
}

func (tr *trainingRouter) setTrainingRoutes(rg *gin.RouterGroup) {
	training := rg.Group("/mw-training")

	training.GET("/trainings", tr.trainingController.GetTrainingList)
	training.GET("/trainings/user", auth.AuthMiddleware(tr.config), tr.trainingController.GetTrainingListForUser)
	training.GET("/trainings/amount", auth.AuthMiddleware(tr.config), tr.trainingController.GetTrainingsAmountByUserId)
	training.GET("/trainings/:trainingId", tr.trainingController.GetTrainingById)
	training.POST("/trainings", auth.AuthMiddleware(tr.config), tr.trainingController.CreateTraining)
	training.PUT("/trainings/:trainingId", auth.AuthMiddleware(tr.config), tr.trainingController.UpdateTraining)
	training.DELETE("/trainings/:trainingId", auth.AuthMiddleware(tr.config), tr.trainingController.DeleteTraining)

	training.GET("/topics/:topicId", tr.topicController.GetTopicById)
	training.POST("/topics", auth.AuthMiddleware(tr.config), tr.topicController.CreateTopic)
	training.PUT("/topics/:topicId", auth.AuthMiddleware(tr.config), tr.topicController.UpdateTopic)
	training.DELETE("/topics/:topicId", auth.AuthMiddleware(tr.config), tr.topicController.DeleteTopic)

	training.POST("/theory-materials", auth.AuthMiddleware(tr.config), tr.theoryMaterialController.CreateTheoryMaterial)
	training.PUT("/theory-materials/:materialId", auth.AuthMiddleware(tr.config), tr.theoryMaterialController.UpdateTheoryMaterial)
	training.DELETE("/theory-materials/:materialId", auth.AuthMiddleware(tr.config), tr.theoryMaterialController.DeleteTheoryMaterial)

	training.POST("/practice-materials", auth.AuthMiddleware(tr.config), tr.practiceMaterialController.CreatePracticeMaterial)
	training.PUT("/practice-materials/:materialId", auth.AuthMiddleware(tr.config), tr.practiceMaterialController.UpdatePracticeMaterial)
	training.DELETE("/practice-materials/:materialId", auth.AuthMiddleware(tr.config), tr.practiceMaterialController.DeletePracticeMaterial)

	training.GET("/tests", tr.testController.GetTestList)
	training.GET("/tests/user", auth.AuthMiddleware(tr.config), tr.testController.GetTestsByUserId)
	training.GET("/tests/amount", auth.AuthMiddleware(tr.config), tr.testController.GetTestAmountByUserId)
	training.GET("/tests/:testId", tr.testController.GetTestById)
	training.POST("/tests", auth.AuthMiddleware(tr.config), tr.testController.CreateTest)
	training.PUT("/tests/:testId", auth.AuthMiddleware(tr.config), tr.testController.UpdateTest)
	training.DELETE("/tests/:testId", auth.AuthMiddleware(tr.config), tr.testController.DeleteTest)

	training.POST("/questions", auth.AuthMiddleware(tr.config), tr.questionController.CreateQuestion)
	training.PUT("/questions/:questionId", auth.AuthMiddleware(tr.config), tr.questionController.UpdateQuestion)
	training.DELETE("/questions/:questionId", auth.AuthMiddleware(tr.config), tr.questionController.DeleteQuestion)

	training.POST("/question-results", auth.AuthMiddleware(tr.config), tr.questionResultController.CreateQuestionResult)
	training.GET("/sessions/:sessionId/question-results", auth.AuthMiddleware(tr.config), tr.questionResultController.GetQuestionResultsBySessionUuid)

	training.POST("/sessions", auth.AuthMiddleware(tr.config), tr.sessionController.CreateTestSession)

	training.GET("/sessions/:sessionId/result", auth.AuthMiddleware(tr.config), tr.testSessionResultController.GetTestSessionResult)
	training.POST("/sessions/result", auth.AuthMiddleware(tr.config), tr.testSessionResultController.CreateTestSessionResult)

	training.POST("/trainings/:trainingId/mentors", auth.AuthMiddleware(tr.config), tr.trainingMentorController.CreateTrainingMentor)
	training.DELETE("/trainings/:trainingId/mentors/:userId", auth.AuthMiddleware(tr.config), tr.trainingMentorController.DeleteTrainingMentor)

	training.POST("/trainings/:trainingId/students", auth.AuthMiddleware(tr.config), tr.trainingStudentController.CreateTrainingStudent)
	training.DELETE("/trainings/:trainingId/students/:userId", auth.AuthMiddleware(tr.config), tr.trainingStudentController.DeleteTrainingStudent)

	training.POST("/trainings/:trainingId/tags", auth.AuthMiddleware(tr.config), tr.trainingTrainingTagController.CreateTrainingTrainingTag)
	training.DELETE("/trainings/:trainingId/tags/:tagName", auth.AuthMiddleware(tr.config), tr.trainingTrainingTagController.DeleteTrainingTrainingTag)

	training.POST("/favorites", auth.AuthMiddleware(tr.config), tr.favoriteUserTrainingController.CreateFavoriteUserTraining)
	training.DELETE("/favorites", auth.AuthMiddleware(tr.config), tr.favoriteUserTrainingController.DeleteFavoriteUserTraining)

	training.POST("/trainings/:trainingId/tests", auth.AuthMiddleware(tr.config), tr.trainingTestController.CreateTrainingTest)
}