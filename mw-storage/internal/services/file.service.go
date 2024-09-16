package services

import (
	"context"

	db "mwstorage/internal/db/sqlc"
	"mwstorage/internal/schemas"
	"mwstorage/pkg/utils"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type IFileRepository interface {
	CreateFile(ctx context.Context, arg db.CreateFileParams) (db.CreateFileRow, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type FileService struct {
	fileRepository IFileRepository
}

func NewFileService(fileRepository IFileRepository) *FileService {
	return &FileService{fileRepository}
}

type SaveFileInfoParams struct {
	SrcUrl        string
	Name          string
	PreviewUrl    string
	StorageType   db.StorageType
	OwnerUuid     string
	Size          int64
	GoogleDriveID *string
}

func (fs *FileService) SaveFileInfo(ctx context.Context, saveFileInfoParams *SaveFileInfoParams) (*schemas.UploadFileResponse, error) {
	var googleDrive pgtype.Text

	if saveFileInfoParams.GoogleDriveID != nil {
		googleDrive = pgtype.Text{String: *saveFileInfoParams.GoogleDriveID, Valid: true}
	}

	createFileParams := db.CreateFileParams{
		Name:          saveFileInfoParams.Name,
		SrcUrl:        saveFileInfoParams.SrcUrl,
		PreviewUrl:    pgtype.Text{String: saveFileInfoParams.PreviewUrl, Valid: true},
		StorageType:   db.StorageType(saveFileInfoParams.StorageType),
		GoogleDriveID: googleDrive,
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(saveFileInfoParams.OwnerUuid), Valid: true},
		Size:          saveFileInfoParams.Size,
	}

	file, err := fs.fileRepository.CreateFile(ctx, createFileParams)
	if err != nil {
		return nil, err
	}

	return &schemas.UploadFileResponse{
		ID:         utils.ConvertPgUUIDToUUID(file.Uuid).String(),
		OwnerID:    utils.ConvertPgUUIDToUUID(file.OwnerUuid).String(),
		Name:       file.Name,
		SrcURL:     file.SrcUrl,
		PreviewURL: file.PreviewUrl.String,
	}, nil
}
