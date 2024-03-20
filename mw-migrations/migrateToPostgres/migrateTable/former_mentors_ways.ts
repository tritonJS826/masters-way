import { Client } from "pg";
import waysJSON from "../../backups/ways.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid} from "../utils.js";

const query = 'INSERT INTO former_mentors_ways(former_mentor_uuid, way_uuid) VALUES ($1, $2)';

export const former_mentors_ways = (client: Client) => {
    const formerMentorAmount = waysJSON.flatMap(way => way.formerMentorUuids).length;
    waysJSON.forEach((way) => {
        way.formerMentorUuids.forEach(userId => {
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
    console.log(`POSTGRES - SHOULD BE ${formerMentorAmount}`)
    });
};