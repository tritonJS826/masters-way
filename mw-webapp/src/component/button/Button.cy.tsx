import {Button} from "src/component/button/Button";

const BUTTON_VALUE = "Click button";

describe("Button component", () => {
  it("render right value", () => {
    const STUB_FUNCTION = cy.stub();
    cy.mount(
      <Button
        value={BUTTON_VALUE}
        onClick={STUB_FUNCTION}
        data-cy="button"
      />);
    cy.get("[data-cy=\"button\"]").should("contains.text", BUTTON_VALUE);
  });

  it("onClick is triggered when button is clicked", () => {
    const STUB_FUNCTION = cy.stub();
    cy.mount(
      <Button
        value={BUTTON_VALUE}
        onClick={STUB_FUNCTION}
        data-cy="button"
      />);
    cy.get("[data-cy=\"button\"]").click().then(() => {
      expect(STUB_FUNCTION).to.be.called;
    });
  });
});