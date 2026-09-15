package services

import (
	"context"
	"fmt"

	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"google.golang.org/api/drive/v3"
)

type IFileRepository interface {
	CreateFile(ctx context.Context, arg db.CreateFileParams) (db.CreateFileRow, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type FileService struct {
	repo IFileRepository
}

func NewFileService(repo IFileRepository) *FileService {
	return &FileService{repo}
}

func (fs *FileService) SaveFileInfo(ctx context.Context, driveFile *drive.File, ownerUUID string, size int64) (*schemas.UploadFileResponse, error) {
	ownerUID, _ := uuid.Parse(ownerUUID)
	previewURL := fmt.Sprintf("https://drive.google.com/thumbnail?id=%s", driveFile.Id)

	result, err := fs.repo.CreateFile(ctx, db.CreateFileParams{
		Name:          driveFile.Name,
		SrcUrl:        driveFile.WebContentLink,
		PreviewUrl:    pgtype.Text{String: previewURL, Valid: true},
		StorageType:   db.StorageTypeGoogleDrive,
		GoogleDriveID: pgtype.Text{String: driveFile.Id, Valid: true},
		OwnerUuid:     pgtype.UUID{Bytes: ownerUID, Valid: true},
		Size:          size,
	})
	if err != nil {
		return nil, err
	}

	preview := ""
	if ptr := util.MarshalPgText(result.PreviewUrl); ptr != nil {
		preview = *ptr
	}

	return &schemas.UploadFileResponse{
		ID:         util.ConvertPgUUIDToUUID(result.Uuid).String(),
		Name:       result.Name,
		OwnerID:    util.ConvertPgUUIDToUUID(result.OwnerUuid).String(),
		PreviewURL: preview,
		SrcURL:     result.SrcUrl,
	}, nil
}