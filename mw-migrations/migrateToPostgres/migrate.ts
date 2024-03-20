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

    // users(client);
    // await delay(2_000)
    // ways(client);
    // await delay(2_000)
    // metrics(client)
    // await delay(2_000)
    // dayReports(client)
    // await delay(2_000)
    // jobTags(client)
    // await delay(2_000)
    await wayCollections(client) // + way_collections_ways
    await delay(2_000)

    // 12/22 done

    // await client.end()
    // .then(() => console.log('Connection to PostgreSQL closed'))
    // .catch((err: any) => console.error('Error closing connection', err));
}

startMigration();

