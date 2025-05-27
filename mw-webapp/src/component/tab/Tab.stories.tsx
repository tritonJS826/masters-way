import {Meta, StoryObj} from "@storybook/react";
import {Tab, TabItemProps} from "src/component/tab/Tab";
import {Text} from "src/component/text/Text";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";

const createTabPaddingDecorator = (triggerPadding: string, contentPadding: string) => {
  const TabPaddingDecorator = (Story: React.ComponentType) => (
    <div
      style={{
        "--tab-trigger-padding": triggerPadding,
        "--tab-content-padding": contentPadding,
      } as React.CSSProperties}
      className="tab-padding-decorator"
    >
      <style>
        {`
          .tab-padding-decorator [role="tab"] {
            padding: var(--tab-trigger-padding) !important;
          }
          .tab-padding-decorator [role="tabpanel"] {
            padding: var(--tab-content-padding) !important;
          }
        `}
      </style>
      <Story />
    </div>
  );

  TabPaddingDecorator.displayName = "TabPaddingDecorator";

  return TabPaddingDecorator;
};

const meta: Meta<typeof Tab> = {
  title: "Tab",
  component: Tab,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
  decorators: [createTabPaddingDecorator("12px 16px", "16px")],
};

export default meta;

type Story = StoryObj<typeof Tab>;

const basicTabs: TabItemProps[] = [
  {
    id: "tab1",
    value: "overview",
    tabTrigger: {
      id: "trigger1",
      value: "Overview",
    },
    tabContent: {
      id: "content1",
      value: (
        <VerticalContainer>
          <Text text="Overview Content" />
          <Text text="This is the overview section with general information." />
        </VerticalContainer>
      ),
    },
  },
  {
    id: "tab2",
    value: "details",
    tabTrigger: {
      id: "trigger2",
      value: "Details",
    },
    tabContent: {
      id: "content2",
      value: (
        <VerticalContainer>
          <Text text="Details Content" />
          <Text text="Here you can find detailed information and specifications." />
        </VerticalContainer>
      ),
    },
  },
  {
    id: "tab3",
    value: "settings",
    tabTrigger: {
      id: "trigger3",
      value: "Settings",
    },
    tabContent: {
      id: "content3",
      value: (
        <VerticalContainer>
          <Text text="Settings Content" />
          <Text text="Configure your preferences and options here." />
        </VerticalContainer>
      ),
    },
  },
];

export const Default: Story = {args: {tabList: basicTabs}};

export const VerticalTabs: Story = {
  args: {
    tabList: basicTabs,
    isVertical: true,
  },
};

export const ManyTabs: Story = {
  args: {
    tabList: [
      ...basicTabs,
      {
        id: "tab4",
        value: "analytics",
        tabTrigger: {
          id: "trigger4",
          value: "Analytics",
        },
        tabContent: {
          id: "content4",
          value: <Text text="Analytics dashboard and reports" />,
        },
      },
      {
        id: "tab5",
        value: "help",
        tabTrigger: {
          id: "trigger5",
          value: "Help",
        },
        tabContent: {
          id: "content5",
          value: <Text text="Help documentation and support" />,
        },
      },
    ],
  },
};

export const SmallPadding: Story = {
  args: {tabList: basicTabs},
  decorators: [createTabPaddingDecorator("8px 12px", "8px")],
};

export const LargePadding: Story = {
  args: {tabList: basicTabs},
  decorators: [createTabPaddingDecorator("16px 24px", "24px")],
};

export const ExtraLargePadding: Story = {
  args: {tabList: basicTabs},
  decorators: [createTabPaddingDecorator("20px 32px", "32px")],
};
