import React from "react";
import {Checkbox} from "src/component/checkbox/Сheckbox";

describe("Checkbox Component Tests", () => {
  it("onChange called and className changed onClick if DefaultChecked=false", () => {
    const handleChange = cy.spy();
    cy.mount(
      <Checkbox
        onChange={handleChange}
        isDefaultChecked={false}
      />);
    cy.get("label").click();
    cy.wrap(handleChange).should("have.been.calledWith", true);
    cy.get("label input").should("be.checked");
  });

  it("onChange called and className changed onClick if DefaultChecked=true", () => {
    const handleChange = cy.spy();
    cy.mount(
      <Checkbox
        onChange={handleChange}
        isDefaultChecked={true}
      />);
    cy.get("label").click();
    cy.wrap(handleChange).should("have.been.calledWith", false);
    cy.get("label input").should("not.be.checked");
  });
});
