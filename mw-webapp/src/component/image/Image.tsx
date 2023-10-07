import React from "react";
import styles from "src/component/image/Image.module.scss";

/**
 * Props for the Image component
 */
interface ImageProps {

  /**
   * Image source
   */
  src: string;

  /**
   * Image alt text
   */
  alt: string;

  /**
   * Additional custom class name for the component
   */
  className?: string;
}

/**
 * Сomponent for displaying images
 */
export const Image: React.FC<ImageProps> = (props: ImageProps) => {
  return (
    <div className={props.className}>
      <img
        src={props.src}
        alt={props.alt}
        className={styles.image}
      />
    </div>);
};

