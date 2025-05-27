import {Meta, StoryObj} from "@storybook/react";
import {PricePlanType} from "src/component/pricingBlock/pricePlan/PricePlan";
import {PricingBlock} from "src/component/pricingBlock/PricingBlock";

const mockPricePlans: PricePlanType[] = [
  {
    id: 1,
    theme: "light",
    name: "Free",
    price: 0,
    period: "free",
    capabilities: {
      mentorSupport: null,
      ownTrainings: null,
      trackProgress: null,
      chat: null,
      notifications: null,
    },
    buttonValue: "start",
  },
  {
    id: 2,
    theme: "dark",
    name: "Pro",
    price: 19,
    period: "month",
    capabilities: {
      mentorSupport: 5,
      ownTrainings: null,
      trackProgress: null,
      chat: null,
      notifications: null,
      aiSupport: null,
      mobileSupport: null,
    },
    buttonValue: "grow",
  },
  {
    id: 3,
    theme: "light",
    name: "Enterprise",
    price: 99,
    period: "month",
    capabilities: {
      mentorSupport: null,
      ownTrainings: null,
      trackProgress: null,
      chat: null,
      notifications: null,
      aiSupport: null,
      mobileSupport: null,
      prioritySupport: null,
      featureRequest: null,
      onboarding: null,
    },
    buttonValue: "scale",
  },
];

const singlePlan: PricePlanType[] = [
  {
    id: 1,
    theme: "dark",
    name: "Starter",
    price: 9,
    period: "month",
    capabilities: {
      mentorSupport: 1,
      ownTrainings: null,
      trackProgress: null,
    },
    buttonValue: "start",
  },
];

const meta: Meta<typeof PricingBlock> = {
  title: "PricingBlock",
  component: PricingBlock,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PricingBlock>;

export const Default: Story = {args: {pricePlans: mockPricePlans}};

export const SinglePlan: Story = {args: {pricePlans: singlePlan}};
