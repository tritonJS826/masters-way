import { Client } from "pg";
import waysJSON from "../../backups/ways.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, firebaseDateToPgDate} from "../utils.js";

const query = 'INSERT INTO ways(uuid, name, goal_description, updated_at, created_at, estimation_time, copied_from_way_uuid, is_private, is_completed, owner_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

export const ways = (client: Client) => {
    waysJSON.forEach((way) => {
        const values = [
          convertFirebaseUuidToPgUuid(way.uuid),
          way.name,
          way.goalDescription,
          firebaseDateToPgDate(way.lastUpdate),
          firebaseDateToPgDate(way.createdAt),
          way.estimationTime,
          way.copiedFromWayUuid == "" ? null : convertFirebaseUuidToPgUuid(way.copiedFromWayUuid),
          way.isPrivate,
          way.status === "Completed",
          convertFirebaseUuidToPgUuid(way.ownerUuid),
        ];
        client.query(query, values, (err: any, result: any) => {
          // values
            if (err) {
              console.error('!!', convertFirebaseUuidToPgUuid(way.copiedFromWayUuid))
              console.error('Error executing query', err);
              client.query(query, [
              convertFirebaseUuidToPgUuid(way.uuid),
              way.name,
              way.goalDescription,
              firebaseDateToPgDate(way.lastUpdate),
              firebaseDateToPgDate(way.createdAt),
              way.estimationTime,
              null,
              way.isPrivate,
              way.status === "Completed",
              convertFirebaseUuidToPgUuid(way.ownerUuid),
              ])
            } else {
              console.log('Query result ways:', result.rows);
            }
          });

        // check length in postgres
        console.log(`ERRORS is ok (REASON - some relations copied from lost), BUT CHECK THE LENGTH IN POSTGRES - SHOULD BE ${waysJSON.length}`)
    });
};