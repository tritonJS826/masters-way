import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import style from "src/logic/waysTable/columns.module.scss";

const columnHelper = createColumnHelper<WayPreview>();

export const WAYS_OWNER = "Way's Owner";

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const columns = [
  columnHelper.accessor("name", {
    header: "Way's name",

    /**
     * Cell with clickable way name that leads to way page
     */
    cell: ({row}) => (
      <Link
        path={pages.way.getPath({uuid: row.original.uuid})}
        value={row.original.name}
      />
    ),
  }),
  columnHelper.accessor("isCompleted", {
    header: "Is completed?",

    /**
     * Cell with isCompleted value
     */
    cell: (cellValue) => (
      <div>
        {`${cellValue.getValue()}`}
      </div>
    ),
  }),
  columnHelper.accessor("goal", {
    header: "Goal",

    /**
     * Cell with Goal
     */
    cell: ({row}) => (
      <span className={style.goalDescription}>
        {row.original.goal.description}
      </span>
    ),
  }),
  columnHelper.accessor("owner", {
    header: WAYS_OWNER,

    /**
     * Cell with way's owner
     */
    cell: ({row}) => {
      return (
        <>
          <Link
            path={pages.user.getPath({uuid: row.original.owner.uuid})}
            value={row.original.owner.name}
          />
          <div>
            {row.original.owner.email}
          </div>
        </>
      );
    },
  }),
  columnHelper.accessor("currentMentors", {
    header: "Current mentors",

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      return (
        row.original.currentMentors.map((currentMentor) => (
          <div key={currentMentor.uuid}>
            {currentMentor.name}
          </div>
        ))
      );
    },
  }),
];
