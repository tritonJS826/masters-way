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

  it("should be render big size", () => {
    renderTestIcon({name: ICON, size: IconSize.BIG});
    expect(screen.getByTestId(ICON_CY)).toBeInTheDocument();
  });

  it("should be render medium size", () => {
    renderTestIcon({name: ICON, size: IconSize.MEDIUM});
    expect(screen.getByTestId(ICON_CY)).toBeInTheDocument();
  });

  it("should be render small size", () => {
    renderTestIcon({name: ICON, size: IconSize.SMALL});
    expect(screen.getByTestId(ICON_CY)).toBeInTheDocument();
  });

});
