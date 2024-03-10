import pkg from 'pg';
import { users } from './migrateTable/users.js'

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

    users(client);

    // await client.end()
    // .then(() => console.log('Connection to PostgreSQL closed'))
    // .catch((err: any) => console.error('Error closing connection', err));
}

startMigration();

