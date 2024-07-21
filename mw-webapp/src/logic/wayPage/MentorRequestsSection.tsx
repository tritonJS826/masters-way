import {DialogClose} from "@radix-ui/react-dialog";
import {Button} from "src/component/button/Button";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {FromUserMentoringRequestDAL} from "src/dataAccessLogic/FromUserMentoringRequestDAL";
import {MentorUserWayDAL} from "src/dataAccessLogic/MentorUserWayDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/wayPage/MentorRequestsSection.module.scss";

/**
 * Add mentor to Way
 */
const addMentorToWay = async (
  way: Way,
  addUserAsMentor: (user: UserPlain) => void,
  userPreview: UserPlain,
) => {
  addUserAsMentor(userPreview);
  await MentorUserWayDAL.addMentor(userPreview.uuid, way.uuid);
};

/**
 * Remove user from Way's mentor requests
 */
const removeUserFromMentorRequests = async (
  wayUuid: string,
  declineUserAsMentor: (userUuid: string) => void,
  userUuid: string,
) => {
  declineUserAsMentor(userUuid);
  await FromUserMentoringRequestDAL.deleteMentorRequest(userUuid, wayUuid);
};

/**
 * Mentor Requests Section Props
 */
interface MentorRequestsSectionProps {

  /**
   * Way from which mentors should be displayed
   */
  way: Way;

  /**
   * Callback to add user as mentor
   */
  acceptMentorRequest: (user: UserPlain) => void;

  /**
   * Callback to decline mentorRequest
   */
  declineMentorRequest: (userUuid: string) => void;
}

/**
 * Section with requests to become Way mentor
 */
export const MentorRequestsSection = (props: MentorRequestsSectionProps) => {
  const {language} = languageStore;

  return (
    <>
      <Title
        level={HeadingLevel.h3}
        text={LanguageService.way.ComponentMentorRequestsSection.MentorRequestsSection[language]}
        placeholder=""
      />
      <div className={styles.mentorRequestsSection}>
        {props.way.mentorRequests.map((userPreview) => (
          <div
            key={userPreview.uuid}
            className={styles.mentorRequestsItem}
          >
            <Link path={pages.user.getPath({uuid: userPreview.uuid})}>
              {userPreview.name}
            </Link>
            <DialogClose asChild>
              <Button
                value={LanguageService.way.ComponentMentorRequestsSection.ButtonAccept[language]}
                onClick={() => {
                  addMentorToWay(props.way, props.acceptMentorRequest, userPreview);
                }
                }
              />
            </DialogClose>
            <DialogClose asChild>
              <Button
                value={LanguageService.way.ComponentMentorRequestsSection.ButtonDecline[language]}
                onClick={() => removeUserFromMentorRequests(props.way.uuid, props.declineMentorRequest, userPreview.uuid)}
              />
            </DialogClose>
          </div>
        ))}
      </div>
    </>
  );
};
