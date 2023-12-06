import React from "react";
import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {renderMarkdown} from "src/utils/textUtils/renderMarkdown";
import style from "src/logic/waysTable/columns.module.scss";

const columnHelper = createColumnHelper<WayPreview>();

export const WAYS_OWNER = "Way's Owner";

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
    header: "Is completed?",

    /**
     * Cell with isCompleted value
     */
    cell: (cellValue) => (
      <>
        {`${cellValue.getValue()}`}
      </>
    ),
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
  columnHelper.accessor("currentMentors", {
    header: "Current mentors",

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      return (
        row.original.currentMentors.map((currentMentor) => (
          <Link
            key={currentMentor.uuid}
            path={pages.user.getPath({uuid: row.original.uuid})}
            value={currentMentor.name}
          />
        ))
      );
    },
  }),
];
