import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AccordionContent} from "src/component/accordion/AccordionContent/AccordionContent";
import {AccordionTrigger} from "src/component/accordion/AccordionTrigger/AccordionTrigger";
import {getDataCy} from "src/helpers/getDataCy";

describe("Accordion component", () => {
  const FIRST_TRIGGER = "trigger1";
  const SECOND_TRIGGER = "trigger2";
  const FIRST_CONTENT = "content1";
  const SECOND_CONTENT = "content2";

  const ACCORDION_ITEMS_EXAMPLE = [
    {
      trigger: <AccordionTrigger
        text={FIRST_TRIGGER}
        dataCy={FIRST_TRIGGER}
      />,
      content: <AccordionContent
        content={<div>
          {FIRST_CONTENT}
        </div>}
        dataCy={FIRST_CONTENT}
      />,
    },
    {
      trigger: <AccordionTrigger
        text={SECOND_TRIGGER}
        dataCy={SECOND_TRIGGER}
      />,
      content: <AccordionContent
        content={<div>
          {SECOND_CONTENT}
        </div>}
        dataCy={SECOND_CONTENT}
      />,
    },
  ];

  it("should render the accordion and all options", () => {
    cy.mount(<Accordion items={ACCORDION_ITEMS_EXAMPLE} />);

    cy.get(getDataCy(FIRST_CONTENT)).should("exist");
    cy.get(getDataCy(SECOND_CONTENT)).should("exist");
    cy.get(getDataCy(FIRST_TRIGGER)).should("exist");
    cy.get(getDataCy(SECOND_TRIGGER)).should("exist");
  });

  it("should accordion option be closed (text hidden)", () => {
    cy.mount(<Accordion items={ACCORDION_ITEMS_EXAMPLE} />);

    cy.get(getDataCy(FIRST_CONTENT)).should("be.not.visible");
  });

  it("should accordion option be opened when click trigger", () => {
    cy.mount(<Accordion items={ACCORDION_ITEMS_EXAMPLE} />);

    cy.get(getDataCy(FIRST_TRIGGER)).click();

    cy.get(getDataCy(FIRST_CONTENT)).should("be.visible");
  });

  it("should all options could be opened and closed one by one", () => {
    cy.mount(<Accordion items={ACCORDION_ITEMS_EXAMPLE} />);

    cy.get(getDataCy(FIRST_TRIGGER)).click();
    cy.get(getDataCy(SECOND_TRIGGER)).click();

    cy.get(getDataCy(FIRST_CONTENT)).should("be.not.visible");
    cy.get(getDataCy(SECOND_CONTENT)).should("be.visible");
  });

  it("should all options be opened and closed in multiple mode", () => {
    cy.mount(<Accordion
      items={ACCORDION_ITEMS_EXAMPLE}
      type={accordionTypes.multiple}
    />);

    cy.get(getDataCy(FIRST_TRIGGER)).click();
    cy.get(getDataCy(SECOND_TRIGGER)).click();

    cy.get(getDataCy(FIRST_CONTENT)).should("be.visible");
    cy.get(getDataCy(SECOND_CONTENT)).should("be.visible");
  });

  it("should only one option be opened in not multiple mode", () => {
    cy.mount(<Accordion
      items={ACCORDION_ITEMS_EXAMPLE}
      type={accordionTypes.single}
    />);

    cy.get(getDataCy(FIRST_TRIGGER)).click();

    cy.get(getDataCy(FIRST_CONTENT)).should("be.visible");
    cy.get(getDataCy(SECOND_CONTENT)).should("be.not.visible");

    cy.get(getDataCy(SECOND_TRIGGER)).click();

    cy.get(getDataCy(FIRST_CONTENT)).should("be.not.visible");
    cy.get(getDataCy(SECOND_CONTENT)).should("be.visible");
  });
});
