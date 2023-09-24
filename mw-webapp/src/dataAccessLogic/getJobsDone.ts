import {jobDoneDTOToJobDoneConverter} from "src/dataAccessLogic/DTOToBusinessConverter/jobDoneDTOToJobDoneConverter";
import {JobDoneService} from "src/service/JobDoneService";

export const getJobsDone = async () => {
  const jobsDoneDTO = await JobDoneService.getJobsDone();
  const jobsDone = jobsDoneDTO.map(jobDoneDTOToJobDoneConverter);
  return jobsDone;
};