import {Meta, StoryObj} from "@storybook/react";
import {Slider, SliderItem} from "src/component/slider/Slider";

const getDivElement = (content: string) =>
  (<div style={{height: 500, display: "flex", justifyContent: "center", alignItems: "center", background: "#888"}}>
    {content}
  </div>);

const sliderItems: SliderItem[] = [
  {id: 1, content: getDivElement("Slide 1")},
  {id: 2, content: getDivElement("Slide 2")},
  {id: 3, content: getDivElement("Slide 3")},
  {id: 4, content: getDivElement("Slide 4")},

];

const meta = {
  title: "Slider",
  component: Slider,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const DefaultSlider: Story = {
  args: {
    sliderItems,
    loop: true,
    amountSlider: 3,
    gap: 24,
  },
};

export const SliderWithScrollbar: Story = {
  args: {
    sliderItems,
    loop: true,
    amountSlider: 2,
    gap: 20,
    settings: {scrollbar: {draggable: true}},
  },
};

export const NonLoopingSlider: Story = {
  args: {
    sliderItems,
    loop: false,
    amountSlider: 1,
    gap: 10,
  },
};
