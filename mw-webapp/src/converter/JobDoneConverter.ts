import {JobDone} from "src/model/businessModel/JobDone";
import {JobDone as JobDoneDTO} from "src/model/firebaseCollection/JobDone";

export const JobDoneDTOToJobDoneConverter = (jobDoneRaw: JobDoneDTO) => {
  return new JobDone({
    ...jobDoneRaw,
    getJobDone() {
      return `${this.description} (${this.time} ${this.timeUnit})`;
    },
  });
};

