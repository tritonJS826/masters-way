import {JobDone} from "src/model/businessModel/JobDone";
import {JobDoneDTO} from "src/model/DTOModel/JobDoneDTO";

/**
 * Convert {@link JobDoneDTO} to {@link JobDone}
 */
export const jobDoneDTOToJobDoneConverter = (jobDoneDTO: JobDoneDTO): JobDone => {
  return new JobDone(jobDoneDTO);
};
