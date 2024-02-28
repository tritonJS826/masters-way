import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table} from "src/component/table/Table";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

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

  const tableContent = {headerGroup, rowModel};

  return (
    <Table
      data={tableContent}
      dataCy={TABLE_CY}
    />
  );
};

describe("Table component", () => {

  /**
   * Beginning of the test for the Table component.
   */
  const mountTable = () => {
    cy.mount(
      <TableTest />
      ,
    );
  };

  it("should render thead and tbody", () => {
    mountTable();
    cy.get(getDataCy(TABLE_CY)).find("thead").should("exist");
    cy.get(getDataCy(TABLE_CY)).find("tbody").should("exist");
  });

  it("table headers rendered in the right way", () => {
    mountTable();
    cy.get(getDataCy(TABLE_CY)).find("thead")
      .children().first().children()
      .invoke("prop", "tagName")
      .then($tag => $tag.toLowerCase())
      .should("eq", "th");
  });

  it("columns amount should be equal columns array length", () => {
    mountTable();
    cy.get(getDataCy(TABLE_CY)).find("thead")
      .children().first().children()
      .should("have.length", columns.length);
  });

  it("table rows rendered in the right way", () => {
    mountTable();
    cy.get(getDataCy(TABLE_CY)).find("tbody")
      .children().first().children()
      .invoke("prop", "tagName")
      .then($tag => $tag.toLowerCase())
      .should("eq", "td");
  });

  it("rows amount should be equal data array length", () => {
    mountTable();
    cy.get(getDataCy(TABLE_CY)).find("thead")
      .children().first().children()
      .should("have.length", data.length);
  });

});
