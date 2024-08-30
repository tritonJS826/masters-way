import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {ReviewCard} from "src/component/reviewCard/ReviewCard";

const meta = {
  title: "ReviewCard",
  component: ReviewCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gradeAmount: 5,
    review: "Отзыв клиента. Используйте 1–2 предложения в 2–4 строчки, так как здесь используется центральное выравнивание. \
      При большем количестве текста используйте другой тип выравнивания контента",
    reviewerImageUrl: "src/assets/storybook-images/kittens.jpg",
    reviewerName: "Vasya",
    reviewerProfession: "React, TS mentor",
  },
  render: (args) => (
    <BrowserRouter>
      <ReviewCard {...args} />
    </BrowserRouter>
  ),
};

