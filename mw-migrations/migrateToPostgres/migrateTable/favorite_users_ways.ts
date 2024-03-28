import { Client } from "pg";
import waysJSON from "../../backups/ways.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid} from "../utils.js";

const query = 'INSERT INTO favorite_users_ways(user_uuid, way_uuid) VALUES ($1, $2)';

export const favorite_users_ways = (client: Client) => {
    const favoriteAmount = waysJSON.flatMap(way => way.favoriteForUserUuids).length;
    waysJSON.forEach((way) => {
        way.favoriteForUserUuids.forEach(userId => {
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
    console.log(`POSTGRES - SHOULD BE ${favoriteAmount}`)
    });
};