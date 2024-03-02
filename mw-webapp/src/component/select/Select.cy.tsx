import {useState} from "react";
import {Select} from "src/component/select/Select";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const SELECT_CY = "select";
const FIRST_OPTION_INDEX = 0;
const SECOND_OPTION_INDEX = 1;
const SELECT_OPTIONS = [
  {id: "1", value: "value 1", text: "Select text 1"},
  {id: "2", value: "value 2", text: "Select text 2"},
];

/**
 * Select for test
 */
const SelectTest = () => {
  const [value, setValue] = useState(SELECT_OPTIONS[FIRST_OPTION_INDEX].value);

  return (
    <Select
      dataCy={SELECT_CY}
      label="Select label"
      value={value}
      name="selectName"
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
    cy.get(getDataCy(SELECT_CY))
      .should("exist")
      .find("option")
      .should("have.length", SELECT_OPTIONS.length);
  });

  it("should selected value be visible", () => {
    cy.get(getDataCy(SELECT_CY))
      .find("option:selected")
      .should("be.visible");
  });

  it("should trigger onClick if some option selected", () => {
    cy.get(getDataCy(SELECT_CY))
      .find("option:selected")
      .should("contain.text", SELECT_OPTIONS[FIRST_OPTION_INDEX].text);
    cy.get(getDataCy(SELECT_CY))
      .select(SELECT_OPTIONS[SECOND_OPTION_INDEX].value)
      .trigger("change")
      .find("option:selected")
      .should("contain.text", SELECT_OPTIONS[SECOND_OPTION_INDEX].text);
  });

});
