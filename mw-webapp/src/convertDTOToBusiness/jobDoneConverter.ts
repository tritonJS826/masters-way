import {querySnapshotToDTOConverter} from "src/convertDTOToBusiness/querySnapshotToDTOConverter";
import {JobDonePreview} from "src/model/businessModelPreview/JobDonePreview";
import {TimeUnit} from "src/model/businessModelPreview/time/timeUnit/TimeUnit";
import {JobDoneDTO} from "src/model/firebaseCollection/JobDoneDTO";
import {querySnapshot} from "src/model/querySnapshot";

export const jobDoneDTOToJobDonePreviewConverter = (jobsDoneRaw: querySnapshot) => {
  const jobsDoneDTO: JobDoneDTO[] = querySnapshotToDTOConverter<JobDoneDTO>(jobsDoneRaw);
  const jobsDonePreview: JobDonePreview[] = jobsDoneDTO.map((jobDoneDTO) => {
    return new JobDonePreview({
      ...jobDoneDTO,
      timeUnit: TimeUnit[jobDoneDTO.timeUnit],
      getJobDone() {
        return `${this.description} (${this.time} ${this.timeUnit})`;
      },
    });
  });

  return jobsDonePreview;
};

