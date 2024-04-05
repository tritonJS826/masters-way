import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {Header} from "src/component/header/Header";
import {testUserPreview} from "src/component/header/testUserPreview";
import {Language} from "src/utils/LanguageWorker";

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
  },
  render: (args) => (
    // Header must be wrapped by BrowserRouter otherwise there will be an error with Link component
    <div style={{width: 1000}}>
      <BrowserRouter>
        <Header
          language={args.language}
          setLanguage={args.setLanguage}
          user={args.user}
        />
      </BrowserRouter>
    </div>
  ),
};
