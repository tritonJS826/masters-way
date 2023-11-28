import {JobDone} from "src/model/businessModel/JobDone";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {JobDoneDTO, JobDoneDTOSchema} from "src/model/DTOModel/JobDoneDTO";

/**
 * Convert {@link JobDone} to {@link JobDoneDTO}
 */
export const jobDoneToJobDoneDTOConverter = (jobDone: JobDone): JobDoneDTO => {
  const validatedJobDoneDTO = JobDoneDTOSchema.parse({
    ...jobDone,
    timeUnit: TimeUnit[jobDone.timeUnit],
  });

  return validatedJobDoneDTO;
};