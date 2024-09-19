-- Drop triggers
DROP TRIGGER IF EXISTS check_max_users_trigger;
DROP TRIGGER IF EXISTS create_user_trigger ON users;
DROP TRIGGER IF EXISTS max_tags_to_user_trigger ON users_user_tags;
DROP TRIGGER IF EXISTS max_likes_to_user_trigger ON favorite_users;
DROP TRIGGER IF EXISTS check_max_likes_from_user_trigger ON favorite_users;
DROP TRIGGER IF EXISTS max_req_from_way_to_mentor_for_mentor_trigger ON to_user_mentoring_requests;
DROP TRIGGER IF EXISTS max_req_from_mentor_to_way_trigger ON from_user_mentoring_requests;
DROP TRIGGER IF EXISTS max_likes_to_way_trigger ON favorite_users_ways;
DROP TRIGGER IF EXISTS max_ways_for_former_mentor_trigger ON former_mentors_ways;
DROP TRIGGER IF EXISTS max_mentors_in_way_trigger ON mentor_users_ways;
DROP TRIGGER IF EXISTS max_ways_in_collection_trigger ON way_collections_ways;
DROP TRIGGER IF EXISTS max_children_ways_on_level_trigger ON composite_ways;
DROP TRIGGER IF EXISTS max_way_tags_in_way_trigger ON ways_way_tags;
DROP TRIGGER IF EXISTS max_labels_in_way_trigger ON job_tags;
DROP TRIGGER IF EXISTS max_reports_in_way_trigger ON day_reports;
DROP TRIGGER IF EXISTS max_metrics_in_way_trigger ON metrics;
DROP TRIGGER IF EXISTS max_req_from_way_to_mentor_for_way_trigger ON to_user_mentoring_requests;
DROP TRIGGER IF EXISTS max_req_from_mentor_to_way_for_way_trigger ON from_user_mentoring_requests;
DROP TRIGGER IF EXISTS max_likes_in_way_trigger ON favorite_users_ways;
DROP TRIGGER IF EXISTS max_foremer_mentors_in_way_trigger ON former_mentors_ways;
DROP TRIGGER IF EXISTS max_mentoring_ways_for_user_trigger ON mentor_users_ways;
DROP TRIGGER IF EXISTS max_plans_for_label_trigger ON plans_job_tags;
DROP TRIGGER IF EXISTS max_labels_for_plans_trigger ON plans_job_tags;
DROP TRIGGER IF EXISTS max_labels_for_job_done_trigger ON job_dones_job_tags;
DROP TRIGGER IF EXISTS max_plans_in_report_trigger ON plans;
DROP TRIGGER IF EXISTS max_job_dones_in_report_trigger ON job_dones;
DROP TRIGGER IF EXISTS max_pronlems_in_report_trigger ON problems;
DROP TRIGGER IF EXISTS max_comments_in_report_trigger ON comments;
DROP TRIGGER IF EXISTS max_job_dones_for_label_trigger ON job_dones_job_tags;
DROP TRIGGER IF EXISTS duplicate_today_report_trigger ON day_reports;

