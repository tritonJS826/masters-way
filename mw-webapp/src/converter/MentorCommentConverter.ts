import {MentorComment} from "src/model/businessModel/MentorComment";
// import {User} from "src/model/businessModel/User";
import {MentorComment as MentorCommentDTO} from "src/model/firebaseCollection/MentorComment";
// import {UserService} from "src/service/UserService";

// const usersRaw = await UserService.onValueFromRealTimeDb();

export const MentorCommentDTOToMentorCommentConverter = (mentorCommentRaw: MentorCommentDTO) => {
  // const user: User = usersRaw.find((elem) => elem.uuid === mentorCommentRaw.mentorUuid) || usersRaw[0];

  return new MentorComment({
    ...mentorCommentRaw,
    mentor: mentorCommentRaw.mentorUuid,
  });
};

