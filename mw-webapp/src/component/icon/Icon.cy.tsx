import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import styles from "src/component/icon/Icon.module.scss";

const ICON_CY = "icon";
const ICON = "EyeOpenedIcon";

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

  it("should be render", () => {
    cy.mount(createTestIcon({name: ICON, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });

  it("should be render medium size", () => {
    cy.mount(createTestIcon({name: ICON, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).invoke("css", "width").should("match", /25.*px/).should("match", /25.*px/);
    cy.get(getDataCy(ICON_CY)).should("have.class", styles[IconSize.MEDIUM]);
  });
  it("should be render small size", () => {
    cy.mount(createTestIcon({name: ICON, size: IconSize.SMALL}));
    cy.get(getDataCy(ICON_CY)).invoke("css", "width").should("match", /15.*px/);
    cy.get(getDataCy(ICON_CY)).should("have.class", styles[IconSize.SMALL]);
  });
});

