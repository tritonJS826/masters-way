import React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {observer} from "mobx-react-lite";
import {Loader} from "src/component/loader/Loader";
import {Theme, themedVariables, themeStore} from "src/globalStore/ThemeStore";

const createThemeDecorator = (theme: Theme) => {
  const ThemeDecorator = (Story: React.ComponentType) => (
    <div style={{
      backgroundColor: themedVariables.primaryBgColor[theme],
      minHeight: "100vh",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    >
      <Story />
    </div>
  );

  return ThemeDecorator;
};

const createReactiveThemeDecorator = () => {
  const ReactiveThemeDecorator = (Story: React.ComponentType) => {
    const ObservedWrapper = observer(() => (
      <div style={{
        backgroundColor: themedVariables.primaryBgColor[themeStore.theme],
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        <Story />
      </div>
    ));

    return <ObservedWrapper />;
  };

  return ReactiveThemeDecorator;
};

const meta: Meta<typeof Loader> = {
  title: "Loader",
  component: Loader,
  parameters: {layout: "fullscreen"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Loader>;

const ReactiveDefaultLoader = observer(() => <Loader theme={themeStore.theme} />);

export const DefaultLoader: Story = {
  render: () => <ReactiveDefaultLoader />,
  decorators: [createReactiveThemeDecorator()],
};

export const DarkThemeLoader: Story = {
  args: {theme: Theme.DARK},
  decorators: [createThemeDecorator(Theme.DARK)],
};

export const LightThemeLoader: Story = {
  args: {theme: Theme.LIGHT},
  decorators: [createThemeDecorator(Theme.LIGHT)],
};

export const ObsidianThemeLoader: Story = {
  args: {theme: Theme.OBSIDIAN},
  decorators: [createThemeDecorator(Theme.OBSIDIAN)],
};
