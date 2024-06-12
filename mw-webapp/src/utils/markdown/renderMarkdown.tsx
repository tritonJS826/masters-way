import MarkdownLib, {Components} from "react-markdown";
import remarkGfm from "remark-gfm";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/utils/markdown/Markdown.module.scss";

const {language} = languageStore;

const customComponents: Components = {

  /**
   * Custom anchor element for markdown
   */
  a: ({children, ...params}) => {

    return (
      <a
        {...params}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.a}
      >
        {!children ? LanguageService.common.emptyLinkTitle[language] : children}
      </a>
    );
  },

  /**
   * Custom Image element for markdown
   * @returns
   */
  img: (params) => {
    return (
      <span className={styles.imageContainer}>
        <img
          src={params.src}
          alt={params.alt}
          className={styles.markdownImg}
        />
      </span>
    );
  },

  /**
   * Custom numbered list
   */
  ol: (params) => {
    return (
      <ol className={styles.markdownList}>
        {params.children}
      </ol>
    );
  },

  /**
   * Custom dotted list
   */
  ul: (params) => {
    return (
      <ul className={styles.markdownList}>
        {params.children}
      </ul>
    );
  },

  /**
   * Custom divider
   */
  hr: (params) => {
    return (
      <hr
        {...params}
        className={styles.markdownDivider}
      />
    );
  },
};

/**
 * Convert markdown text to appropriate html
 */
export const renderMarkdown = (text: string | number) => {
  return (
    <MarkdownLib
      remarkPlugins={[remarkGfm]}
      components={customComponents}
    >
      {typeof text === "number"
        ? text.toString()
        : text
      }
    </MarkdownLib>
  );
};
