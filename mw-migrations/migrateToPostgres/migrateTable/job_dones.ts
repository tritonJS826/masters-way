import { Client } from "pg";
import reportsJSON from "../../backups/dayReports.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, timestampToPgDate} from "../utils.js";
import { getTagUuidByNameAndReportId } from "./problems.js";

const query = 'INSERT INTO job_dones(uuid, created_at, updated_at, description, time, owner_uuid, day_report_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const tagsQuery = 'INSERT INTO job_dones_job_tags(job_done_uuid, job_tag_uuid) VALUES ($1, $2)';

export const job_dones = (client: Client) => {
    const dayReportsAmount = reportsJSON.flatMap(report => report.jobsDoneStringified).length;
    reportsJSON.forEach((report) => {
        report.jobsDoneStringified.map(j => JSON.parse(j)).forEach(async (job) => {

            if (!job.ownerUuid) return; 
            const defaultDate = 1708286257098;
            const values = [
              job.uuid.length === 20 ? convertFirebaseUuidToPgUuid(job.uuid) : job.uuid,
              timestampToPgDate(defaultDate),
              timestampToPgDate(defaultDate),
              job.description,
              job.time,
              convertFirebaseUuidToPgUuid(job.ownerUuid),
              convertFirebaseUuidToPgUuid(report.uuid),
            ];
            client.query(query, values, (err: any, result: any) => {
                if (err) {
                  console.error('Error executing query', err);
                } else {
                  console.log('Query result ways:', result.rows);
                }
            });

            job.tags.forEach((tag: any) => {
                const problemTagsValues = [
                    job.uuid.length === 20 ? convertFirebaseUuidToPgUuid(job.uuid) : job.uuid,
                    getTagUuidByNameAndReportId(tag.name, report.uuid),
                ];
                console.log(problemTagsValues)
                client.query(tagsQuery, problemTagsValues, (err: any, result: any) => {
                    if (err) {
                      console.error('Error executing query', err);
                    } else {
                      console.log('Query result ways:', result.rows);
                    }
                });
            })

        })

    // check length in postgres
    console.log(`POSTGRES - SHOULD BE ${dayReportsAmount}, but some job,ownerUuid is undefined. skip them.  `)
    });
};