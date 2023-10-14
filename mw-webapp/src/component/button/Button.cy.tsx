import {Button} from "src/component/button/Button";

const BUTTON_VALUE = "Click button";

describe("<Button />", () => {
  it("renders", () => {
    const STUB_FUNCTION = cy.stub();
    cy.mount(
      <Button
        value={BUTTON_VALUE}
        onClick={STUB_FUNCTION}
      />);
  });

  it("uses custom text for the button", () => {
    const STUB_FUNCTION = cy.stub();
    cy.mount(
      <Button
        value={BUTTON_VALUE}
        onClick={STUB_FUNCTION}
      />);
    cy.get("button").should("contains.text", "Click button");
  });

  it("clicking", () => {
    const STUB_FUNCTION = cy.stub();
    cy.mount(
      <Button
        value={BUTTON_VALUE}
        onClick={STUB_FUNCTION}
      />);
    cy.get("button").click().then(() => {
      expect(STUB_FUNCTION).to.be.called;
    });
  });
});