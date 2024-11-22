-- name: CreateUserIntroSurvey :one
INSERT INTO user_intro (
    user_uuid,
    device_uuid,
    role,
    preferred_interface_language,
    student_goals,
    student_experience,
    why_registered,
    source,
    promo_code
) VALUES (
    @user_uuid,
    @device_uuid,
    @role,
    @preferred_interface_language,
    @student_goals,
    @student_experience,
    @why_registered,
    @source,
    @promo_code
)
RETURNING *;
