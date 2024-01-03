import {useState} from "react";
import {TrashIcon} from "@radix-ui/react-icons";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {displayNotification} from "src/component/notification/Notification";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {columnHelper, getFirstName, WAY_MENTORS, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {v4 as uuidv4} from "uuid";
import styles from "src/logic/waysTable/MentoringWaysTable.module.scss";

/**
 * Removes mentor from Way and returns new User Preview
 */
const removeMentorFromWay = async (userUuid: string, wayPreview: WayPreview) => {
  const userPreview = await UserPreviewDAL.getUserPreview(userUuid);
  const mentoringWays = userPreview.mentoringWays.filter((wayUuid) => wayUuid !== wayPreview.uuid);
  const newUserPreview = new UserPreview({...userPreview, mentoringWays});

  const mentors = wayPreview.mentors.filter((mentor) => mentor.uuid !== userUuid);
  const newWayPreview = new WayPreview({...wayPreview, mentors});

  await Promise.all([
    UserPreviewDAL.updateUserPreview(newUserPreview),
    WayPreviewDAL.updateWayPreview(newWayPreview),
  ]);

  return newUserPreview;
};

/**
 * Mentoring Ways table props
 */
interface MentoringWaysTableProps {

  /**
   * User uuid
   */
  uuid: string;

  /**
   * User's mentoring way uuids
   */
  mentoringWayUuids: string[];

  /**
   * Is current authorized user is owner of current page
   */
  isPageOwner: boolean;
}

/**
 * Render table of mentoring ways preview
 */
export const MentoringWaysTable = (props: MentoringWaysTableProps) => {
  const [mentoringWays, setMentoringWays] = useState<WayPreview[]>([]);

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => Promise.all(props.mentoringWayUuids.map(WayPreviewDAL.getWayPreview));

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = (error: Error) => {
    displayNotification({text: error.message, type: "error"});
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: WayPreview[]) => {
    setMentoringWays(data);
  };

  useLoad(
    {
      loadData,
      onSuccess,
      onError,
      dependency: [props.mentoringWayUuids],
    },
  );

  if (!props.isPageOwner) {
    return (
      <>
        <Title
          text={`Mentoring Ways (total amount: ${mentoringWays.length} ways)`}
          level={HeadingLevel.h2}
        />
        <WaysTable
          data={mentoringWays}
          columns={waysColumns}
        />
      </>
    );
  }

  /**
   * Handles confirm stop mentoring button
   */
  const stopMentoring = async (userUuid: string, wayPreview: WayPreview) => {
    await removeMentorFromWay(userUuid, wayPreview);

    const updatedMentoringWays = mentoringWays.filter((way) => way.uuid !== wayPreview.uuid);
    setMentoringWays(updatedMentoringWays);
  };

  const mentorsColumn = columnHelper.accessor("mentors", {
    header: WAY_MENTORS,

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      return (
        <VerticalContainer>
          {row.original.mentors.map((mentor) => {
            return (
              <HorizontalContainer
                className={styles.horizontalContainer}
                key={uuidv4().concat(mentor.uuid)}
              >
                <Link
                  key={mentor.uuid}
                  path={pages.user.getPath({uuid: mentor.uuid})}
                  value={getFirstName(mentor.name)}
                />
                {/* TODO: think about moving logic about deleted mentoring on Way page */}
                {props.uuid === mentor.uuid && (
                  <TrashIcon
                    className={styles.icon}

                    onClick={() => {

                      /**
                       * CallBack triggered on press ok
                       */
                      const onOk = () => stopMentoring(props.uuid, row.original);

                      // TODO: use modal instead of confirm task #305
                      const isConfirmed = confirm(`Are you sure you want to stop mentoring "${row.original.name}"?`);
                      isConfirmed && onOk();
                    }}
                  />
                )}
              </HorizontalContainer>
            );
          })}
        </VerticalContainer>
      );
    },
  });

  const mentoringWaysTableColumns = waysColumns.map(column => {
    return column.header === WAY_MENTORS ? mentorsColumn : column;
  });

  return (
    <>
      <Title
        text={`Mentoring Ways (total amount: ${mentoringWays.length} ways)`}
        level={HeadingLevel.h2}
      />
      <WaysTable
        data={mentoringWays}
        columns={mentoringWaysTableColumns}
      />
    </>
  );
};
