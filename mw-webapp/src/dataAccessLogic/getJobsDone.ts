import {jobDoneDTOToJobDoneConverter} from "src/dataAccessLogic/DTOToBusinessConverter/jobDoneDTOToJobDoneConverter";
import {JobDone} from "src/model/businessModel/JobDone";
import {JobDoneService} from "src/service/JobDoneService";

/**
 * Jobs done
 * @returns {Promise<JobDone[]>}
 */
export const getJobsDone = async (): Promise<JobDone[]> => {
  const jobsDoneDTO = await JobDoneService.getJobsDoneDTO();
  const jobsDone = jobsDoneDTO.map(jobDoneDTOToJobDoneConverter);

  return jobsDone;
};