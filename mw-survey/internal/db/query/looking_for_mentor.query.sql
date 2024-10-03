-- name: CreateLookingForMentorSurvey :one
INSERT INTO looking_for_mentor (
    user_uuid,
    user_email,
    skills_to_learn,
    current_experience,
    mentor_description
) VALUES (
    @user_uuid,
    @user_email,
    @skills_to_learn,
    @current_experience,
    @mentor_description
)
RETURNING *;
