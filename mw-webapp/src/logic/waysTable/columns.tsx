import {createColumnHelper} from "@tanstack/react-table";
import {renderCellValue} from "src/logic/waysTable/renderCellValue/renderCellValue";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

const columnHelper = createColumnHelper<WayPreview>();

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
  columnHelper.accessor<"uuid", string>("uuid", {
    // Maybe we should add way's name? Need to think)
    header: "Way's uuid",

    /**
     * Cell with owner's name
     */
    cell: ({row}) => renderCellValue(row.original.uuid),
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
    header: "Owner's name",

    /**
     * Cell with owner's name
     */
    cell: ({row}) => renderCellValue(row.original.owner.name),
  }),
  columnHelper.accessor<"owner", UserPreview>("owner", {
    header: "Owner's email",

    /**
     * Cell with owner's email
     */
    cell: ({row}) => renderCellValue(row.original.owner.email),
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
