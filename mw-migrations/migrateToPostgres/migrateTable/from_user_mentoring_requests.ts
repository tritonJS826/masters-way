import { Client } from "pg";
import waysJSON from "../../backups/ways.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, firebaseDateToPgDate} from "../utils.js";

// const query = 'INSERT INTO ways(uuid, name, goal_description, updated_at, created_at, estimation_time, copied_from_way_uuid, is_private, is_completed, owner_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
const query = 'INSERT INTO from_user_mentoring_requests(user_uuid, way_uuid) VALUES ($1, $2)';

export const from_user_mentoring_request = (client: Client) => {

    const requestsAmount = waysJSON.flatMap(way => way.mentorRequestUuids).length;
    waysJSON.forEach((way) => {
        way.mentorRequestUuids.forEach(userId => {
            const values = [
              convertFirebaseUuidToPgUuid(userId),
              convertFirebaseUuidToPgUuid(way.uuid)
            ];
            client.query(query, values, (err: any, result: any) => {
                if (err) {
                  console.error('Error executing query', err);
                } else {
                  console.log('Query result ways:', result.rows);
                }
            });
        })

        // check length in postgres
        console.log(`POSTGRES - SHOULD BE ${requestsAmount}`)
    });
};