import { WayService } from "./service/WayService.js";

import { formatDate } from "./utils/formatDate.js";
import { logFile } from "./utils/logFile.js";

/*
/ Adds mentorRequestsUuids property to all ways
*/
async function migrateWay() {
  let totalModelsChanged = 0;
  let totalRequests = 0;
  let totalTimeSpent = 0;
  const migrationStartTime = new Date();

  try {
    const waysDTO = await WayService.getWaysDTO();

    for (const wayDTO of waysDTO) {
      if (!wayDTO.mentorRequestsUuids) {
        const startTime = Date.now();
        await WayService.updateWayDTO(
          { ...wayDTO, mentorRequestsUuids: [] },
          wayDTO.uuid
        );
        const endTime = Date.now();
        totalTimeSpent += endTime - startTime;
        totalModelsChanged++;
        totalRequests++;
      }
    }

    const averageRequestTime = totalTimeSpent / totalRequests;

    const migrationEndTime = new Date();

    const logData = `
    Migration completed.

    Start Time: ${formatDate(migrationStartTime)}
    End Time = ${formatDate(migrationEndTime)}
    Total time: ${totalTimeSpent}ms

    Total Models changed: ${totalModelsChanged}
    Total requests: ${totalRequests}
    Average request time: ${averageRequestTime}ms

    Migration goal:
    Add mentorRequestsUuids to Way collection`;

    logFile(logData, "waysMigration", migrationEndTime);

    console.log(`Migration completed, Log data saved to logs folder`);
  } catch (error) {
    const migrationEndTime = new Date();

    logFile(
      `
    ${error as string}

    Migration goal:
    Add mentorRequestsUuids to Way collection
    `,
      "waysMigration",
      migrationEndTime
    );

    console.log(`Error during migration, Log data saved to logs folder`);
  }
}

migrateWay();
