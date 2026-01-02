-- name: GetCompanionFeedbackByWayId :one
SELECT
    uuid,
    way_uuid,
    status,
    comment,
    character,
    last_updated_at
FROM companion_feedback
WHERE way_uuid = @way_uuid;

-- name: CreateCompanionFeedback :one
INSERT INTO companion_feedback(
    way_uuid,
    status,
    comment,
    character,
    last_updated_at
) VALUES (
    @way_uuid,
    @status,
    @comment,
    @character,
    @last_updated_at
) RETURNING uuid;

-- name: UpsertCompanionFeedback :one
INSERT INTO companion_feedback(
    way_uuid,
    status,
    comment,
    character,
    last_updated_at
) VALUES (
    @way_uuid,
    @status,
    @comment,
    @character,
    @last_updated_at
) ON CONFLICT (way_uuid) DO UPDATE SET
    status = EXCLUDED.status,
    comment = EXCLUDED.comment,
    character = EXCLUDED.character,
    last_updated_at = EXCLUDED.last_updated_at
RETURNING uuid;

-- name: UpdateCompanionFeedback :one
UPDATE companion_feedback SET
    status = @status,
    comment = @comment,
    character = @character,
    last_updated_at = @last_updated_at
WHERE way_uuid = @way_uuid
RETURNING uuid;
