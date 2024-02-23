-- name: CreatePlansJobTag :one
INSERT INTO plans_job_tags(
    plan_uuid,
    job_tag_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetPlansJoinJobTags :many
SELECT * FROM plans
JOIN plans_job_tags ON plans.uuid = plans_job_tags.plan_uuid
JOIN job_tags ON plans_job_tags.job_tag_uuid = job_tags.uuid
WHERE plans.uuid IN (
    -- plans uuids for day report 
    SELECT plans.uuid FROM plans 
    WHERE plans.day_report_uuid = $1
);

-- name: DeletePlansJobTagByIds :exec
DELETE FROM plans_job_tags
WHERE plan_uuid = $1 AND job_tag_uuid = $2;