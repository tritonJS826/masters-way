/**
 * Remove asterisks, headers, and backticks from markdown text
 */
export const renderMarkdownToPDF = (text: string): string => {
  return text
    // Remove all asterisks
    .replace(/\*/g, "")
    // Remove backticks
    .replace(/`/g, "")
    // Remove headers
    .replace(/^#+\s*/gm, "")
    .trim();
};
