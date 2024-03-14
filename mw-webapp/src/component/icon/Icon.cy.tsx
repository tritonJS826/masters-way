import {createClassName, Icon, IconDictionary, IconProps, IconSize} from "src/component/icon/Icon";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const ICON_CY = "icon";

/**
 * Returns a data attribute selector for CYPRESS testing specific to the Icon component.
 * @returns {string} - The data attribute selector for CYPRESS testing for the Icon component.
 */
const getIcon = (): string => getDataCy(ICON_CY);

describe("Icon component", () => {

  it("Rendering of all icon types", () => {
    const iconNames = Object.keys(IconDictionary) as (keyof typeof IconDictionary)[];

    iconNames.forEach((name) => {
      cy.mount(<Icon
        dataCy={ICON_CY}
        name={name}
        size={IconSize.MEDIUM}
      />,
      );

      cy.get(getIcon()).should("exist");
    });
  });

  it("should render icon with medium size", () => {
    const props: IconProps = {
      dataCy: ICON_CY,
      name: "EyeOpenedIcon",
      size: IconSize.MEDIUM,
    };

    cy.mount(<Icon {...props} />);
    cy.get(getIcon()).should("exist");
    cy.get(getIcon()).should("have.class", createClassName(props));
  });

  it("should render icon with small size", () => {
    const props: IconProps = {
      dataCy: ICON_CY,
      name: "EyeOpenedIcon",
      size: IconSize.SMALL,
    };

    cy.mount(<Icon {...props} />);
    cy.get(getIcon()).should("exist");
    cy.get(getIcon()).should("have.class", createClassName(props));
  });

  it("should render icon with custom className", () => {
    cy.mount(<Icon
      dataCy={ICON_CY}
      name="PlusIcon"
      size={IconSize.MEDIUM}
      className="custom-class"
    />,
    );
    cy.get(getIcon()).should("exist");
    cy.get(getIcon()).should("have.class", "custom-class");
  });
});
