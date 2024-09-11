-- name: CreatePlansLabel :one
INSERT INTO plans_labels(
    plan_uuid,
    label_uuid
) VALUES (
             $1, $2
         ) RETURNING *;

-- name: GetPlansByDayReportUuids :many
SELECT
    *,
    COALESCE(
            ARRAY(
                SELECT plans_labels.label_uuid
            FROM plans_labels
            WHERE plans.uuid = plans_labels.plan_uuid
    ),
            '{}'
    )::VARCHAR[] AS label_uuids
FROM plans WHERE plans.day_report_uuid = ANY(@day_report_uuids::UUID[]);

-- name: DeletePlansLabelByIds :exec
DELETE FROM plans_labels
WHERE plan_uuid = @plan_uuid AND label_uuid = @label_uuid;