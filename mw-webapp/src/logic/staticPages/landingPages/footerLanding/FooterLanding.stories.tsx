import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {Language} from "src/globalStore/LanguageStore";
import {FooterLanding} from "src/logic/staticPages/landingPages/footerLanding/FooterLanding";

const meta = {
  title: "FooterLanding",
  component: FooterLanding,
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
          <FooterLanding {...args} />
        </BrowserRouter>
      </div>
    );
  },
};
