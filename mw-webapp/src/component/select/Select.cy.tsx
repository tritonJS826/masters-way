import {useState} from "react";
import {Select} from "src/component/select/Select";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const SELECT_LABEL = "Select label";
const SELECT_NAME = "selectName";
const SELECT_CY = "select";
const TEXT_ONE = "Select text 1";
const TEXT_TWO = "Select text 2";
const VALUE_ONE = "value 1";
const VALUE_TWO = "value 2";
const SELECT_OPTIONS = [
  {id: "1", value: VALUE_ONE, text: TEXT_ONE},
  {id: "2", value: VALUE_TWO, text: TEXT_TWO},
];

/**
 * Select for test
 */
const SelectTest = () => {
  const [value, setValue] = useState(SELECT_OPTIONS[0].value);

  return (
    <Select
      dataCy={SELECT_CY}
      label={SELECT_LABEL}
      value={value}
      name={SELECT_NAME}
      options={SELECT_OPTIONS}
      onChange={setValue}
    />
  );
};

describe("Select component", () => {

  beforeEach(() => {
    cy.mount(
      <SelectTest />
      ,
    );
  });

  it("should render select and all options", () => {
    cy.get(getDataCy(SELECT_CY)).should("exist")
      .find("option").should("have.length", SELECT_OPTIONS.length);
  });

  it("should selected value be visible", () => {
    cy.get(getDataCy(SELECT_CY)).find("option:selected").should("be.visible");
  });

  it("should trigger onClick if some option selected", () => {
    cy.get(getDataCy(SELECT_CY)).find("option:selected").should("contain.text", TEXT_ONE);
    cy.get(getDataCy(SELECT_CY)).select(VALUE_TWO).trigger("change").find("option:selected").should("contain.text", TEXT_TWO);
  });

});
