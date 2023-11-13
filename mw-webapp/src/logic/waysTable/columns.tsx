import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {renderCellValue} from "src/utils/renderCellValue";

const columnHelper = createColumnHelper<WayPreview>();

export const WAYS_OWNER = "Way's Owner";

/**
 * Table columns
 */
export const columns = [
  columnHelper.accessor<"name", string>("name", {
    header: "Way's name",

    /**
     * Cell with clickable way name that leads to way page
     */
    cell: ({row}) => (
      <Link
        path={pages.way.path(row.original.uuid)}
        value={row.original.name}
      />
    ),
  }),
  columnHelper.accessor<"isCompleted", boolean>("isCompleted", {
    header: "Is completed?",

    /**
     * Cell with isCompleted value
     */
    cell: (cellValue) => renderCellValue(`${cellValue.getValue()}`),
  }),
  columnHelper.accessor<"goal", GoalPreview>("goal", {
    header: "Goal",

    /**
     * Cell with isCompleted value
     */
    cell: ({row}) => renderCellValue(row.original.goal.description),
  }),
  columnHelper.accessor<"owner", UserPreview>("owner", {
    header: WAYS_OWNER,

    /**
     * Cell with way's owner
     */
    cell: ({row}) => {
      return (
        <>
          <Link
            path={pages.user.path(row.original.owner.uuid)}
            value={row.original.owner.name}
          />
          {renderCellValue(row.original.owner.email)}
        </>
      );
    },
  }),
  columnHelper.accessor<"currentMentors", UserPreview[]>("currentMentors", {
    header: "Current mentors",

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      return (
        row.original.currentMentors.map((currentMentor) => renderCellValue(currentMentor.name))
      );
    },
  }),
];
