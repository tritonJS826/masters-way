-- name: CreateCourse :exec

-- name: UpdateCourse :exec
UPDATE courses
SET 
    name = coalesce(sqlc.narg('name'), name),
    description = coalesce(sqlc.narg('description'), description),
    is_private = coalesce(sqlc.narg('is_private'), is_private),
WHERE courses.uuid = @course_uuid
RETURNING *;

-- name GetCourseList :many
-- filter by name
-- with tags
-- sort by favorite users_courses
-- pagination

-- name GetOwnCourseList :many
-- filter own, mentoring, student, favorite

-- name: DeleteCourse :exec
DELETE FROM courses
WHERE courses.uuid = @course_uuid