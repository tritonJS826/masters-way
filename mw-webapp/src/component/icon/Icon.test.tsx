import {render, screen} from "@testing-library/react";
import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";
import styles from "src/component/icon/Icon.module.scss";

const ICON_CY = "icon";
const ICON = "EyeOpenedIcon";

/**
 * Icon Test size
 */
enum IconTestSize {
  small = "16px",
  medium = "24px",
  big = "40px"
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

  it("should be render", () => {
    renderTestIcon({name: ICON, size: IconSize.MEDIUM});
    expect(screen.getByTestId(ICON_CY)).toBeInTheDocument();
  });

  it("should be render big size", () => {
    renderTestIcon({name: ICON, size: IconSize.BIG});
    const icon = screen.getByTestId(ICON_CY);

    expect(getComputedStyle(icon).width).toMatch(IconTestSize[IconSize.BIG]);
    expect(getComputedStyle(icon).height).toMatch(IconTestSize[IconSize.BIG]);
    expect(icon).toHaveClass(styles[IconSize.BIG]);
  });

  it("should be render medium size", () => {
    renderTestIcon({name: ICON, size: IconSize.MEDIUM});
    const icon = screen.getByTestId(ICON_CY);

    expect(getComputedStyle(icon).width).toMatch(IconTestSize[IconSize.MEDIUM]);
    expect(getComputedStyle(icon).height).toMatch(IconTestSize[IconSize.MEDIUM]);
    expect(icon).toHaveClass(styles[IconSize.MEDIUM]);
  });

  it("should be render small size", () => {
    renderTestIcon({name: ICON, size: IconSize.SMALL});
    const icon = screen.getByTestId(ICON_CY);

    expect(getComputedStyle(icon).width).toMatch(IconTestSize[IconSize.SMALL]);
    expect(getComputedStyle(icon).height).toMatch(IconTestSize[IconSize.SMALL]);
    expect(icon).toHaveClass(styles[IconSize.SMALL]);
  });

});
