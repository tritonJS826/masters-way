import {Button} from "src/component/button/Button";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";

/**
 * Add mentor to Way
 */
const addMentorToWay = (
  way: Way,
  setWay: (newWay: Way) => void,
  userPreview: UserPreview,
) => {
  const mentoringWays = userPreview.mentoringWays.concat(way.uuid);
  const newUserPreview = new UserPreview({...userPreview, mentoringWays});

  UserPreviewDAL.updateUserPreview(newUserPreview);

  const mentors = way.mentors.set(newUserPreview.uuid, newUserPreview);
  const mentorRequests = way.mentorRequests.filter((item) => item !== userPreview);
  way.formerMentors.delete(userPreview.uuid);
  const formerMentors = new Map(Array.from(way.formerMentors)
    .filter(([formerMentorUuid]) => formerMentorUuid !== userPreview.uuid));

  const newWay = new Way({...way, mentors, mentorRequests, formerMentors});

  WayDAL.updateWay(newWay);

  setWay(newWay);
};

/**
 * Remove user from Way's mentor requests
 */
const removeUserFromMentorRequests = (
  way: Way,
  setWay: (newWay: Way) => void,
  userPreview: UserPreview) => {

  const mentorRequests = way.mentorRequests.filter((item) => item !== userPreview);

  const newWay = new Way({...way, mentorRequests});

  WayDAL.updateWay(newWay);
  setWay(newWay);
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
   * Function to set updated Way
   */
  setWay: (newWay: Way) => void;
}

/**
 * Section with requests to become Way mentor
 */
export const MentorRequestsSection = (props: MentorRequestsSectionProps) => {
  return (
    <>
      <Title
        level={HeadingLevel.h3}
        text="Mentors of this way:"
      />
      {props.way.mentorRequests.map((userPreview) => (
        <div key={userPreview.uuid}>
          <Link
            value={userPreview.name}
            path={pages.user.getPath({uuid: userPreview.uuid})}
          />
          <Button
            value='Accept'
            onClick={() =>
              addMentorToWay(props.way, props.setWay, userPreview)
            }
          />
          <Button
            value='Decline'
            onClick={() =>
              removeUserFromMentorRequests(props.way, props.setWay, userPreview)
            }
          />
        </div>
      ))}
    </>
  );
};
