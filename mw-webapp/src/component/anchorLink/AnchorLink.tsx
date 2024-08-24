import {PropsWithChildren} from "react";
import clsx from "clsx";
import styles from "src/component/link/Link.module.scss";

/**
 * AnchorLink props
 */
interface AnchorLinkProps {

  /**
   * Should be equal of if element to which need link
   */
  path: string;

  /**
   * Additional custom class name
   */
  className?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

}

/**
 * Link component
 */
export const AnchorLink = (props: PropsWithChildren<AnchorLinkProps>) => {
  return (
    <a
      href={`#${props.path}`}
      className={clsx(styles.link, props.className)}
      data-cy={props.dataCy}
    >
      {props.children}
    </a>
  );
};
