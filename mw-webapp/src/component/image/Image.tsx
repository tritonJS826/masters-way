import {useState} from "react";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import clsx from "clsx";
import {Cy} from "src/component/modal/Modal";
import {ModalContent} from "src/component/modal/ModalContent/ModalContent";
import {ModalTrigger} from "src/component/modal/ModalTrigger/ModalTrigger";
import styles from "src/component/image/Image.module.scss";

/**
 * Props for the Image component
 */
interface ImageProps {

  /**
   * Data attributes for cypress testing
   */
  cy?: Cy;

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
   * Image respond to clicks
   */
  isZoomable?: boolean;

  /**
   * Large Image
   */
  isZoomed?: boolean;

  /**
   * Control Image outside
   */
  onOpenChange?: (arg: boolean) => void;
}

/**
 * Component for displaying images
 */
export const Image = (props: ImageProps) => {
  const imageClass = clsx(styles.image, props.className);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Test
   */
  const handleOpenChange = (value: boolean) => {
    setIsOpen(value);
    if (props.onOpenChange) {
      props.onOpenChange(value);
    }
  };
  const imageElement = (
    <img
      src={props.src}
      alt={props.alt}
      className={imageClass}
      data-cy={props.dataCy}
    />
  );

  return (
    props.isZoomable
      ? (
        <DialogRoot
          open={props.isZoomed ?? isOpen}
          onOpenChange={handleOpenChange}
        >
          <ModalTrigger>
            {imageElement}
          </ModalTrigger>
          <ModalContent
            className={imageClass}
            dataCyContent={props.cy?.dataCyContent}
          >
            {imageElement}
          </ModalContent>
        </DialogRoot>
      )
      : imageElement
  );
};
