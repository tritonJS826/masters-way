import {useEffect, useState} from "react";
import {TrashIcon} from "@radix-ui/react-icons";
import {Link} from "src/component/link/Link";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columnHelper, WAY_MENTORS, waysColumns} from "src/logic/waysTable/waysColumns";
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
   * Is current authorized user is owner of current page
   */
  isPageOwner: boolean;

  /**
   * Function to change user preview
   */
  handleUserPreviewChange: (userPreview: UserPreview) => void;
}

/**
 * Render table of mentoring ways preview
 */
export const MentoringWaysTable = (props: MentoringWaysTableProps) => {
  const [mentoringWays, setMentoringWays] = useState<WayPreview[]>([]);

  /**
   * Load User mentoring ways
   */
  const loadMentoringWays = async () => {
    const data = await WayPreviewDAL.getUserWaysPreview(props.uuid, "Mentoring");
    setMentoringWays(data);
  };

  useEffect(() => {
    loadMentoringWays();
  }, [props.uuid]);

  if (!props.isPageOwner) {
    return (
      <WaysTable
        data={mentoringWays}
        columns={waysColumns}
      />
    );
  }

  /**
   * Handles confirm stop mentoring button
   */
  const stopMentoring = async (userUuid: string, wayPreview: WayPreview) => {
    const newUserPreview = await removeMentorFromWay(userUuid, wayPreview);

    const updatedMentoringWays = mentoringWays.filter((way) => way.uuid !== wayPreview.uuid);
    setMentoringWays(updatedMentoringWays);

    props.handleUserPreviewChange(newUserPreview);
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
              <div key={uuidv4().concat(mentor.uuid)}>
                <Link
                  key={mentor.uuid}
                  path={pages.user.getPath({uuid: mentor.uuid})}
                  value={mentor.name}
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
              </div>
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
    <WaysTable
      data={mentoringWays}
      columns={mentoringWaysTableColumns}
    />
  );
};
