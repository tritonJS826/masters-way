import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {JobDone} from "src/model/businessModel/JobDone";

/**
 * JobDone props
 */
interface JobDoneProps {

  /**
   * Description of JobDone
   */
  description: string;

  /**
   * JobDone UUID
   */
  jobDoneUuid: string;
}

/**
 * Update JobDone
 */
export const updateJobDone = async (props: JobDoneProps) => {
  const oldJobDone = await JobDoneDAL.getJobDone(props.jobDoneUuid);
  const updatedJobDone: JobDone = new JobDone({
    ...oldJobDone,
    description: props.description,
  });
  await JobDoneDAL.updateJobDone(updatedJobDone);
};