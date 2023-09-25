import {JobDone} from "src/model/businessModel/JobDone";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {JobDoneDTO} from "src/model/firebaseCollection/JobDoneDTO";

/**
 * Convert JobDoneDTO to JobDone
 * @param jobDoneDTO: JobDoneDTO
 * @returns JobDone
 */
export const jobDoneDTOToJobDoneConverter = (jobDoneDTO: JobDoneDTO) => {
  return new JobDone({
    ...jobDoneDTO,
    timeUnit: TimeUnit[jobDoneDTO.timeUnit],
    getJobDone: function() {
      return `${this.description} (${this.time} ${this.timeUnit})`;
    },
  });
};