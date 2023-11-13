import {jobDoneToJobDoneDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/jobDoneToJobDoneDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {jobDoneDTOToJobDoneConverter} from "src/dataAccessLogic/DTOToBusinessConverter/jobDoneDTOToJobDoneConverter";
import {JobDone} from "src/model/businessModel/JobDone";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {JobDoneDTOWithoutUuid, JobDoneService} from "src/service/JobDoneService";
import {unicodeSymbols} from "src/utils/unicodeSymbols";

/**
 * JobDone props
 */
interface JobDoneProps {

  /**
   * JobDone element
   */
  jobDone: JobDone;

  /**
   * New description of JobDone.description
   */
  description?: string;

  /**
   * New time of JobDone.time
   */
  time?: number;
}

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
      description: unicodeSymbols.space,
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
  public static async updateJobDone(props: JobDoneProps) {
    if (props.description) {
      props.jobDone.description = props.description;
    } else if (props.time) {
      props.jobDone.time = props.time;
    }

    const jobDoneDTO = jobDoneToJobDoneDTOConverter(props.jobDone);
    await JobDoneService.updateJobDoneDTO(jobDoneDTO, props.jobDone.uuid);
  }

}