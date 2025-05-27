import {Meta, StoryObj} from "@storybook/react";
import {Button} from "src/component/button/Button";
import {Dropdown} from "src/component/dropdown/Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "relative",
        minHeight: "400px",
        padding: "50px",
      }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: (
      <Button
        value="Open Dropdown"
        onClick={() => {}}
      />
    ),
    dropdownMenuItems: [
      {
        dropdownSubMenuItems: [
          {
            id: "item-1",
            value: "Edit Profile",
            onClick: () => {},
            isPreventDefaultUsed: false,
          },
          {
            id: "item-2",
            value: "Settings",
            onClick: () => {},
            isPreventDefaultUsed: false,
          },
          {
            id: "item-3",
            value: "Logout",
            onClick: () => {},
            isPreventDefaultUsed: false,
          },
        ],
      },
    ],
  },
};

export const WithHiddenItem: Story = {
  args: {
    trigger: (
      <Button
        value="Dropdown with conditionally hidden item"
        onClick={() => {}}
      />
    ),
    dropdownMenuItems: [
      {
        dropdownSubMenuItems: [
          {
            id: "item-1",
            value: "Always Visible",
            onClick: () => {},
            isPreventDefaultUsed: false,
          },
          {
            id: "item-2",
            value: "Hidden Item",
            onClick: () => {},
            isVisible: false,
            isPreventDefaultUsed: false,
          },
          {
            id: "item-3",
            value: "Also Visible",
            onClick: () => {},
            isPreventDefaultUsed: false,
          },
        ],
      },
    ],
  },
};

export const WithSubmenu: Story = {
  args: {
    trigger: (
      <Button
        value="Advanced Menu"
        onClick={() => {}}
      />
    ),
    dropdownMenuItems: [
      {
        dropdownSubMenuItems: [
          {
            id: "item-1",
            value: "Quick Action",
            onClick: () => {},
            isPreventDefaultUsed: false,
          },
        ],
      },
      {
        subTrigger: (
          <span>
            More Options
          </span>
        ),
        dropdownSubMenuItems: [
          {
            id: "subitem-1",
            value: "Advanced Setting 1",
            onClick: () => {},
            isPreventDefaultUsed: false,
          },
          {
            id: "subitem-2",
            value: "Advanced Setting 2",
            onClick: () => {},
            isPreventDefaultUsed: false,
          },
          {
            id: "subitem-3",
            value: "Expert Mode",
            onClick: () => {},
            isPreventDefaultUsed: false,
          },
        ],
      },
    ],
  },
};
