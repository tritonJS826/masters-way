import {SchemasDayReportPopulatedResponse} from "src/apiAutogenerated";
import {DayReport} from "src/model/businessModel/DayReport";
import {Plan} from "src/model/businessModel/Plan";

/**
 * Convert {@link DayReportDTO} to {@link DayReport}
 */
export const DayReportDTOToDayReport = (dayReportDTO: SchemasDayReportPopulatedResponse): DayReport => {
  const plans = dayReportDTO.plans.map((plan) => {

    const planUpdatedAt = new Date(plan.updatedAt);
    const planCreatedAt = new Date(plan.createdAt);

    return new Plan({
      ...plan,
      updatedAt: planUpdatedAt,
      createdAt: planCreatedAt,
    });
  });

  return new DayReport({
    ...dayReportDTO,
    createdAt: new Date(dayReportDTO.createdAt),
    updatedAt: new Date(dayReportDTO.updatedAt),
    plans,
  });
};