import {JobDoneDTO} from "src/model/firebaseCollection/JobDoneDTO";
import {JobDoneService} from "src/service/JobDoneService";

export const updateJobDone = async (text: string, uuid: string) => {
  const oldJobDone = await JobDoneService.getJobDoneDTO(uuid);
  // eslint-disable-next-line no-console
  console.log(uuid);
  const time = Number(/\d+/.exec(text)) ?? 0;
  const updatedJobDone: JobDoneDTO = {
    ...oldJobDone,
    description: text.replace(/\d/g, ""),
    time: time,
  };
  await JobDoneService.updateJobDoneDTO(updatedJobDone, uuid);
};