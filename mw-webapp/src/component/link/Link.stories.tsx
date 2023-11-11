import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {Link} from "src/component/link/Link";

const meta = {
  title: "Link",
  component: Link,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Link must be wrapped by BrowserRouter otherwise there will be an error
 */
export const Default: Story = {
  args: {
    value: "Default Link",
    path: "/",
  },
  render: (args) => (
    <BrowserRouter>
      <Link {...args} />
    </BrowserRouter>
  ),
};
