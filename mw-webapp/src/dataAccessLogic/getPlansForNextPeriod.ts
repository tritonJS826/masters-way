import {planForNextPeriodToPlanForNextPeriodDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/planForNextPeriodToPlanForNextPeriodDTOConverter";
import {planForNextPeriodDTOToPlanForNextPeriodConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/planForNextPeriodDTOToPlanForNextPeriodConverter";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";

/**
 * Plans for next period
 * @returns {Promise<PlanForNextPeriod[]>}
 */
export const getPlansForNextPeriod = async (): Promise<PlanForNextPeriod[]> => {
  const plansForNextPeriodDTO = await PlanForNextPeriodService.getPlansForNextPeriodDTO();
  const plansForNextPeriod = plansForNextPeriodDTO.map(planForNextPeriodDTOToPlanForNextPeriodConverter);

  return plansForNextPeriod;
};

/**
 * Plan for next period
 * @returns {Promise<PlanForNextPeriod>}
 */
export const getPlanForNextPeriod = async (uuid: string): Promise<PlanForNextPeriod> => {
  const PlaForNextPeriodDTO = await PlanForNextPeriodService.getPlanForNextPeriodDTO(uuid);
  const planForNextPeriod = planForNextPeriodDTOToPlanForNextPeriodConverter(PlaForNextPeriodDTO);
  return planForNextPeriod;
};

/**
 * Plans for next period
 * @param {PlanForNextPeriod} planForNextPeriod
 */
export const updatesPlanForNextPeriod = async (planForNextPeriod: PlanForNextPeriod) => {
  const planForNextPeriodDTO = planForNextPeriodToPlanForNextPeriodDTOConverter(planForNextPeriod);
  await PlanForNextPeriodService.updatePLanForNextPeriodDTO(planForNextPeriodDTO, planForNextPeriod.uuid);
};