import {JobDone} from "src/model/businessModel/JobDone";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {JobDoneDTO} from "src/model/DTOModel/JobDoneDTO";

/**
 * Convert {@link JobDoneDTO} to {@link JobDone}
 */
export const jobDoneDTOToJobDoneConverter = (jobDoneDTO: JobDoneDTO): JobDone => {
  return new JobDone({
    ...jobDoneDTO,
    timeUnit: TimeUnit[jobDoneDTO.timeUnit],
  });
};