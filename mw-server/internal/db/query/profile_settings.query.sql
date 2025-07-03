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


-- name: RefillCoinsForAll :many
UPDATE
    profile_settings
SET
    expiration_date = (CURRENT_DATE + INTERVAL '1 month'),
    coins = CASE
        WHEN pricing_plan = 'free' THEN 50
        WHEN pricing_plan = 'ai-starter' THEN 1500
        WHEN pricing_plan = 'starter' THEN 2000
        WHEN pricing_plan = 'pro' THEN 4000
        ELSE coins
    END
WHERE
    expiration_date < CURRENT_DATE
RETURNING
    uuid,
    pricing_plan,
    coins,
    expiration_date;


-- name: ReduceCoinsByUserId :one
UPDATE
    profile_settings
SET
    coins = profile_settings.coins - @coins
WHERE
    profile_settings.owner_uuid = @owner_uuid
RETURNING
    uuid,
    pricing_plan,
    coins,
    expiration_date;

-- name: GetCoinsCountByUserId :one
SELECT
    coins
FROM
    profile_settings
WHERE
    owner_uuid = @user_uuid;