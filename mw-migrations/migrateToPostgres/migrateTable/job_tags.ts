import { Client } from "pg";
import dayReportsJson from "../../backups/dayReports.bkp.json" assert { type: "json" };
import ways from "../../backups/ways.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, firebaseDateToPgDate} from "../utils.js";
import { v4 } from "uuid";

const query = 'INSERT INTO job_tags(uuid, name, description, color, way_uuid) VALUES ($1, $2, $3, $4, $5)';

const getWayIdByReportId = (dayReportId: string) => {
    const wayId = ways.find(way => (way.dayReportUuids as string[]).includes(dayReportId))?.uuid;
    return wayId as string;
};

export const jobTags = (client: Client) => {
    const jobTagsAmount = ways.flatMap(w => w.jobTagsStringified).length
    ways.forEach((way) => {
        const jobTags = way.jobTagsStringified.map(j => JSON.parse(j));

        if (jobTags.length === 0) {
            const values = [
                v4(),
                "no tags",
                "Default Label: Assigned when no other labels apply.",
                "rgb(255, 0, 0)",
                convertFirebaseUuidToPgUuid(way.uuid),
            ];
    
            client.query(query, values, (err: any, result: any) => {
                if (err) {
                    console.error('Error executing query', err);
                } else {
                    console.log('Query result jobTags:', result.rows);
                }
                });
        } else {
            jobTags.forEach(j => {
                const values = [
                    j.uuid,
                    j.name,
                    j.description,
                    j.color,
                    convertFirebaseUuidToPgUuid(way.uuid),
                ];
        
                client.query(query, values, (err: any, result: any) => {
                    if (err) {
                        console.error('Error executing query', err);
                    } else {
                        console.log('Query result jobTags:', result.rows);
                    }
                    });
    
            })

        }


        console.log(`ERRORS is ok (REASON - some wayIds is undefined), BUT CHECK THE LENGTH IN POSTGRES - SHOULD BE ${jobTagsAmount}`)

    });
};