-- name: GetPricingPlanByUserId :one
SELECT pricing_plan
FROM profile_settings
WHERE owner_uuid = @user_uuid;

-- name: GetProfileSettingUserId :one
SELECT 
    uuid,
    pricing_plan,
    coins,
    expiration_date
FROM profile_settings
WHERE owner_uuid = @user_uuid;

-- name: UpdateProfileSettingByUserId :one
UPDATE
    profile_settings
SET
    coins = coalesce(sqlc.narg('coins'), coins),
    pricing_plan = coalesce(sqlc.narg('pricing_plan'), pricing_plan),
    expiration_date = coalesce(sqlc.narg('expiration_date'), expiration_date)
WHERE
    owner_uuid = @user_uuid
RETURNING 
    uuid,
    pricing_plan,
    coins,
    expiration_date;
