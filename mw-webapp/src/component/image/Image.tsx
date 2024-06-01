import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {Modal} from "src/component/modal/Modal";
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

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * Enlarge Image
   */
  isZoomable?: boolean;

  /**
   * Enlarge Image Styles
   */
  enlargeClassName?: string;

  /**
   * Enlarge Image Styles
   */
  isDisableZoom?: boolean;
}

/**
 * Сomponent for displaying images
 */
export const Image = (props: ImageProps) => {
  const {src, alt, dataCy, className, enlargeClassName, isZoomable, isDisableZoom} = props;

  const [zoomable, setZoomable] = useState(isZoomable);

  useEffect(() => {
    if (isDisableZoom) {
      setZoomable(false);
    } else {
      setZoomable(isZoomable);
    }
  }, [isDisableZoom, isZoomable]);

  const combinedClassName = clsx(styles.image, className);
  const combinedEnlargeClassName = clsx(styles.image, enlargeClassName);

  const imageElement = (
    <img
      src={src}
      alt={alt}
      className={combinedClassName}
      data-cy={dataCy}
    />
  );

  const enlargedImageElement = (
    <img
      src={src}
      alt={alt}
      className={combinedEnlargeClassName}
      data-cy={dataCy}
    />
  );

  return (
    zoomable && !isDisableZoom
      ? (
        <Modal
          trigger={imageElement}
          content={enlargedImageElement}
          className={combinedEnlargeClassName}
        />
      )
      : imageElement
  );
};

// Default props if needed
Image.defaultProps = {
  isZoomable: true,
  isDisableZoom: false,
};
