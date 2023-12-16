import {writeBatch} from "firebase/firestore";
import {dayReportToDayReportDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/dayReportToDayReportDTOConverter";
import {jobDoneToJobDoneDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/jobDoneToJobDoneDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {jobDoneDTOToJobDoneConverter} from "src/dataAccessLogic/DTOToBusinessConverter/jobDoneDTOToJobDoneConverter";
import {db} from "src/firebase";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {DayReportService} from "src/service/DayReportService";
import {JobDoneDTOWithoutUuid, JobDoneService} from "src/service/JobDoneService";

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
  public static async createJobDone(dayReport: DayReport): Promise<JobDone> {
    const jobDoneWithoutUuid: JobDoneDTOWithoutUuid = {
      description: "",
      time: 0,
      tags: [],
    };

    const newJobDone = await JobDoneService.createJobDoneDTO(jobDoneWithoutUuid);

    const jobDone = jobDoneDTOToJobDoneConverter(newJobDone);
    const updatedJobsDone = [...dayReport.jobsDone, jobDone];
    const dayReportUpdated = {...dayReport, jobsDone: updatedJobsDone};
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
    await JobDoneService.updateJobDoneDTO(jobDoneDTO);
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
    await JobDoneService.updateJobDoneDTO(jobDoneDTO);
  }

  /**
   * Delete JobDone by uuid
   */
  public static async deleteJobDone(jobDoneUuid: string, dayReport: DayReport) {
    const jobDoneUuids = dayReport.jobsDone.map((item) => item.uuid);
    const planForNextPeriodUuids = dayReport.plansForNextPeriod.map((item) => item.uuid);
    const problemForCurrentPeriodUuids = dayReport.problemsForCurrentPeriod.map((item) => item.uuid);
    const commentUuids = dayReport.comments.map((item) => item.uuid);

    const dayReportDTOProps = {
      jobDoneUuids,
      planForNextPeriodUuids,
      problemForCurrentPeriodUuids,
      commentUuids,
    };
    const dayReportDTO = dayReportToDayReportDTOConverter(dayReport, dayReportDTOProps);
    const batch = writeBatch(db);
    JobDoneService.deleteJobDoneDTOWithBatch(jobDoneUuid, batch);
    DayReportService.updateDayReportDTOWithBatch(dayReportDTO, batch);
    await batch.commit();
  }

}
