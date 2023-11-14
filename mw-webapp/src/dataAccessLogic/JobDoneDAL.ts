import {jobDoneToJobDoneDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/jobDoneToJobDoneDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {jobDoneDTOToJobDoneConverter} from "src/dataAccessLogic/DTOToBusinessConverter/jobDoneDTOToJobDoneConverter";
import {JobDone} from "src/model/businessModel/JobDone";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {JobDoneDTOWithoutUuid, JobDoneService} from "src/service/JobDoneService";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";

/**
 * Provides methods to interact with the JobDone business model
 */
export class JobDoneDAL {

  /**
   * Get JobDone by uuid
   */
  public static async getJobDone(uuid: string): Promise<JobDone> {
    const jobDoneDTO = await JobDoneService.getJobDoneDTO(uuid);
    const jobDone = jobDoneDTOToJobDoneConverter(jobDoneDTO);

    return jobDone;
  }

  /**
   * Create JobDone
   */
  public static async createJobDone(dayReportUuid: string): Promise<JobDone> {
    const jobDoneWithoutUuid: JobDoneDTOWithoutUuid = {
      description: UnicodeSymbols.ZERO_WIDTH_SPACE,
      time: 0,
      timeUnit: TimeUnit.minute,
    };

    const newJobDone = await JobDoneService.createJobDoneDTO(jobDoneWithoutUuid);

    const jobDone = jobDoneDTOToJobDoneConverter(newJobDone);
    const updatedDayReport = await DayReportDAL.getDayReport(dayReportUuid);
    const updatedJobsDone = [...updatedDayReport.jobsDone, jobDone];
    const dayReportUpdated = {...updatedDayReport, jobsDone: updatedJobsDone};
    await DayReportDAL.updateDayReport(dayReportUpdated);

    return jobDone;
  }

  /**
   * Update jJobDone
   */
  public static async updateJobDone(jobDone: JobDone, description: string) {
    const updatedJobDone = new JobDone({
      ...jobDone,
      description,
    });
    const jobDoneDTO = jobDoneToJobDoneDTOConverter(updatedJobDone);
    await JobDoneService.updateJobDoneDTO(jobDoneDTO, jobDone.uuid);
  }

  /**
   * Update JobDoneTime
   */
  public static async updateJobDoneTime(jobDone: JobDone, time: number) {
    const updatedJobDone = new JobDone({
      ...jobDone,
      time,
    });
    const jobDoneDTO = jobDoneToJobDoneDTOConverter(updatedJobDone);
    await JobDoneService.updateJobDoneDTO(jobDoneDTO, jobDone.uuid);
  }

}