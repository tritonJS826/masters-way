import {MentorComment} from "src/model/businessModel/MentorComment";
import {User} from "src/model/businessModel/User";
import {MentorCommentDTO} from "src/model/firebaseCollection/MentorCommentDTO";
import {UserDTO} from "src/model/firebaseCollection/UserDTO";

export const MentorCommentDTOToMentorCommentConverter = (mentorComment: MentorCommentDTO, usersDTO: UserDTO[]) => {
  const matchingUser = usersDTO.find(user => user.uuid === mentorComment.mentorUuid);

  if (!matchingUser) {
    throw new Error(`User not found for uuid: ${mentorComment.mentorUuid}`);
  }

  const user = new User(
    {
      uuid: matchingUser.uuid,
      email: matchingUser.email,
      name: matchingUser.name,
      ownWays: [],
      mentoringWays: [],
      favoriteWays: [],
    },
  );

  return new MentorComment(
    {
      uuid: mentorComment.uuid,
      mentor: user,
      description: mentorComment.description,
      isDone: mentorComment.isDone,
    },
  );
};
