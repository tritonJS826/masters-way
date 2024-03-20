import pkg from 'pg';
import { users } from './migrateTable/users.js'
import { delay } from './utils.js';
import { user_tags } from './migrateTable/user_tags.js';
import { users_user_tags } from './migrateTable/users_user_tags.js';
import { ways_way_tags } from './migrateTable/ways_way_tags.js';
import { way_tags } from './migrateTable/way_tags.js';
import { ways } from './migrateTable/ways.js';
import { metrics } from './migrateTable/metrics.js';
import { dayReports } from './migrateTable/day_reports.js';
import { favorite_users } from './migrateTable/favorite_users.js';
import { jobTags } from './migrateTable/job_tags.js';
import { wayCollections } from './migrateTable/way_collections.js';
import { to_user_mentoring_requests } from './migrateTable/to_user_mentoring_requests.js';
import { from_user_mentoring_request } from './migrateTable/from_user_mentoring_requests.js';
import { favorite_users_ways } from './migrateTable/favorite_users_ways.js';
import { former_mentors_ways } from './migrateTable/former_mentors_ways.js';
import { mentor_users_ways } from './migrateTable/mentor_users_ways.js';
import { comments } from './migrateTable/comments.js';
import { problems } from './migrateTable/problems.js';
import { job_dones } from './migrateTable/job_dones.js';
import { plans } from './migrateTable/plans.js';

const { Client } = pkg;

export const client = new Client({
    user: 'root',
    password: 'secret',
    host: 'localhost',
    port: 5432,
    database: 'mastersway_db',
  });
const clientEnd = async () => await client.end()
    .then(() => console.log('Connection to PostgreSQL closed'))
    .catch((err: any) => console.error('Error closing connection', err));

async function startMigration() {
    await client.connect()
        .then(() => console.log('Connected to PostgreSQL database'))
        .catch((err: any) => console.error('Error connecting to PostgreSQL database', err));
        // .then(() => {users(client)})
        
    user_tags();
    users_user_tags();
    ways_way_tags();
    way_tags();
    favorite_users();
    to_user_mentoring_requests();
    former_mentors_ways
    users(client);
    await delay(2_000)
    ways(client);
    await delay(2_000)
    metrics(client)
    await delay(2_000)
    dayReports(client)
    await delay(2_000)
    jobTags(client)
    await delay(2_000)
    await wayCollections(client) // + way_collections_ways
    await delay(2_000)
    from_user_mentoring_request(client)
    await delay(2_000)
    favorite_users_ways(client)
    await delay(2_000)
    former_mentors_ways(client)
    await delay(2_000)
    mentor_users_ways(client)
    await delay(2_000)
    comments(client)
    await delay(2_000)
    problems(client) // with problems_job_tags
    await delay(2_000)
    job_dones(client) // with job_dones_job_tags
    await delay(2_000)
    plans(client) // with job_dones_job_tags

    // await client.end()
    // .then(() => console.log('Connection to PostgreSQL closed'))
    // .catch((err: any) => console.error('Error closing connection', err));
}

startMigration();

