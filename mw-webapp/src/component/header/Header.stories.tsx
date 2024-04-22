import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {Header} from "src/component/header/Header";
import {testUserPreview} from "src/component/header/testUserPreview";
import {getNextSwitchTheme} from "src/logic/themeSwitcher/ThemeSwitcher";
import {Language} from "src/utils/LanguageWorker";
import {ThemeWorker} from "src/utils/ThemeWorker";

const meta = {
  title: "Header",
  component: Header,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    language: Language.ENGLISH,
    setLanguage: () => {},
    user: testUserPreview,
    currentTheme: ThemeWorker.getCurrentTheme(),
    setTheme: () => ThemeWorker.setTheme(getNextSwitchTheme(ThemeWorker.getCurrentTheme())),

  },
  render: (args) => (
    // Header must be wrapped by BrowserRouter otherwise there will be an error with Link component
    <div style={{width: 1000}}>
      <BrowserRouter>
        <Header
          language={args.language}
          setLanguage={args.setLanguage}
          user={args.user}
          currentTheme={ThemeWorker.getCurrentTheme()}
          setTheme={() => ThemeWorker.setTheme(getNextSwitchTheme(ThemeWorker.getCurrentTheme()))}
        />
      </BrowserRouter>
    </div>
  ),
};
