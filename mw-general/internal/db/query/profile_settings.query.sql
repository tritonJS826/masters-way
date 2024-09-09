-- name: GetPricingPlanByUserId :one
SELECT pricing_plan
FROM profile_settings
WHERE owner_uuid = @user_uuid;

-- name: UpdatePricingPlanByUserId :one
UPDATE
    profile_settings
SET
    pricing_plan = @pricing_plan,
    expiration_date = @expiration_date,
    updated_at = CURRENT_TIMESTAMP
WHERE
    owner_uuid = @users_uuid
RETURNING *;
