import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {JobDone} from "src/model/businessModel/JobDone";

/**
 * Update data in JobsDone collection
 * @param {string} text
 * @param {string} uuid
 */
export const updateJobDone = async (text: string, uuid: string) => {
  const oldJobDone = await JobDoneDAL.getJobDone(uuid);
  const time = Number(/\d+/.exec(text)) ?? 0;
  const updatedJobDone: JobDone = new JobDone({
    ...oldJobDone,
    description: text.replace(/\d/g, ""),
    time,
  });
  await JobDoneDAL.updateJobDone(updatedJobDone);
};