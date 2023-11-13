import {jobDoneToJobDoneDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/jobDoneToJobDoneDTOConverter";
import {jobDoneDTOToJobDoneConverter} from "src/dataAccessLogic/DTOToBusinessConverter/jobDoneDTOToJobDoneConverter";
import {JobDone} from "src/model/businessModel/JobDone";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {JobDoneDTOWithoutUuid, JobDoneService} from "src/service/JobDoneService";
import {unicodeSymbols} from "src/utils/unicodeSymbols";

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
  public static async createJobDone(): Promise<JobDone> {
    const jobDoneWithoutUuid: JobDoneDTOWithoutUuid = {
      description: unicodeSymbols.space,
      time: 0,
      timeUnit: TimeUnit.minute,
    };

    const newJobDone = await JobDoneService.createJobDoneDTO(jobDoneWithoutUuid);

    const jobDone = jobDoneDTOToJobDoneConverter(newJobDone);

    return jobDone;
  }

  /**
   * Update jJobDone
   */
  public static async updateJobDone(jobDone: JobDone) {
    const jobDoneDTO = jobDoneToJobDoneDTOConverter(jobDone);
    await JobDoneService.updateJobDoneDTO(jobDoneDTO, jobDone.uuid);
  }

}