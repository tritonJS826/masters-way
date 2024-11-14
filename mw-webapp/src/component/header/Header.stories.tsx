import {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {Header} from "src/component/header/Header";
import {testUserPreview} from "src/component/header/testUserPreview";
import {getNextSwitchTheme} from "src/component/themeSwitcher/ThemeSwitcher";
import {Language, languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";

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
    user: testUserPreview,
    language: languageStore.language,
    setLanguage: (lang: Language) => {
      languageStore.setLanguage(lang);
    },
    theme: themeStore.theme,
    setTheme: () => themeStore.setTheme(getNextSwitchTheme(themeStore.theme)),
    unreadNotificationsAmount: null,
    isNotificationBlockOpen: false,
    isConnectionEstablished: false,
  },
  render: (args) => {
    const [lang, setLang] = useState<Language>(args.language);

    useEffect(() => {
      args.setLanguage(lang);
    }, [lang]);

    return (
      // Header must be wrapped by BrowserRouter otherwise there will be an error with Link component
      <div style={{width: 1000}}>
        <BrowserRouter>
          <Header
            user={args.user}
            clearUser={() => {}}
            language={lang}
            setLanguage={setLang}
            theme={args.theme}
            setTheme={args.setTheme}
            openNotificationBlock={() => { }}
            unreadNotificationsAmount={null}
            isNotificationBlockOpen={false}
            isConnectionEstablished={false}
          />
        </BrowserRouter>
      </div>
    );
  },
};
