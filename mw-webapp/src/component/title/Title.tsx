import React from "react";
import {Heading} from "@radix-ui/themes";
import styles from "./Title.module.scss";

export enum HeadingLevel {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

interface TitleProps {
  /**
   * Heading level
   */
  level: HeadingLevel;
  /**
   * CSS class name for styling the component.
   */
  className: string;
  /**
   * Text content of the heading
   */
  text: string;
}

export const Title: React.FC<TitleProps> = (props: TitleProps) => {
  return (
    <Heading as={props.level}
      className={styles.title + " " + props.className}
    >
      {props.text}
    </Heading>
  );
};
