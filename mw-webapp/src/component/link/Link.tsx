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
}

/**
 * Link component
 */
export const Link = (props: PropsWithChildren<LinkProps>) => {
  return (
    <LinkFromRouter
      className={clsx(styles.link, props.className)}
      to={props.path}
    >
      {props.children}
    </LinkFromRouter>
  );
};
