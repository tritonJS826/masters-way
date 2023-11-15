import {Tooltip} from "src/component/tooltip/Tooltip";

describe("Tooltip component", () => {
  it("Content rendered", () => {
    const tooltipContent = "Test content";
    cy.mount(<Tooltip
      content={tooltipContent}
      data-cy="tooltipContent"
    />);
    cy.get("[data-cy=\"tooltipContent\"]").should("contain.text", tooltipContent);
  });
});
