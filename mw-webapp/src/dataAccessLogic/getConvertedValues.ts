import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReportDTO} from "src/model/DTOModel/DayReportDTO";

/**
 * DayReport props used into converter
 */
export interface DayReportConverterProps {

  /**
   * Jobs done
   */
  jobDoneUuids: JobDone[];

  /**
   * Plans for next period
   */
  planForNextPeriodUuids: PlanForNextPeriod[];

  /**
   * Problems for current period
   */
  problemForCurrentPeriodUuids: CurrentProblem[];

  /**
   * Mentor comments
   */
  mentorCommentUuids: MentorComment[];
}

/**
 * Elements uuid in arrays for generic function {@link getConvertedValues}
 */
interface UuidProps {

  /**
   * Uuid of element in {@link DayReportConverterProps}
   */
  uuid: string;
}

/**
 * Get converted values for DayReport's properties
 */
export const getConvertedValues = <T extends UuidProps>(
  allDayReportsDTO: DayReportDTO[],
  dayReportDTOProperty: keyof DayReportConverterProps,
  propertyPreview: T[]): T[][] => {
  const dayReportProperty = allDayReportsDTO.map((dayReportDTO) => {
    const dayReportDTOPropertyConverted = dayReportDTO[`${dayReportDTOProperty}`].map((uuid: string) => {
      const dayReportPropertyConverted = propertyPreview
      //TODO: task #114 Use hashmap instead of .find
        .find((elem) => elem.uuid === uuid);
      if (!dayReportPropertyConverted) {
        throw new Error(`${dayReportPropertyConverted} was not found`);
      }

      return dayReportPropertyConverted;
    });

    return dayReportDTOPropertyConverted;
  });

  return dayReportProperty;
};

/**
 * Get converted values for DayReport's properties
 */
export const getConvertedValue = <T extends UuidProps>(
  dayReportDTO: DayReportDTO,
  dayReportDTOProperty: keyof DayReportConverterProps,
  propertyPreview: T[]): T[] => {
  const dayReportDTOPropertyConverted = dayReportDTO[`${dayReportDTOProperty}`].map((uuid: string) => {
    const dayReportPropertyConverted = propertyPreview
    //TODO: task #114 Use hashmap instead of .find
      .find((elem) => elem.uuid === uuid);
    if (!dayReportPropertyConverted) {
      throw new Error(`${dayReportPropertyConverted} was not found`);
    }

    return dayReportPropertyConverted;
  });

  return dayReportDTOPropertyConverted;
};
