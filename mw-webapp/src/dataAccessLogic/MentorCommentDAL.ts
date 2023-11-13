import {mentorCommentToMentorCommentDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/mentorCommentToMentorCommentDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {mentorCommentDTOToMentorCommentConverter}
  from "src/dataAccessLogic/DTOToBusinessConverter/mentorCommentDTOToMentorCommentConverter";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorCommentDTOWithoutUuid, MentorCommentService} from "src/service/MentorCommentService";
import {unicodeSymbols} from "src/utils/unicodeSymbols";

/**
 * MentorComment props
 */
interface MentorCommentProps {

  /**
   * MentorComment element
   */
  mentorComment: MentorComment;

  /**
   * New description of MentorComment.description
   */
  description: string;

}

/**
 * Provides methods to interact with the MentorComment business model
 */
export class MentorCommentDAL {

  /**
   * Get MentorComment by uuid
   */
  public static async getMentorComment(uuid: string): Promise<MentorComment> {
    const mentorCommentDTO = await MentorCommentService.getMentorCommentDTO(uuid);
    const mentorComment = mentorCommentDTOToMentorCommentConverter(mentorCommentDTO);

    return mentorComment;
  }

  /**
   * Create MentorComment
   */
  public static async createMentorComment(dayReportUuid: string): Promise<MentorComment> {
    const mentorCommentWithoutUuid: MentorCommentDTOWithoutUuid = {
      description: unicodeSymbols.space,
      mentorUuid: "",
      isDone: false,
    };

    const newMentorComment = await MentorCommentService.createMentorCommentDTO(mentorCommentWithoutUuid);

    const mentorComment = mentorCommentDTOToMentorCommentConverter(newMentorComment);
    const updatedDayReport = await DayReportDAL.getDayReport(dayReportUuid);
    const updatedMentorComment = [...updatedDayReport.mentorComments, mentorComment];
    const dayReportUpdated = {...updatedDayReport, mentorComments: updatedMentorComment};
    await DayReportDAL.updateDayReport(dayReportUpdated);

    return mentorComment;
  }

  /**
   * Update MentorComment
   */
  public static async updateMentorComment(props: MentorCommentProps) {
    props.mentorComment.description = props.description;
    const mentorCommentDTO = mentorCommentToMentorCommentDTOConverter(props.mentorComment);
    await MentorCommentService.updateMentorCommentDTO(mentorCommentDTO, props.mentorComment.uuid);
  }

}