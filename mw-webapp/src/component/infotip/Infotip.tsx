import {PropsWithChildren, ReactElement, ReactNode} from "react";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Tooltip} from "src/component/tooltip/Tooltip";
import styles from "src/component/infotip/Infotip.module.scss";

/**
 * Infotip props
 */
interface InfotipProps {

  /**
   * Tooltip's content
   */
  content: string | ReactNode | ReactElement;

  /**
   * Additional custom class name for the component
   */
  className?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Infotip component
 */
export const Infotip = (props: PropsWithChildren<InfotipProps>) => {
  return (
    <Tooltip
      content={props.content}
      className={props.className}
    >
      <Icon
        name="InfoIcon"
        size={IconSize.SMALL}
        className={styles.infotip}
      />
    </Tooltip>
  );
};
