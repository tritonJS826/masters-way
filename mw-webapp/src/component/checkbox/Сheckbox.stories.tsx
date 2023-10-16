import React, {useState} from "react";
import type {StoryObj} from "@storybook/react";
import {Checkbox} from "src/component/checkbox/Сheckbox";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * HandleCheckboxChange
 */
export const Default: React.FC<Story> = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => setIsChecked(!isChecked);

  return (
    <Checkbox
      className="customClass"
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};
