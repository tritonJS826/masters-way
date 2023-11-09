import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {JobDone} from "src/model/businessModel/JobDone";

/**
 * Update JobDone
 */
export const updateJobDoneTime = async (time: string, uuid: string) => {
  const oldJobDone = await JobDoneDAL.getJobDone(uuid);
  const updatedJobDone: JobDone = new JobDone({
    ...oldJobDone,
    time: Number(time),
  });
  await JobDoneDAL.updateJobDone(updatedJobDone);
};