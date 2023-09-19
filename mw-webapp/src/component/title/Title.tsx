import React from "react";
import styles from "src/component/title/Title.module.scss";

interface TitleProps {
  /**
   * Heading level (h1, h2, h3, h4, h5, h6)
   */
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  /**
   * Text content of the heading
   */
  text: string;
}

export const Title: React.FC<TitleProps> = ({size, text}: TitleProps) => {
  const HeadingElement = size;
  return (
    <HeadingElement
      className={styles.title}
    >
      {text}
    </HeadingElement>
  );
};
