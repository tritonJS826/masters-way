import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {getWayStatus} from "src/logic/waysTable/wayStatus";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import style from "src/logic/waysTable/columns.module.scss";

export const columnHelper = createColumnHelper<WayPreview>();

export const WAYS_OWNER = "Way's Owner";
export const WAY_MENTORS = "Mentors";

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const waysColumns = [
  columnHelper.accessor("name", {
    header: "Way's name",

    /**
     * Cell with clickable way name that leads to way page
     */
    cell: ({row}) => (
      <span className={style.shortCell}>
        <Link
          path={pages.way.getPath({uuid: row.original.uuid})}
          value={row.original.name}
        />
      </span>
    ),
  }),
  columnHelper.accessor("isCompleted", {
    header: "Status",

    /**
     * Cell with isCompleted value
     */
    cell: ({row}) => {
      const wayStatus = getWayStatus({
        isCompleted: row.original.isCompleted,
        lastUpdate: row.original.lastUpdate,
      });

      return (
        <Tooltip content="The path is abandoned if it is not completed, but has not been edited in the last 14 days">
          {wayStatus}
        </Tooltip>
      );
    },
  }),
  columnHelper.accessor("goal", {
    header: "Goal",

    /**
     * Cell with Goal
     */
    cell: ({row}) => {
      return (
        <span className={style.shortCell}>
          {renderMarkdown(row.original.goal.description)}
        </span>
      );
    },
  }),
  columnHelper.accessor("owner", {
    header: WAYS_OWNER,

    /**
     * Cell with way's owner
     */
    cell: ({row}) => {
      return (
        <VerticalContainer>
          <Link
            path={pages.user.getPath({uuid: row.original.owner.uuid})}
            value={row.original.owner.name}
          />
          {row.original.owner.email}
        </VerticalContainer>
      );
    },
  }),
  columnHelper.accessor("mentors", {
    header: WAY_MENTORS,

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      return (
        <VerticalContainer>
          {row.original.mentors.map((mentor) => (
            <Link
              key={mentor.uuid}
              path={pages.user.getPath({uuid: mentor.uuid})}
              value={mentor.name}
            />
          ))}
        </VerticalContainer>
      );
    },
  }),
];
