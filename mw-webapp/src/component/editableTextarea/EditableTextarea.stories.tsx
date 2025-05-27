import {Meta, StoryObj} from "@storybook/react";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";

const meta: Meta<typeof EditableTextarea> = {
  title: "EditableTextarea",
  component: EditableTextarea,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EditableTextarea>;

const MAX_CHARACTERS = 100;
const DEFAULT_ROWS = 2;
const LARGE_ROWS = 5;

export const Default: Story = {
  args: {
    text: "Click to edit this text",
    onChangeFinish: () => {},
    placeholder: "Enter text here...",
    rows: DEFAULT_ROWS,
    isEditable: true,
  },
};

export const EmptyText: Story = {
  args: {
    text: "",
    onChangeFinish: () => {},
    placeholder: "This is a placeholder text",
    rows: DEFAULT_ROWS,
    isEditable: true,
  },
};

export const WithCharacterLimit: Story = {
  args: {
    text: "This textarea has a character limit",
    onChangeFinish: () => {},
    placeholder: "Enter text with character limit...",
    maxCharacterCount: MAX_CHARACTERS,
    rows: DEFAULT_ROWS,
    isEditable: true,
  },
};

export const WithManyRows: Story = {
  args: {
    text: "Click to edit this text",
    onChangeFinish: () => {},
    placeholder: "Enter text here...",
    rows: LARGE_ROWS,
    isEditable: true,
  },
};

export const NotEditable: Story = {
  args: {
    text: "Click to edit this text",
    onChangeFinish: () => {},
    placeholder: "Enter text here...",
    isEditable: false,
  },
};
