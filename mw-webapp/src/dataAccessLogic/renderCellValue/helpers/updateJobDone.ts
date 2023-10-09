import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {JobDone} from "src/model/businessModel/JobDone";

/**
 * Update JobDone
 */
export const updateJobDone = async (text: string, uuid: string) => {
  const oldJobDone = await JobDoneDAL.getJobDone(uuid);
  const updatedJobDone: JobDone = new JobDone({
    ...oldJobDone,
    description: text,
  });
  await JobDoneDAL.updateJobDone(updatedJobDone);
};