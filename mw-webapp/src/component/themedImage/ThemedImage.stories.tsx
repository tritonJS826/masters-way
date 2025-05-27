import React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {observer} from "mobx-react-lite";
import mastersWayLogo from "src/assets/mastersWayLogo.svg";
import mastersWayLogoLight from "src/assets/mastersWayLogoLight.svg";
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {Theme, themedVariables, themeStore} from "src/globalStore/ThemeStore";

const meta: Meta<typeof ThemedImage> = {
  title: "ThemedImage",
  component: ThemedImage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ThemedImage>;

const logoSources = getMapThemeSources({
  [Theme.DARK]: mastersWayLogo,
  [Theme.LIGHT]: mastersWayLogoLight,
  [Theme.OBSIDIAN]: mastersWayLogo,
});

// Theme decorators
const createThemeDecorator = (theme: Theme) => {
  const ThemeDecorator = (Story: React.ComponentType) => (
    <div style={{
      backgroundColor: themedVariables.primaryBgColor[theme],
      padding: "40px",
      borderRadius: "8px",
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
        padding: "40px",
        borderRadius: "8px",
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

const ReactiveThemedImage = observer(() => (
  <ThemedImage
    sources={logoSources}
    theme={themeStore.theme}
    name="Masters Way Logo (Reactive)"
  />
));

export const ReactiveTheme: Story = {
  render: () => <ReactiveThemedImage />,
  decorators: [createReactiveThemeDecorator()],
};

export const LightTheme: Story = {
  args: {
    sources: logoSources,
    theme: Theme.LIGHT,
    name: "Masters Way Logo",
  },
  decorators: [createThemeDecorator(Theme.LIGHT)],
};

export const DarkTheme: Story = {
  args: {
    sources: logoSources,
    theme: Theme.DARK,
    name: "Masters Way Logo",
  },
  decorators: [createThemeDecorator(Theme.DARK)],
};

export const ObsidianTheme: Story = {
  args: {
    sources: logoSources,
    theme: Theme.OBSIDIAN,
    name: "Masters Way Logo",
  },
  decorators: [createThemeDecorator(Theme.OBSIDIAN)],
};
