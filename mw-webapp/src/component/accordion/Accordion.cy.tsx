import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AccordionContent} from "src/component/accordion/AccordionContent/AccordionContent";
import {AccordionTrigger} from "src/component/accordion/AccordionTrigger/AccordionTrigger";
import {getDataCy} from "src/helpers/getDataCy";

describe("Accordion component", () => {
  const ACCORDION_ITEMS_EXAMPLE = [
    {
      trigger: <AccordionTrigger
        text="Trigger1"
        dataCy="trigger1"
      />,
      content: <AccordionContent
        content={<div>
          Content1
        </div>}
        dataCy="content1"
      />,
    },
    {
      trigger: <AccordionTrigger
        text="Trigger2"
        dataCy="trigger2"
      />,
      content: <AccordionContent
        content={<div>
          Content2
        </div>}
        dataCy="content2"
      />,
    },
  ];

  it("should render the accordion and all options", () => {
    cy.mount(<Accordion items={ACCORDION_ITEMS_EXAMPLE} />);

    cy.get(getDataCy("content1")).should("exist");
    cy.get(getDataCy("content2")).should("exist");
    cy.get(getDataCy("trigger1")).should("exist");
    cy.get(getDataCy("trigger2")).should("exist");
  });

  it("should accordion option be closed (text hidden)", () => {
    cy.mount(<Accordion items={ACCORDION_ITEMS_EXAMPLE} />);

    cy.get(getDataCy("content1")).should("be.not.visible");
  });

  it("should accordion option be opened when click trigger", () => {
    cy.mount(<Accordion items={ACCORDION_ITEMS_EXAMPLE} />);
    cy.get(getDataCy("trigger1")).click();

    cy.get(getDataCy("content1")).should("be.visible");
  });

  it("should all options could be opened and closed one by one", () => {
    cy.mount(<Accordion items={ACCORDION_ITEMS_EXAMPLE} />);

    cy.get(getDataCy("trigger1")).click();
    cy.get(getDataCy("trigger2")).click();

    cy.get(getDataCy("content1")).should("be.not.visible");
    cy.get(getDataCy("content2")).should("be.visible");
  });

  it("should all options be opened and closed in multiple mode", () => {
    cy.mount(<Accordion
      items={ACCORDION_ITEMS_EXAMPLE}
      type={accordionTypes.multiple}
    />);

    cy.get(getDataCy("trigger1")).click();
    cy.get(getDataCy("trigger2")).click();

    cy.get(getDataCy("content1")).should("be.visible");
    cy.get(getDataCy("content2")).should("be.visible");
  });

  it("should only one option be opened in not multiple mode", () => {
    cy.mount(<Accordion
      items={ACCORDION_ITEMS_EXAMPLE}
      type={accordionTypes.single}
    />);

    cy.get(getDataCy("trigger1")).click();

    cy.get(getDataCy("content1")).should("be.visible");
    cy.get(getDataCy("content2")).should("be.not.visible");

    cy.get(getDataCy("trigger2")).click();

    cy.get(getDataCy("content1")).should("be.not.visible");
    cy.get(getDataCy("content2")).should("be.visible");
  });
});
