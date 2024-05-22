import {PropsWithChildren} from "react";
import {Link as LinkFromRouter} from "react-router-dom";
import clsx from "clsx";
import styles from "src/component/link/Link.module.scss";

/**
 * Link props
 */
interface LinkProps {

  /**
   * Go to path page on link
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

  /**
   * Open link in a new tab or window
   */
  isNewTab?: boolean;
}

/**
 * Link component
 */
export const Link = (props: PropsWithChildren<LinkProps>) => {
  const targetProps = props.isNewTab ? {target: "_blank"} : {};

  return (
    <LinkFromRouter
      className={clsx(styles.link, props.className)}
      to={props.path}
      data-cy={props.dataCy}
      {...targetProps}
    >
      {props.children}
    </LinkFromRouter>
  );
};
