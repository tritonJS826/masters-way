import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {render, screen, within} from "@testing-library/react";
import {Table} from "src/component/table/Table";

/**
 * Data test interface
 */
interface DataTest {

  /**
   * Data test UUID
   */
  uuid: string;

  /**
   * Data test name
   */
  name: string;

  /**
   * Data test amount
   */
  amount: number;
}

const columnHelper = createColumnHelper<DataTest>();

const data = [
  {
    uuid: "1",
    name: "Name 1",
    amount: 8,
  },
  {
    uuid: "2",
    name: "Name 2",
    amount: 3,
  },
];

const columns = [
  columnHelper.accessor("name", {
    header: "Name",

    /**
     * Cell with clickable username that leads to user page
     */
    cell: ({row}) => row.original.name,
  }),
  columnHelper.accessor("amount", {
    header: "Amount",

    /**
     * Cell with clickable username that leads to user page
     */
    cell: ({row}) => row.original.amount,
  }),
];

const TABLE_CY = "table";

/**
 * Table test
 */
const TableTest = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroup = table.getHeaderGroups();
  const rowModel = table.getRowModel();

  return (
    <Table
      data={{headerGroup, rowModel}}
      dataCy={{dataCyTable: TABLE_CY}}
    />
  );
};

describe("Table component", () => {
  it("should render thead and tbody", () => {
    render(<TableTest />);
    expect(screen.getByRole("table").querySelector("thead")).toBeInTheDocument();
    expect(screen.getByRole("table").querySelector("tbody")).toBeInTheDocument();
  });

  it("table headers should be rendered correctly", () => {
    render(<TableTest />);
    const table = screen.getByRole("table");
    const headers = within(table).getAllByRole("columnheader");
    expect(headers.length).toBe(columns.length);
  });

  it("table rows and cells should be rendered correctly", () => {
    render(<TableTest />);
    data.forEach((row: DataTest) => {
      const tableRows = Object.values(row);
      tableRows.shift();
      tableRows.forEach((currentCell: string) => {
        expect(screen.getByRole("cell", {name: currentCell})).toBeInTheDocument();
      });
    });
  });

});
