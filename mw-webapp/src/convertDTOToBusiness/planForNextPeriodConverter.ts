import {querySnapshotToDTOConverter} from "src/convertDTOToBusiness/querySnapshotToDTOConverter";
import {PlanForNextPeriodPreview} from "src/model/businessModelPreview/PlanForNextPeriodPreview";
import {TimeUnit} from "src/model/businessModelPreview/time/timeUnit/TimeUnit";
import {PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriodDTO";
import {querySnapshot} from "src/model/querySnapshot";

export const planForNextPeriodDTOToPlanForNextPeriodPreviewConverter = (plansForNextPeriodRaw: querySnapshot) => {
  const plansForNextPeriodDTO: PlanForNextPeriodDTO[] = querySnapshotToDTOConverter<PlanForNextPeriodDTO>(plansForNextPeriodRaw);
  const plansForNextPeriodPreview = plansForNextPeriodDTO.map((planForNextPeriodDTO) => {
    return new PlanForNextPeriodPreview({
      ...planForNextPeriodDTO,
      timeUnit: TimeUnit[planForNextPeriodDTO.timeUnit],
      getPlanForNextPeriod() {
        return `${this.job} (${this.estimationTime} ${this.timeUnit})`;
      },
    });
  });
  return plansForNextPeriodPreview;
};

