import {getJobDone, updatesJobDone} from "src/dataAccessLogic/getJobsDone";
import {JobDone} from "src/model/businessModel/JobDone";

/**
 * Update data in JobsDone collection
 * @param {string} text
 * @param {string} uuid
 */
export const updateJobDone = async (text: string, uuid: string) => {
  const oldJobDone = await getJobDone(uuid);
  const time = Number(/\d+/.exec(text)) ?? 0;
  const updatedJobDone: JobDone = new JobDone({
    ...oldJobDone,
    description: text.replace(/\d/g, ""),
    time: time,
  });
  await updatesJobDone(updatedJobDone);
};