import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {JobDone} from "src/model/businessModel/JobDone";

/**
 * JobDoneTime props
 */
interface JobDoneTimeProps {

  /**
   * Time amount
   */
  time: number;

  /**
   * JobDone UUID
   */
  jobDoneUuid: string;
}

/**
 * Update JobDone
 */
export const updateJobDoneTime = async (props: JobDoneTimeProps) => {
  const oldJobDone = await JobDoneDAL.getJobDone(props.jobDoneUuid);
  const updatedJobDone: JobDone = new JobDone({
    ...oldJobDone,
    time: props.time,
  });
  await JobDoneDAL.updateJobDone(updatedJobDone);
};