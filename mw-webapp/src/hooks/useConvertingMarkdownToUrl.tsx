import {useMemo} from "react";
import {Link} from "src/component/link/Link";

/**
 * The render Description hooks processes the description text to find markdown-style
 * links and convert them into
 * clickable anchor tags.
 */
export const useConvertingMarkdownToUrl = (description: string) => {
  const linkPattern = /\[([^\]]*)]\((https?:\/\/[^)]+)\)/g;
  const urlGroupIndex = 2;
  const urlGroupNumber = 1;

  return useMemo(() => {
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkPattern.exec(description)) !== null) {
      if (match.index > lastIndex) {
        parts.push(description.substring(lastIndex, match.index));
      }
      let linkText = match[urlGroupNumber];
      if (linkText.startsWith("**") && linkText.endsWith("**")) {
        linkText = linkText.slice(urlGroupIndex, -urlGroupIndex);
      }

      parts.push(linkText || match[urlGroupIndex]);
      lastIndex = linkPattern.lastIndex;
    }

    if (lastIndex < description.length) {
      parts.push(description.substring(lastIndex));
    }

    return parts;
  }, [description]);
};
