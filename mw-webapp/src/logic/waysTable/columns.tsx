import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {renderCellValue} from "src/logic/waysTable/renderCellValue/renderCellValue";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import styles from "src/logic/waysTable/columns.module.scss";

const columnHelper = createColumnHelper<WayPreview>();

export const WAYS_OWNER = "Way's Owner";

/**
 * Determines which columns will be in the table, the values in the cells and what types of data can be rendered in cells
 * The tanstack table has a bug about typing columns:
 * https://github.com/TanStack/table/issues/4382
 * According to creators should only be using the column helper and not pre-typing columns
 * We can add type as:
 * ColumnDef<WayPreview, string & boolean & GoalPreview & userPreview & UserPreview[]>
 * but it's not recommend by creators
 */
export const columns = [
  columnHelper.accessor<"name", string>("name", {
    header: "Way's name",

    /**
     * Cell with clickable way name that leads to way page
     */
    cell: ({row}) => (
      <Link
        path={`/way/${row.original.uuid}`}
        value={row.original.name}
        className={styles.link}
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
            path={`/user/${row.original.owner.uuid}`}
            value={row.original.owner.name}
            className={styles.link}
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
