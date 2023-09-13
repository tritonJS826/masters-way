import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorComment as MentorCommentDTO} from "src/model/firebaseCollection/MentorComment";

export const MentorCommentDTOToMentorCommentConverter = (mentorCommentRaw: MentorCommentDTO) => {

  return new MentorComment({
    ...mentorCommentRaw,
    mentor: mentorCommentRaw.mentorUuid,
  });
};

