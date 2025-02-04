import {render, screen} from "@testing-library/react";
import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";
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

  it("should be render medium size", () => {
    renderTestIcon({name: ICON, size: IconSize.MEDIUM});
    const icon = screen.getByTestId(ICON_CY);

    expect(icon).toBeInTheDocument();
    expect(getComputedStyle(icon).width).toMatch(/24.*px/);
    expect(icon).toHaveClass(styles[IconSize.MEDIUM]);
  });

  it("should be render small size", () => {
    renderTestIcon({name: ICON, size: IconSize.SMALL});
    const icon = screen.getByTestId(ICON_CY);

    expect(icon).toBeInTheDocument();
    expect(getComputedStyle(icon).width).toMatch(/16.*px/);
    expect(icon).toHaveClass(styles[IconSize.SMALL]);
  });

});
