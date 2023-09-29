import {MentorComment} from "src/model/businessModel/MentorComment";
import {User} from "src/model/businessModel/User";
import {MentorCommentDTO} from "src/model/firebaseCollection/MentorCommentDTO";
import {UserDTO} from "src/model/firebaseCollection/UserDTO";


/**
 * Convert {@link MentorCommentDTO} to {@link MentorComment}
 * @param {MentorCommentDTO} mentorCommentDTO {@link MentorCommentDTO}
 * @param {UserDTO[]} usersDTO - {@link UserDTO}
 * @returns {MentorComment} mentorComment {@link MentorComment}
 */
export const MentorCommentDTOToMentorCommentConverter = (
  mentorCommentDTO: MentorCommentDTO, usersDTO: UserDTO[],
): MentorComment => {
  const matchingUser = usersDTO.find(user => user.uuid === mentorCommentDTO.mentorUuid);

  if (!matchingUser) {
    throw new Error(`User not found for uuid: ${mentorCommentDTO.mentorUuid}`);
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
      uuid: mentorCommentDTO.uuid,
      mentor: user,
      description: mentorCommentDTO.description,
      isDone: mentorCommentDTO.isDone,
    },
  );
};
