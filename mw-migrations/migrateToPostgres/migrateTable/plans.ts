import { Client } from "pg";
import reportsJSON from "../../backups/dayReports.bkp.json" assert { type: "json" };
import waysJSON from "../../backups/ways.bkp.json" assert {type: "json"};
import {convertFirebaseUuidToPgUuid, timestampToPgDate} from "../utils.js";
import { getTagUuidByNameAndReportId } from "./problems.js";

const query = 'INSERT INTO plans(uuid, created_at, updated_at, description, time, owner_uuid, is_done, day_report_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
const tagsQuery = 'INSERT INTO plans_job_tags(plan_uuid, job_tag_uuid) VALUES ($1, $2)';

export const plans = (client: Client) => {
    const dayReportsAmount = reportsJSON.flatMap(report => report.plansStringified).length;
    reportsJSON.forEach((report) => {
        report.plansStringified.map(p => JSON.parse(p)).forEach(async (plan) => {
          let planOwnerUuid;
          if (!plan.ownerUuid) {
            const way = waysJSON.find(way => (way.dayReportUuids as string[]).includes(report.uuid));
            console.log(way);
            if (!way) return;
            planOwnerUuid = way.ownerUuid;
            }; 
            const defaultDate = 1708286257098;
            const values = [
              plan.uuid.length === 20 ? convertFirebaseUuidToPgUuid(plan.uuid) : plan.uuid,
              timestampToPgDate(defaultDate),
              timestampToPgDate(defaultDate),
              plan.job,
              plan.estimationTime,
              plan.ownerUuid ? convertFirebaseUuidToPgUuid(plan.ownerUuid) : convertFirebaseUuidToPgUuid(planOwnerUuid!),
              plan.isDone ?? false,
              convertFirebaseUuidToPgUuid(report.uuid),
            ];
            client.query(query, values, (err: any, result: any) => {
                if (err) {
                  console.error('Error executing query', err);
                } else {
                  console.log('Query result ways:', result.rows);
                }
            });

            plan.tags.forEach((tag: any) => {
              const problemTagsValues = [
                  plan.uuid.length === 20 ? convertFirebaseUuidToPgUuid(plan.uuid) : plan.uuid,
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
    console.log(`POSTGRES - SHOULD BE ${dayReportsAmount}, but some of them has unique uuid. skip them.  `)
    });
};