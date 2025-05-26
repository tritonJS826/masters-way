package services

import (
	db "mw-training/internal/db/sqlc"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type QuestionRepository interface {
	// CreateTopicInTraining(ctx context.Context, params db.CreateTopicInTrainingParams) (db.Topic, error)
	// UpdateTopic(ctx context.Context, params db.UpdateTopicParams) (db.Topic, error)
	// DeleteTopic(ctx context.Context, topicUuid pgtype.UUID) (db.Topic, error)
	// GetTopicByUuid(ctx context.Context, topicUuid pgtype.UUID) (db.GetTopicByUuidRow, error)
	// GetPracticeMaterialsByTopicId(ctx context.Context, topicUuid pgtype.UUID) ([]db.PracticeMaterial, error)
	// GetTheoryMaterialsByTopicId(ctx context.Context, topicUuid pgtype.UUID) ([]db.TheoryMaterial, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type QuestionService struct {
	questionRepository QuestionRepository
	pgxPool            *pgxpool.Pool
}

func NewQuestionService(pgxPool *pgxpool.Pool, questionRepository QuestionRepository) *QuestionService {
	return &QuestionService{
		pgxPool:            pgxPool,
		questionRepository: questionRepository,
	}
}

// func (ts *TopicService) GetTopicByUuid(ctx context.Context, topicUuid pgtype.UUID) (*pb.Topic, error) {
// 	topic, err := ts.topicRepository.GetTopicByUuid(ctx, topicUuid)
// 	if err != nil {
// 		return &pb.Topic{}, err
// 	}
// 	theoryMaterialsRaw, err := ts.topicRepository.GetTheoryMaterialsByTopicId(ctx, topicUuid)
// 	if err != nil {
// 		return &pb.Topic{}, err
// 	}
// 	practiceMaterialsRaw, err := ts.topicRepository.GetPracticeMaterialsByTopicId(ctx, topicUuid)
// 	if err != nil {
// 		return &pb.Topic{}, err
// 	}

// 	theoryMaterials := lo.Map(theoryMaterialsRaw, func(material db.TheoryMaterial, _ int) *pb.TheoryMaterial {
// 		return &pb.TheoryMaterial{
// 			Uuid:        *utils.MarshalPgUUID(material.Uuid),
// 			Name:        material.Name.String,
// 			Description: material.Description.String,
// 			TopicUuid:   *utils.MarshalPgUUID(material.TopicUuid),
// 			CreatedAt:   material.CreatedAt.Time.String(),
// 			UpdatedAt:   material.UpdatedAt.Time.String(),
// 		}
// 	})

// 	practiceMaterials := lo.Map(practiceMaterialsRaw, func(material db.PracticeMaterial, _ int) *pb.PracticeMaterial {
// 		return &pb.PracticeMaterial{
// 			Uuid:         *utils.MarshalPgUUID(material.Uuid),
// 			Name:         material.Name.String,
// 			Description:  material.TaskDescription.String,
// 			Order:        material.PracticeMaterialOrder,
// 			Answer:       material.Answer.String,
// 			PracticeType: string(material.PracticeType),
// 			TimeToAnswer: material.TimeToAnswer,
// 			TopicUuid:    *utils.MarshalPgUUID(material.TopicUuid),
// 			UpdatedAt:    material.UpdatedAt.Time.String(),
// 			CreatedAt:    material.CreatedAt.Time.String(),
// 		}
// 	})

//	return &pb.Topic{
//		Uuid:              *utils.MarshalPgUUID(topic.Uuid),
//		Name:              topic.Name.String,
//		TrainingUuid:      *utils.MarshalPgUUID(topic.TrainingUuid),
//		TopicOrder:        topic.TopicOrder,
//		OwnerUuid:         *utils.MarshalPgUUID(topic.OwnerUuid),
//		ParentTopicUuid:   utils.MarshalPgUUID(topic.Parent),
//		CreatedAt:         topic.CreatedAt.Time.String(),
//		TheoryMaterials:   theoryMaterials,
//		PracticeMaterials: practiceMaterials,
//	}, nil
// }

// func (ts *TopicService) CreateTopic(ctx context.Context, params db.CreateTopicInTrainingParams) (*pb.TopicPreview, error) {
// 	topicRaw, err := ts.topicRepository.CreateTopicInTraining(ctx, params)
// 	if err != nil {
// 		return &pb.TopicPreview{}, err
// 	}

// 	topic, err := ts.topicRepository.GetTopicByUuid(ctx, topicRaw.Uuid)
// 	if err != nil {
// 		return &pb.TopicPreview{}, err
// 	}

// 	return &pb.TopicPreview{
// 		Uuid:                    *utils.MarshalPgUUID(topic.Uuid),
// 		Name:                    topic.Name.String,
// 		TrainingUuid:            *utils.MarshalPgUUID(topic.TrainingUuid),
// 		TopicOrder:              topic.TopicOrder,
// 		ParentTopicUuid:         utils.MarshalPgUUID(topic.Parent),
// 		CreatedAt:               topic.CreatedAt.Time.String(),
// 		TheoryMaterialsAmount:   int32(topic.TheoryMaterialsAmount),
// 		PracticeMaterialsAmount: int32(topic.PracticeMaterialsAmount),
// 	}, nil
// }

// func (ts *TopicService) UpdateTopic(ctx context.Context, params db.UpdateTopicParams) (*pb.TopicPreview, error) {
// 	topicRaw, err := ts.topicRepository.UpdateTopic(ctx, params)
// 	if err != nil {
// 		return &pb.TopicPreview{}, err
// 	}

// 	topic, err := ts.topicRepository.GetTopicByUuid(ctx, topicRaw.Uuid)
// 	if err != nil {
// 		return &pb.TopicPreview{}, err
// 	}

// 	return &pb.TopicPreview{
// 		Uuid:                    *utils.MarshalPgUUID(topic.Uuid),
// 		Name:                    topic.Name.String,
// 		TrainingUuid:            *utils.MarshalPgUUID(topic.TrainingUuid),
// 		TopicOrder:              topic.TopicOrder,
// 		ParentTopicUuid:         utils.MarshalPgUUID(topic.Parent),
// 		CreatedAt:               topic.CreatedAt.Time.String(),
// 		TheoryMaterialsAmount:   int32(topic.TheoryMaterialsAmount),
// 		PracticeMaterialsAmount: int32(topic.PracticeMaterialsAmount),
// 	}, nil
// }

// func (ts *TopicService) DeleteTopic(ctx context.Context, topicUuid pgtype.UUID) (db.Topic, error) {
// 	return ts.topicRepository.DeleteTopic(ctx, topicUuid)
// }
