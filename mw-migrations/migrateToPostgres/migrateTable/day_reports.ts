import { Client } from "pg";
import dayReportsJson from "../../backups/dayReports.bkp.json" assert { type: "json" };
import ways from "../../backups/ways.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, firebaseDateToPgDate} from "../utils.js";

const query = 'INSERT INTO day_reports(uuid, way_uuid, created_at, updated_at, is_day_off) VALUES ($1, $2, $3, $4, $5)';

const getWayIdByReportId = (dayReportId: string) => {
    const wayId = ways.find(way => (way.dayReportUuids as string[]).includes(dayReportId))?.uuid;
    return wayId as string;
};

export const dayReports = (client: Client) => {
    dayReportsJson.forEach((report) => {
        const wayId = getWayIdByReportId(report.uuid) 
            ?  convertFirebaseUuidToPgUuid(getWayIdByReportId(report.uuid))
            : null;
        const values = [
            convertFirebaseUuidToPgUuid(report.uuid),
            wayId,
            firebaseDateToPgDate(report.createdAt),
            firebaseDateToPgDate(report.updatedAt),
            report.isDayOff
        ];

        if (wayId !== null) {
            client.query(query, values, (err: any, result: any) => {
              // values
                if (err) {
                  console.error('Error executing query', err);
                } else {
                  console.log('Query result dayReports:', result.rows);
                }
              });
        }

        console.log(`ERRORS is ok (REASON - some wayIds is undefined), BUT CHECK THE LENGTH IN POSTGRES - SHOULD BE ${dayReportsJson.length}`)

    });
};