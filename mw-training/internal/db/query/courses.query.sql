-- name: CreateCourse :exec
INSERT INTO courses (
    name,
    description,
    owner_uuid
) VALUES (
    @name,
    @description,
    @owner_uuid
);

-- name: UpdateCourse :exec
UPDATE courses
SET 
    name = coalesce(sqlc.narg('name'), name),
    description = coalesce(sqlc.narg('description'), description),
    is_private = coalesce(sqlc.narg('is_private'), is_private),
WHERE courses.uuid = @course_uuid
RETURNING *;

-- name GetCourseList :many
SELECT
    c.uuid,
    c.name,
    c.description,
    c.is_private,
    c.owner_uuid,
    c.created_at,
    c.updated_at,
    COALESCE(f.favorite_count, 0) AS favorite_count,
    ARRAY_AGG(ct.name) FILTER (WHERE ct.name IS NOT NULL) AS tags
FROM
    courses c
LEFT JOIN
    favorite_users_cources fuc ON c.uuid = fuc.course_uuid
LEFT JOIN
    course_tags ct ON ct.uuid IN (
        SELECT tag_uuid
        FROM courses_tags
        WHERE course_uuid = c.uuid
    )
LEFT JOIN (
    SELECT
        course_uuid,
        COUNT(user_uuid) AS favorite_count
    FROM
        favorite_users_cources
    GROUP BY
        course_uuid
) f ON f.course_uuid = c.uuid
WHERE
    c.name ILIKE $1 -- Filter by name (case-insensitive search)
GROUP BY
    c.uuid, f.favorite_count
ORDER BY
    favorite_count DESC,
    c.created_at DESC -- Sort by favorite count, then by creation date
LIMIT @limit 
OFFSET @offset;

-- name GetOwnCourseList :many
-- filter own, mentoring, student, favorite

-- name: DeleteCourse :exec
DELETE FROM courses
WHERE courses.uuid = @course_uuid