import {JobDone} from "src/model/businessModel/JobDone";
import {JobDoneDTO, JobDoneDTOSchema} from "src/model/DTOModel/JobDoneDTO";

/**
 * Convert {@link JobDone} to {@link JobDoneDTO}
 */
export const jobDoneToJobDoneDTOConverter = (jobDone: JobDone): JobDoneDTO => {

  return JobDoneDTOSchema.parse(jobDone);
};
