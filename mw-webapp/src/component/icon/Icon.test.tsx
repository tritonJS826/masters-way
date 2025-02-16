import {render, screen} from "@testing-library/react";
import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";

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
const renderTestIcon = (props: createTestIconProps) => {
  render(
    <Icon
      dataCy={ICON_CY}
      name={props.name}
      size={props.size}
    />,
  );
};

describe("Icon component", () => {

  it("All icon sizes should be rendered", () => {
    Object.keys(IconSize).forEach((icon) => {
      renderTestIcon({name: ICON, size: IconSize[icon as keyof typeof IconSize]});
    });
    const icons = screen.getAllByTestId(ICON_CY);
    expect(icons.length).toEqual(Object.keys(IconSize).length);
  });

});
