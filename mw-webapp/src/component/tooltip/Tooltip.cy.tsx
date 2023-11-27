import {Tooltip} from "src/component/tooltip/Tooltip";

describe("Tooltip component", () => {
  const TOOLTIP_CONTENT_ID = "tooltipContent";
  const TOOLTIP_CONTENT = "Test content";
  const repeatContent = 10;
  const TOOLTIP_CONTENT_LONG = TOOLTIP_CONTENT.repeat(repeatContent);

  it("Content rendered", () => {
    cy.mount(<Tooltip
      content={TOOLTIP_CONTENT}
      testId={TOOLTIP_CONTENT_ID}
    />);
    cy.get(`[data-cy="${TOOLTIP_CONTENT_ID}"]`).should("contain.text", TOOLTIP_CONTENT);
  });

  it("Long content gets truncatet", () => {
    cy.mount(<Tooltip
      content={TOOLTIP_CONTENT_LONG}
      testId={TOOLTIP_CONTENT_ID}
    />);
    cy.get(`[data-cy="${TOOLTIP_CONTENT_ID}"]`).invoke("show").then((text) => {
      expect(text.length).to.be.lessThan(TOOLTIP_CONTENT_LONG.length);
    });
  });
});
