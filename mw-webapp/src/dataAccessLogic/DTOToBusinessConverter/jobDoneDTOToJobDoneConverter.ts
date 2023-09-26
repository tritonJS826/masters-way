import {JobDone} from "src/model/businessModel/JobDone";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {JobDoneDTO} from "src/model/firebaseCollection/JobDoneDTO";

/**
 * Convert JobDoneDTO to JobDone
 * @param {JobDoneDTO} jobDoneDTO
 * @returns {JobDone}
 */
export const jobDoneDTOToJobDoneConverter = (jobDoneDTO: JobDoneDTO): JobDone => {
  return new JobDone({
    ...jobDoneDTO,
    timeUnit: TimeUnit[jobDoneDTO.timeUnit],
  });
};