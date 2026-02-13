import {Decoration} from "pdfmake/interfaces";

/**
 * Text node with formatting properties (compatible with PDFMake ContentText)
 */
interface TextNode {

  /** The text content */
  text: string;

  /** Whether text should be bold */
  bold?: boolean;

  /** Whether text should be italicized */
  italics?: boolean;

  /** Text decoration (e.g. 'lineThrough') */
  decoration?: Decoration;
}

/**
 * Match object for markdown patterns
 */
interface MarkdownMatch {

  /** Index of the match in the original string */
  index: number;

  /** Length of the matched text */
  length: number;

  /** Type of formatting (bold, italic, strike) */
  type: string;

  /** The matched content without markdown markers */
  content: string;
}

const SINGLE_NODE = 1;
const MARKER_INDEX = 1;
const CONTENT_INDEX = 2;

/**
 * Parse markdown text to pdfmake rich text format
 * Supports: **bold**, *italic*, ~~strikethrough~~
 * @param markdownText - Raw markdown text
 * @returns pdfmake compatible string or array of styled text nodes
 */
export const parseMarkdownToPdf = (markdownText: string): string | Array<string | TextNode> => {
  if (!markdownText) {
    return "";
  }

  const nodes: Array<string | TextNode> = [];
  let currentPos = 0;

  // Normalize common Unicode asterisk/underscore variants to ASCII equivalents
  // Handles: * ** _ __ ~~ and similar Unicode lookalikes
  const normalizedText = markdownText
    .replace(/[*＊∗]/g, "*") // Various asterisk Unicode variants
    .replace(/[_＿]/g, "_"); // Various underscore Unicode variants

  // Regex to find markdown patterns: **bold**, __bold__, *italic*, _italic_, ~~strikethrough~~
  // Uses backreference so opening and closing markers must match, and [\s\S] to include newlines.
  const markdownRegex = /(\*\*|__|\*|_|~~)([\s\S]+?)\1/g;
  let regexMatch;
  const matches: MarkdownMatch[] = [];

  // Find all matches
  while ((regexMatch = markdownRegex.exec(normalizedText)) !== null) {
    const marker = regexMatch[MARKER_INDEX];
    const content = regexMatch[CONTENT_INDEX];
    let type = "text";
    if (marker === "**" || marker === "__") {
      type = "bold";
    } else if (marker === "*" || marker === "_") {
      type = "italic";
    } else if (marker === "~~") {
      type = "strike";
    }

    matches.push({
      index: regexMatch.index,
      length: regexMatch[0].length,
      type,
      content,
    });
  }

  // If no markdown patterns found, return normalized text
  if (matches.length === 0) {
    return normalizedText;
  }

  // Sort matches by index to avoid overlapping
  matches.sort((a, b) => a.index - b.index);

  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];

    // Add text before this match (from normalized text)
    if (currentPos < currentMatch.index) {
      const plainText = normalizedText.substring(currentPos, currentMatch.index);
      if (plainText) {
        nodes.push(plainText);
      }
    }

    // Add formatted text
    const node: TextNode = {text: currentMatch.content};
    if (currentMatch.type === "bold") {
      node.bold = true;
    } else if (currentMatch.type === "italic") {
      node.italics = true;
    } else if (currentMatch.type === "strike") {
      node.decoration = "lineThrough";
    }
    nodes.push(node);

    currentPos = currentMatch.index + currentMatch.length;
  }

  // Add remaining text (from normalized text)
  if (currentPos < normalizedText.length) {
    const remainingText = normalizedText.substring(currentPos);
    if (remainingText) {
      nodes.push(remainingText);
    }
  }

  // If only a single plain string node, return as string to keep API simple
  return nodes.length === SINGLE_NODE && typeof nodes[0] === "string"
    ? nodes[0]
    : nodes;
};
