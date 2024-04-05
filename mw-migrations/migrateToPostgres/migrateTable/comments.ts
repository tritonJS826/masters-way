import { Client } from "pg";
import reportsJSON from "../../backups/dayReports.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, firebaseDateToPgDate, timestampToPgDate} from "../utils.js";

const query = 'INSERT INTO comments(uuid, created_at, updated_at, description, owner_uuid, day_report_uuid) VALUES ($1, $2, $3, $4, $5, $6)';


export const comments = (client: Client) => {
    const dayReportsAmount = reportsJSON.flatMap(report => report.commentsStringified).length;
    reportsJSON.forEach((report) => {
        report.commentsStringified.map(c => JSON.parse(c)).forEach(comment => {

            const values = [
              comment.uuid.length === 20 ? convertFirebaseUuidToPgUuid(comment.uuid) : comment.uuid,
              comment.createdAt ? timestampToPgDate(comment.createdAt) : firebaseDateToPgDate(report.createdAt),
              comment.updatedAt ? timestampToPgDate(comment.updatedAt) : firebaseDateToPgDate(report.updatedAt ?? {
                seconds: 0,
                nanoseconds: 0
                }),
              comment.description,
              convertFirebaseUuidToPgUuid(comment.ownerUuid),
              convertFirebaseUuidToPgUuid(report.uuid),
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
    console.log(`POSTGRES - SHOULD BE ${dayReportsAmount}`)
    });
};