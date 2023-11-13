import {createColumnHelper} from "@tanstack/react-table";
import {Link} from "src/component/link/Link";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {renderCellValue} from "src/utils/renderCellValue";

const columnHelper = createColumnHelper<UserPreview>();

/**
 * Table columns
 */
export const columns = [
  columnHelper.accessor<"name", string>("name", {
    header: "Name",

    /**
     * Cell with clickable user name that leads to user page
     */
    cell: ({row}) => (
      <Link
        path={pages.user.path(row.original.uuid)}
        value={row.original.name}
      />
    ),
  }),
  columnHelper.accessor<"email", string>("email", {
    header: "Email",

    /**
     * Cell user email
     */
    cell: ({row}) => (
      renderCellValue(row.original.email)
    ),
  }),
  columnHelper.accessor<"ownWays", string[]>("ownWays", {
    header: "Own Ways",

    /**
     * Cell with user's own ways
     */
    cell: ({row}) => renderCellValue(row.original.ownWays.length.toString()),
  }),
  columnHelper.accessor<"favoriteWays", string[]>("favoriteWays", {
    header: "Favorite Ways",

    /**
     * Cell with user's favorite ways
     */
    cell: ({row}) => renderCellValue(row.original.favoriteWays.length.toString()),
  }),
  columnHelper.accessor<"mentoringWays", string[]>("mentoringWays", {
    header: "Mentoring Ways",

    /**
     * Cell with user's mentoring ways
     */
    cell: ({row}) => renderCellValue(row.original.mentoringWays.length.toString()),
  }),
];