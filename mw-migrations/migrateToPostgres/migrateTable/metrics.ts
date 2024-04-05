import { Client } from "pg";
import waysJSON from "../../backups/ways.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, firebaseDateToPgDate, timestampToPgDate} from "../utils.js";

const query = 'INSERT INTO metrics(uuid, created_at, updated_at, description, is_done, done_date, metric_estimation, way_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
export const metrics = (client: Client) => {
    const metricsAmount = waysJSON.flatMap(way => way.metricsStringified).length

    waysJSON.forEach((way) => {
      const metrics = way.metricsStringified.map((metricRaw: string) => JSON.parse(metricRaw))
      metrics.forEach((metric) => {
        console.log(metric.doneDate);
        const metricDoneDate = !metric.isDone
          ? null 
          : timestampToPgDate(metric.doneDate);
            const values = [
              metric.uuid,
              metric.created_at ? timestampToPgDate(metric.created_at) : firebaseDateToPgDate(way.createdAt),
              metric.updated_at ? timestampToPgDate(metric.updated_at): firebaseDateToPgDate(way.createdAt),
              metric.description,
              metric.isDone,
              metricDoneDate,
              metric.metricEstimation ?? 0,
              convertFirebaseUuidToPgUuid(way.uuid)
            ];

            client.query(query, values, (err: any, result: any) => {
                // values
              if (err) {
                    console.error('Error executing query', err);
                } else {
                    console.log('Query result metrics:', result.rows);
                }
            });
        })

        console.log(`ERRORS is ok (REASON - some metrics have the same uuid), BUT CHECK THE LENGTH IN POSTGRES - SHOULD BE ${metricsAmount}`)

    });
};