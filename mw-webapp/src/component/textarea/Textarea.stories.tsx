import {useState} from "react";
import {Textarea} from "src/component/textarea/Textarea";

const meta = {
  title: "Textarea",
  component: Textarea,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

/**
 * Default story for the Textarea component.
 */
export const Default = () => {
  const [text, setText] = useState<string>("");

  return (
    <Textarea
      value={text}
      onChange={setText}
      placeholder={"Some placeholder to textarea"}
      className={"customClassName"}
    />
  );
};
