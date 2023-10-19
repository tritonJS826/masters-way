import {Link} from "react-router-dom";
import {CellContext, createColumnHelper} from "@tanstack/react-table";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

const columnHelper = createColumnHelper<WayPreview>();

/**
 * Render string inside cell
 */
const renderCell = (cellValue: string): JSX.Element => {
  return (
    <div>
      {cellValue}
    </div>
  );
};

/**
 * Render link inside cell
 */
const renderLinkInCell = (cellValue: CellContext<WayPreview, string>) => {
  return (
    <Link to={cellValue.getValue()}>
      Way Page
    </Link>
  );
};

/**
 * Render Way status
 */
const renderStatusInCell = (cellValue: CellContext<WayPreview, boolean>) => {
  return (
    <div>
      {cellValue.getValue() ? "Completed" : "Ongoing"}
    </div>
  );
};

/**
 * Columns of the table
 */
export const columns = [
  columnHelper.accessor<"uuid", string>("uuid", {
    header: "Way Uuid",

    /**
     * Cell with way uuid
     */
    cell: (uuid) => renderCell(uuid.getValue()),
  }),
  columnHelper.accessor<"uuid", string>("uuid", {
    header: "Link to Way",

    /**
     * Cell with link to way page
     */
    cell: (uuid) => renderLinkInCell(uuid),
  }),
  columnHelper.accessor<"currentMentors", UserPreview[]>("currentMentors", {
    header: "Current mentors",

    /**
     * Cell with current mentors
     */
    cell: ({row}) => {
      row.original.currentMentors.map((currentMentor) => {
        renderCell(currentMentor.name);
      });
    },
  }),
  columnHelper.accessor<"isCompleted", boolean>("isCompleted", {
    header: "Status",

    /**
     * Cell with Way status
     */
    cell: (isCompleted) => renderStatusInCell(isCompleted),
  }),
];

columns.push(columnHelper.accessor<"isCompleted", boolean>("isCompleted", {
  header: "Status",

  /**
   * Cell with Way status
   */
  cell: (isCompleted) => renderStatusInCell(isCompleted),
}));