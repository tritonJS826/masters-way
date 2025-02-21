import type {StoryObj} from "@storybook/react";
import {ProjectCard} from "src/component/projectCard/ProjectCard";
import {Language} from "src/globalStore/LanguageStore";

const meta = {
  title: "ProjectCard",
  component: ProjectCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projectTitle: "Test project",
    language: Language.ENGLISH,
    projectType: "public",
    onClick: () => {},
  },
  render: (args) => <ProjectCard {...args} />,
};
