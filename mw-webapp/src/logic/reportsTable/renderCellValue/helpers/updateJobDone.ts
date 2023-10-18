import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {JobDone} from "src/model/businessModel/JobDone";

/**
 * Update JobDone
 */
export const updateJobDone = async (description: string, uuid: string) => {
  const oldJobDone = await JobDoneDAL.getJobDone(uuid);
  const updatedJobDone: JobDone = new JobDone({
    ...oldJobDone,
    description,
  });
  await JobDoneDAL.updateJobDone(updatedJobDone);
};