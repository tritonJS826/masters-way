import {querySnapshot} from "src/converter/querySnapshot";
import {JobDone} from "src/model/businessModel/JobDone";
import {JobDone as JobDoneDTO} from "src/model/firebaseCollection/JobDone";

export const querySnapshotToJobDoneDTOConverter = (jobsDoneRaw: querySnapshot) => {
  const jobsDoneDTO: JobDoneDTO[] = jobsDoneRaw.docs.map((jobDoneRaw) => ({
    uuid: jobDoneRaw.data().uuid,
    description: jobDoneRaw.data().description,
    timeUnit: jobDoneRaw.data().timeUnit,
    time: jobDoneRaw.data().time,
  }));
  return jobsDoneDTO;
};

export const jobDoneDTOToJobDoneConverter = (jobDoneRaw: JobDoneDTO) => {
  return new JobDone({
    ...jobDoneRaw,
    getJobDone() {
      return `${this.description} (${this.time} ${this.timeUnit})`;
    },
  });
};