-- Drop functions
DROP FUNCTION IF EXISTS check_max_users_per_project;
DROP FUNCTION IF EXISTS init_user CASCADE;
DROP FUNCTION IF EXISTS check_max_tags_to_user CASCADE;
DROP FUNCTION IF EXISTS check_max_likes_to_user CASCADE;
DROP FUNCTION IF EXISTS check_max_likes_from_user CASCADE;
DROP FUNCTION IF EXISTS check_max_req_from_way_to_mentor_for_mentor CASCADE;
DROP FUNCTION IF EXISTS check_max_req_from_mentor_to_way CASCADE;
DROP FUNCTION IF EXISTS check_max_likes_to_way CASCADE;
DROP FUNCTION IF EXISTS check_max_ways_for_former_mentor CASCADE;
DROP FUNCTION IF EXISTS check_max_mentors_in_way CASCADE;
DROP FUNCTION IF EXISTS check_ways_in_collection CASCADE;
DROP FUNCTION IF EXISTS check_max_children_ways_on_level CASCADE;
DROP FUNCTION IF EXISTS check_max_way_tags_in_way CASCADE;
DROP FUNCTION IF EXISTS check_max_labels_in_way CASCADE;
DROP FUNCTION IF EXISTS check_max_reports_in_way CASCADE;
DROP FUNCTION IF EXISTS check_max_metrics_in_way CASCADE;
DROP FUNCTION IF EXISTS check_max_req_from_way_to_mentor_for_way CASCADE;
DROP FUNCTION IF EXISTS check_max_req_from_mentor_to_way_for_way CASCADE;
DROP FUNCTION IF EXISTS check_max_likes_in_way CASCADE;
DROP FUNCTION IF EXISTS check_max_foremer_mentors_in_way CASCADE;
DROP FUNCTION IF EXISTS check_max_mentoring_ways_for_user CASCADE;
DROP FUNCTION IF EXISTS check_max_plans_for_label CASCADE;
DROP FUNCTION IF EXISTS check_max_labels_for_plans CASCADE;
DROP FUNCTION IF EXISTS check_max_labels_for_job_done CASCADE;
DROP FUNCTION IF EXISTS check_max_plans_in_report CASCADE;
DROP FUNCTION IF EXISTS check_max_job_dones_in_report CASCADE;
DROP FUNCTION IF EXISTS check_max_pronlems_in_report CASCADE;
DROP FUNCTION IF EXISTS check_max_comments_in_report CASCADE;
DROP FUNCTION IF EXISTS check_max_job_dones_for_label CASCADE;
DROP FUNCTION IF EXISTS check_duplicate_today_report CASCADE;

-- Drop tables that reference other tables first
DROP TABLE IF EXISTS "users_projects" CASCADE;
DROP TABLE IF EXISTS "projects" CASCADE;
DROP TABLE IF EXISTS "plans_job_tags" CASCADE;
DROP TABLE IF EXISTS "job_dones_job_tags" CASCADE;
DROP TABLE IF EXISTS "way_collections_ways" CASCADE;
DROP TABLE IF EXISTS "ways_way_tags" CASCADE;
DROP TABLE IF EXISTS "users_user_tags" CASCADE;
DROP TABLE IF EXISTS "plans" CASCADE;
DROP TABLE IF EXISTS "job_dones" CASCADE;
DROP TABLE IF EXISTS "job_tags" CASCADE;
DROP TABLE IF EXISTS "metrics" CASCADE;
DROP TABLE IF EXISTS "problems" CASCADE;
DROP TABLE IF EXISTS "comments" CASCADE;
DROP TABLE IF EXISTS "day_reports" CASCADE;
DROP TABLE IF EXISTS "mentor_users_ways" CASCADE;
DROP TABLE IF EXISTS "former_mentors_ways" CASCADE;
DROP TABLE IF EXISTS "favorite_users_ways" CASCADE;
DROP TABLE IF EXISTS "from_user_mentoring_requests" CASCADE;
DROP TABLE IF EXISTS "to_user_mentoring_requests" CASCADE;
DROP TABLE IF EXISTS "composite_ways" CASCADE;
DROP TABLE IF EXISTS "favorite_users" CASCADE;
DROP TABLE IF EXISTS "ways" CASCADE;
DROP TABLE IF EXISTS "way_collections" CASCADE;
DROP TABLE IF EXISTS "user_tags" CASCADE;
DROP TABLE IF EXISTS "way_tags" CASCADE;
DROP TABLE IF EXISTS "profile_settings" CASCADE;


-- Finally, drop the main 'users' table
DROP TABLE IF EXISTS "users" CASCADE;

-- Drop indexes
DROP INDEX IF EXISTS "users_email_key";
DROP INDEX IF EXISTS "way_tag_name_key";
DROP INDEX IF EXISTS "user_tag_name_key";

-- Drop types
DROP TYPE IF EXISTS pricing_plan_type CASCADE;
