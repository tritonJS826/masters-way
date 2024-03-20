import { Client } from "pg";
import reportsJSON from "../../backups/dayReports.bkp.json" assert { type: "json" };
import waysJSON from "../../backups/ways.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, timestampToPgDate} from "../utils.js";

const query = 'INSERT INTO problems(uuid, created_at, updated_at, description, is_done, owner_uuid, day_report_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const tagsQuery = 'INSERT INTO problems_job_tags(problem_uuid, job_tag_uuid) VALUES ($1, $2)';

export const getTagUuidByNameAndReportId = (name: string, reportId:string) => {
    const way = waysJSON.find(w => w.dayReportUuids.includes(reportId as never));
    if (!way) return;

    const tag = way.jobTagsStringified.map(t => JSON.parse(t)).find(t => t.name === name).uuid;

    return tag;
};

export const problems = (client: Client) => {
    const dayReportsAmount = reportsJSON.flatMap(report => report.commentsStringified).length;
    reportsJSON.forEach((report) => {
        report.problemsStringified.map(p => JSON.parse(p)).forEach(problem => {

            const values = [
              problem.uuid.length === 20 ? convertFirebaseUuidToPgUuid(problem.uuid) : problem.uuid,
              timestampToPgDate(problem.createdAt),
              timestampToPgDate(problem.updatedAt),
              problem.description,
              problem.isDone,
              convertFirebaseUuidToPgUuid(problem.ownerUuid),
              convertFirebaseUuidToPgUuid(report.uuid),
            ];
            client.query(query, values, (err: any, result: any) => {
                if (err) {
                  console.error('Error executing query', err);
                } else {
                  console.log('Query result ways:', result.rows);
                }
            });

            problem.tags.forEach((tag: any) => {
                const problemTagsValues = [
                    problem.uuid.length === 20 ? convertFirebaseUuidToPgUuid(problem.uuid) : problem.uuid,
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
    console.log(`POSTGRES - SHOULD BE ${dayReportsAmount}`)
    });
};