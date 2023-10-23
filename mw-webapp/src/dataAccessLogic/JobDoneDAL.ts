import {jobDoneToJobDoneDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/jobDoneToJobDoneDTOConverter";
import {jobDoneDTOToJobDoneConverter} from "src/dataAccessLogic/DTOToBusinessConverter/jobDoneDTOToJobDoneConverter";
import {JobDone} from "src/model/businessModel/JobDone";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {JobDoneDTO} from "src/model/DTOModel/JobDoneDTO";
import {JobDoneDTOWithoutUuid, JobDoneService} from "src/service/JobDoneService";

/**
 * Provides methods to interact with the JobDone business model
 */
export class JobDoneDAL {

  /**
   * Get JobsDone
   */
  public static async getJobsDone(): Promise<JobDone[]> {
    const jobsDoneDTO = await JobDoneService.getJobsDoneDTO();
    const jobsDone = jobsDoneDTO.map(jobDoneDTOToJobDoneConverter);

    return jobsDone;
  }

  /**
   * Get JobDone by uuid
   */
  public static async getJobDone(uuid: string): Promise<JobDone> {
    const jobDoneDTO = await JobDoneService.getJobDoneDTO(uuid);
    const jobDone = jobDoneDTOToJobDoneConverter(jobDoneDTO);

    return jobDone;
  }

  /**
   * Create new JobDone
   */
  public static async createNewJobDone(): Promise<JobDoneDTO> {
    const jobDoneWithoutUuid: JobDoneDTOWithoutUuid = {
      description: "",
      time: 0,
      timeUnit: TimeUnit.minute,
    };

    const newJobDone = await JobDoneService.createJobDoneDTO(jobDoneWithoutUuid);

    return newJobDone;
  }

  /**
   * Update jJobDone
   */
  public static async updateJobDone(jobDone: JobDone) {
    const jobDoneDTO = jobDoneToJobDoneDTOConverter(jobDone);
    await JobDoneService.updateJobDoneDTO(jobDoneDTO, jobDone.uuid);
  }

}