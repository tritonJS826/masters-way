import {render, screen} from "@testing-library/react";
import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";

const ICON_CY = "icon";
const ICON_NAME: keyof typeof IconDictionary = "EyeOpenedIcon";

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

  it.each(Object.entries(IconSize))("renders icon size %s", (iconSizeKey, iconSize) => {
    renderTestIcon({name: ICON_NAME, size: iconSize});
    const icon = screen.getByTestId(ICON_CY);
    expect(icon).toBeInTheDocument();
    expect(icon).toBeVisible();
    expect(icon).toHaveClass(iconSize);
  });
});
