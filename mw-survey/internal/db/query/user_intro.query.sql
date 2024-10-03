-- name: CreateUserIntroSurvey :one
INSERT INTO user_intro (
    user_uuid,
    device_uuid,
    role,
    preferred_interface_language,
    student_goals,
    student_experience,
    why_registered,
    source
) VALUES (
    @user_uuid,
    @device_uuid,
    @role,
    @preferred_interface_language,
    @student_goals,
    @student_experience,
    @why_registered,
    @source
)
RETURNING *;
