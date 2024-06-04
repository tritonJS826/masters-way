import Sinon from "cypress/types/sinon";
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
  {id: "1", value: "value 1", text: "Select text 1"},
  {id: "2", value: "value 2", text: "Select text 2"},
];

/**
 * SelectTest props
 */
interface SelectTestProps {

  /**
   * SelectTest onChange
   */
  onChange: (value: string) => void;
}

/**
 * Select for test
 */
const SelectTest = (props: SelectTestProps) => {
  return (
    <Select
      cy={SELECT_CY}
      label="Select label"
      defaultValue={SELECT_OPTIONS[FIRST_OPTION_INDEX].value}
      name="selectName"
      options={SELECT_OPTIONS}
      onChange={props.onChange}
    />
  );
};

describe("Select component", () => {
  let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;
  beforeEach(() => {
    STUB_FUNCTION = cy.spy();
    cy.mount(
      <SelectTest onChange={STUB_FUNCTION} />
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

  it("should change value inside trigger if some selectItem selected", () => {
    cy.get(getDataCy(SELECT_CY.dataCyValue)).contains(SELECT_OPTIONS[FIRST_OPTION_INDEX].text);
    cy.get(getDataCy(SELECT_CY.dataCyTrigger)).click();
    // Force required for correct work for MacOS
    cy.get(getDataCy(SELECT_CY.dataCyContentList)).click({force: true});
    cy.contains(SELECT_OPTIONS[SECOND_OPTION_INDEX].text);
  });

  it("should trigger onClick if some selectItem selected", () => {
    cy.get(getDataCy(SELECT_CY.dataCyTrigger)).click();
    cy.get(getDataCy(SELECT_CY.dataCyContentList)).click();
    cy.wrap(STUB_FUNCTION).should("have.been.called");
  });

});
