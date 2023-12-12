import {useNavigate} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useWayPreview} from "src/hooks/useWayPreview";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/DayReportsTable";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Change description of Way
 */
const changeGoalDescription = (wayPreview: WayPreview, description: string) => {
  const newGoalPreview = new GoalPreview({...wayPreview.goal, description});
  GoalPreviewDAL.updateGoalPreview(newGoalPreview);
};

/**
 * Change name of Way
 */
const changeWayName = (wayPreview: WayPreview, name: string) => {
  const newWayPreview = new WayPreview({...wayPreview, name});
  WayPreviewDAL.updateWayPreview(newWayPreview);
};

/**
 * Add mentor to Way
 */
const addMentorToWay = (
  wayPreview: WayPreview,
  setWay: React.Dispatch<React.SetStateAction<WayPreview | null>>,
  userPreview: UserPreview,
) => {
  const mentoringWays = userPreview.mentoringWays.concat(userPreview.uuid);
  const newUserPreview = new UserPreview({...userPreview, mentoringWays});

  UserPreviewDAL.updateUserPreview(newUserPreview);

  const mentors = wayPreview.mentors.concat(newUserPreview);
  const newWayPreview = new WayPreview({...wayPreview, mentors});

  WayPreviewDAL.updateWayPreview(newWayPreview);

  setWay(newWayPreview);
};

/**
 * Add user to Way's mentor requests
 */
const addUserToMentorRequests = (
  wayPreview: WayPreview,
  setWay: React.Dispatch<React.SetStateAction<WayPreview | null>>,
  userPreview: UserPreview) => {

  const mentorRequests = wayPreview.mentorRequests.concat(userPreview);

  const newWayPreview = new WayPreview({...wayPreview, mentorRequests});

  WayPreviewDAL.updateWayPreview(newWayPreview);
  setWay(newWayPreview);
};

/**
 * Remove user from Way's mentor requests
 */
const removeUserFromMentorRequests = (
  wayPreview: WayPreview,
  setWay: React.Dispatch<React.SetStateAction<WayPreview | null>>,
  userPreview: UserPreview) => {

  const mentorRequests = wayPreview.mentorRequests.filter((item) => item !== userPreview);

  const newWayPreview = new WayPreview({...wayPreview, mentorRequests});

  WayPreviewDAL.updateWayPreview(newWayPreview);
  setWay(newWayPreview);
};

/**
 * Render all Way's mentors
 */
const renderMentors = (wayPreview: WayPreview) => {
  return wayPreview.mentors.map((item) => (
    <Link
      key={item.uuid}
      value={item.name}
      path={pages.user.getPath({uuid: item.uuid})}
      className={styles.mentors}
    />
  ));
};

/**
 * Render Way's mentor requests
 */
const renderMentorRequests = (wayPreview: WayPreview, setWay: React.Dispatch<React.SetStateAction<WayPreview | null>>) => {
  return wayPreview.mentorRequests.map((userPreview) => (
    <div key={userPreview.uuid}>
      <Link
        value={userPreview.name}
        path={pages.user.getPath({uuid: userPreview.uuid})}
      />
      <Button
        value='Accept'
        onClick={() => {
          addMentorToWay(wayPreview, setWay, userPreview);
        }}
      />
      <Button
        value='Decline'
        onClick={() => {
          removeUserFromMentorRequests(wayPreview, setWay, userPreview);
        }}
      />
    </div>
  ));
};

/**
 * PageProps
 */
interface WayPageProps {

  /**
   * Page's uuid
   */
  uuid: string;
}

/**
 * Way page
 */
export const WayPage = (props: WayPageProps) => {
  const navigate = useNavigate();

  const {way, setWay, error} = useWayPreview(props.uuid);

  if (error) {
    // Navigate to PageError if transmitted way's uuid doesn't exist
    navigate(pages.page404.getPath({}));
  }

  const {user} = useGlobalContext();

  const isOwner = !!user && !!way && user.uuid === way.owner.uuid;
  const isMentor = !!user && !!way && way.mentors.some((mentor) => mentor.uuid === user.uuid);

  const isUserHasSentMentorRequest = !!user && !!way && way.mentorRequests.some((request) => request.uuid === user.uuid);
  const isEligibleToSendRequest = !!user && !isOwner && !isMentor && !isUserHasSentMentorRequest;

  return (
    <>
      {way &&
      <div className={styles.container}>
        <Title
          level={HeadingLevel.h2}
          text={`${way.name}`}
          onChangeFinish={(name) => changeWayName(way, name)}
          isEditable={isOwner}
        />
        <Title
          level={HeadingLevel.h3}
          text="Goal"
        />
        <EditableTextarea
          text={way.goal.description}
          onChangeFinish={(description) => changeGoalDescription(way, description)}
          rows={5}
          isEditable={isOwner}
        />
        <Title
          level={HeadingLevel.h3}
          text="Way owner:"
        />
        <Link
          value={way.owner.name}
          path={pages.user.getPath({uuid: way.owner.uuid})}
          className={styles.mentors}
        />
        {way && !!way.mentors.length && (
          <>
            <Title
              level={HeadingLevel.h3}
              text="Mentors of this way:"
            />
            {renderMentors(way)}
          </>
        )}
        {isOwner && way && !!way.mentorRequests.length && (
          <>
            <Title
              level={HeadingLevel.h3}
              text="Requests to become mentor of this way:"
            />
            {renderMentorRequests(way, setWay)}
          </>
        )
        }
        {isEligibleToSendRequest && (
          <Button
            value="Apply as Mentor"
            onClick={() => {
              addUserToMentorRequests(way, setWay, user);
            }}
          />
        )
        }
        <ScrollableBlock>
          <DayReportsTable way={way} />
        </ScrollableBlock>
      </div>
      }
    </>
  );
};
