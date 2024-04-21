import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const ICON_CY = "icon";
const ICON_RENDER = "EyeOpenedIcon";

/**
 * Data attribute for cypress testing
 */
interface createTestIconProps {

  /**
   * Data attribute for cypress testing
   */
  name: keyof typeof IconDictionary;

  /**
   * Data attribute for cypress testing
   */
  size: IconSize;
}

/**
 *Create test icon component
 */
const createTestIcon = (props: createTestIconProps) => {
  return (
    <Icon
      dataCy={ICON_CY}
      name={props.name}
      size={props.size}
    />
  );
};

describe("Icon component", () => {

  it("shoud be render", () => {
    cy.mount(createTestIcon({name: ICON_RENDER, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });

  it("shoud be render medium size", () => {
    cy.mount(createTestIcon({name: ICON_RENDER, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)) .invoke("css", "width").should("match", /25.*px/);
    cy.get(getDataCy(ICON_CY)) .invoke("css", "height").should("match", /25.*px/);
  });
  it("shoud be render small size", () => {
    cy.mount(createTestIcon({name: ICON_RENDER, size: IconSize.SMALL}));
    cy.get(getDataCy(ICON_CY)) .invoke("css", "width").should("match", /15.*px/);
    cy.get(getDataCy(ICON_CY)) .invoke("css", "height").should("match", /15.*px/);
  });
});

