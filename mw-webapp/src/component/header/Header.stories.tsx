import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {Header} from "src/component/header/Header";

const meta = {
  title: "Header",
  component: Header,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    // Header must be wrapped by BrowserRouter otherwise there will be an error with Link component
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  ),
};
