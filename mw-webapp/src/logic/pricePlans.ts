import {PricePlanType} from "src/component/pricingBlock/pricePlan/PricePlan";

export const pricePlansList: PricePlanType[] = [
  {
    id: 0,
    theme: "light",
    name: "Start",
    price: 0,
    period: "free",
    capabilities: {
      ownTrainings: null,
      aiSupport: null,
      trackProgress: null,
      chat: null,
      notifications: null,
      mobileSupport: null,
    },
    buttonValue: "start",
  },
  {
    id: 1,
    theme: "dark",
    name: "Grow",
    price: 50,
    period: "month",
    capabilities: {
      allInStart: null,
      consultation: null,
      mentorSupport: null,
      secondMeeting: null,
    },
    buttonValue: "grow",
  },
  {
    id: 2,
    theme: "light",
    name: "Scale",
    price: 0,
    period: "individually",
    capabilities: {
      allInGrow: null,
      prioritySupport: null,
      featureRequest: null,
      onboarding: null,
    },
    buttonValue: "scale",
  },
];
