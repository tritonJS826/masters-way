import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {Footer} from "src/component/footer/Footer";
import {Language} from "src/globalStore/LanguageStore";

const meta = {
  title: "Footer",
  component: Footer,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {language: Language.ENGLISH},
  render: (args) => {
    return (
      // Footer must be wrapped by BrowserRouter otherwise there will be an error with Link component
      <div style={{width: 1000}}>
        <BrowserRouter>
          <Footer {...args} />
        </BrowserRouter>
      </div>
    );
  },
};
