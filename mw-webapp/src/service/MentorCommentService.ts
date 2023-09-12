import {ref, get} from "firebase/database";
import {MentorCommentDTOToMentorCommentConverter} from "src/converter/MentorCommentConverter";
import {db} from "src/firebase";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorComment as MentorCommentDTO} from "src/model/firebaseCollection/MentorComment";

export class MentorCommentService {

  public static async onValueFromRealTimeDb(): Promise<MentorComment[]> {
    const snapshot = await get(ref(db, "/mentorComments"));
    const mentorCommentsRaw: MentorCommentDTO[] = await snapshot.val();
    const mentorComments: MentorComment[] = mentorCommentsRaw.map((item) => MentorCommentDTOToMentorCommentConverter(item));
    return mentorComments;
  }

}