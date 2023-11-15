import React from "react";

/**
 * Replace '/n' in text from json to react element with <br/>
 */
export const jsonWithLineBreakToReact = (text: string) => {
  const paragraphs = text.split("\n");

  return paragraphs.map((point, i) => (
    <React.Fragment key={i}>
      {/* Don't add new line before first paragraph */}
      {i !== 0 && <br />}
      {point}
    </React.Fragment>));
};
