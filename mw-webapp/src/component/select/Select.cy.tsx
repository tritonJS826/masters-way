import {useState} from "react";
import {Select} from "src/component/select/Select";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const SELECT_CY = {
  dataCyTrigger: "trigger",
  dataCyOverlay: "overlay",
  dataCyContent: "content",
  dataCyContentList: "list",
  dataCyValue: "value",
};

const FIRST_OPTION_INDEX = 0;
const SECOND_OPTION_INDEX = 1;
const SELECT_OPTIONS = [
  {id: "1", value: "value 1", text: "Select text 1", dataCyValue: "value1"},
  {id: "2", value: "value 2", text: "Select text 2", dataCyValue: "value2"},
];

/**
 * Select for test
 */
const SelectTest = () => {
  const [value, setValue] = useState(SELECT_OPTIONS[FIRST_OPTION_INDEX].value);

  return (
    <Select
      cy={SELECT_CY}
      label="Select label"
      defaultValue={value}
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

  it("should render select trigger and don't render select content by default", () => {
    cy.get(getDataCy(SELECT_CY.dataCyTrigger)).should("exist");
    cy.get(getDataCy(SELECT_CY.dataCyContentList)).should("not.exist");
  });

  it("should show selectList by clicking on select trigger", () => {
    cy.get(getDataCy(SELECT_CY.dataCyTrigger)).click();
    cy.get(getDataCy(SELECT_CY.dataCyContentList)).should("exist");
  });

  it("should trigger onClick if some selectItem selected", () => {
    cy.get(getDataCy(SELECT_CY.dataCyValue)).contains(SELECT_OPTIONS[FIRST_OPTION_INDEX].text);
    cy.get(getDataCy(SELECT_CY.dataCyTrigger)).click();
    cy.get(getDataCy(SELECT_CY.dataCyContentList)).click();
    cy.get(getDataCy(SELECT_CY.dataCyValue)).contains(SELECT_OPTIONS[SECOND_OPTION_INDEX].text);
  });

});
