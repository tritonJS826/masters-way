import {jobDoneToJobDoneDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/jobDoneDTOToJobDoneConverter";
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

/**
 * Job done
 * @returns {Promise<JobDone>}
 */
export const getJobDone = async (uuid: string): Promise<JobDone> => {
  const jobDoneDTO = await JobDoneService.getJobDoneDTO(uuid);
  const jobDone = jobDoneDTOToJobDoneConverter(jobDoneDTO);
  return jobDone;
};

/**
 * Update job done
 * @param {JobDone} jobDone
 */
export const updatesJobDone = async (jobDone: JobDone) => {
  const jobDoneDTO = jobDoneToJobDoneDTOConverter(jobDone);
  await JobDoneService.updateJobDoneDTO(jobDoneDTO, jobDone.uuid);
};