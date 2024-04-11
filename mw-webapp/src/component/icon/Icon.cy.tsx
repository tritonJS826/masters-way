import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";
import {getDataCy} from "src/utils/cyTesting/getDataCy";
import styles from "src/component/icon/Icon.module.scss";

const ICON_CY = "icon";

/**
 * Data attribute for cypress testing
 */
enum IconSizeIconDictionaryTest {
  EyeOpenedIcon="EyeOpenedIcon",
  EyeSlashedIcon="EyeSlashedIcon",
  SunIcon="SunIcon",
  MoonIcon="MoonIcon",
  StarIcon="StarIcon",
  GridViewIcon="GridViewIcon",
  TableViewIcon="TableViewIcon",
  FileIcon="FileIcon",
  PlusIcon="PlusIcon",
  MoreVertical="MoreVertical"
}

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
      className={styles.testIcon}
    />
  );
};

describe("Icon component", () => {

  it("shoud be renders when EyeOpenedIcon", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.EyeOpenedIcon, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
  it("shoud be renders when EyeSlashedIcon", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.EyeSlashedIcon, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
  it("shoud be renders when FileIcon", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.FileIcon, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
  it("shoud be renders when GridViewIcon", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.GridViewIcon, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
  it("shoud be renders when MoonIcon", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.MoonIcon, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
  it("shoud be renders MoreVertical", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.MoreVertical, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
  it("shoud be renders when PlusIcon", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.PlusIcon, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
  it("shoud be renders when StarIcon", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.StarIcon, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
  it("shoud be renders when SunIcon", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.SunIcon, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
  it("shoud be renders when TableViewIcon", () => {
    cy.mount(createTestIcon({name: IconSizeIconDictionaryTest.TableViewIcon, size: IconSize.MEDIUM}));
    cy.get(getDataCy(ICON_CY)).should("exist");
  });
});

