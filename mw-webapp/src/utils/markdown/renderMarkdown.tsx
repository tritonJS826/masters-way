import MarkdownLib, {Components} from "react-markdown";
import {Image} from "src/component/image/Image";
import styles from "src/utils/markdown/Markdown.module.scss";

const customComponents: Components = {

  /**
   * Custom Image element for markdown
   * @returns
   */
  img: (params) => {
    if (!params.src || !params.alt) {
      return (
        <img
          src={params.src}
          alt={params.alt}
        />
      );
    } else {
      return (
        <Image
          src={params.src}
          alt={params.alt}
          className={styles.markdownImg}
        />
      );
    }
  },
};

/**
 * Convert markdown text to appropriate html
 */
export const renderMarkdown = (text: string | number) => {
  return (
    <MarkdownLib components={customComponents}>
      {typeof text === "number"
        ? text.toString()
        : text
      }
    </MarkdownLib>
  );
};
