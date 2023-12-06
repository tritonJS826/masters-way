import MarkdownLib from "react-markdown";

/**
 * Convert markdown text to appropriate html
 */
export const renderMarkdown = (text: string | number) => {
  if (typeof text === "number") {
    return (
      <MarkdownLib>
        {text.toString()}
      </MarkdownLib>
    );
  } else {
    return (
      <MarkdownLib>
        {text}
      </MarkdownLib>
    );
  }

};
