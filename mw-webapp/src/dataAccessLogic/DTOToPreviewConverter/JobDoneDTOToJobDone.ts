import {SchemasJobDonePopulatedResponse} from "src/apiAutogenerated";
import {JobDone} from "src/model/businessModel/JobDone";
import {Label} from "src/model/businessModel/Label";

/**
 * JobDone converter params
 */
interface JobDoneConverterParams {

  /**
   * JobDone DTO
   */
  jobDoneDTO: SchemasJobDonePopulatedResponse;

  /**
   * Job's way name
   */
  wayName: string;

  /**
   *Job's way uuid
   */
  wayUuid: string;
}

/**
 * Convert {@link JobDoneDTo} to {@link JobDone}
 */
export const JobDoneDTOToJobDone = (params: JobDoneConverterParams): JobDone => {
  return new JobDone({
    ...params.jobDoneDTO,
    createdAt: new Date(params.jobDoneDTO.createdAt),
    updatedAt: new Date(params.jobDoneDTO.updatedAt),
    wayName: params.wayName,
    wayUuid: params.wayUuid,
    tags: params.jobDoneDTO.tags.map(label => new Label(label)),
  });
};
