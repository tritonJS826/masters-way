import type {PricePlanType} from "src/logic/pricingPage/pricePlan/PricePlan";

export const pricePlans: PricePlanType[] = [
  {
    id: 0,
    theme: "light",
    name: "Intro",
    price: 0,
    capabilities: {
      ownWays: 10,
      privateWays: 1,
      dayReports: 100,
      userTags: 3,
      customCollections: 0,
      mentoringWays: 0,
      compositeWayDeps: 0,
    },
  },
  {
    id: 0,
    theme: "dark",
    name: "Base",
    price: 5,
    period: "month",
    capabilities: {
      ownWays: 20,
      privateWays: 10,
      mentoringWays: 20,
      dayReports: 200,
      userTags: 5,
      customCollections: 0,
      compositeWayDeps: 0,
    },
  },
  {
    id: 0,
    theme: "light",
    name: "PRO",
    price: 50,
    period: "year",
    capabilities: {
      ownWays: 30,
      privateWays: 10,
      mentoringWays: 30,
      userTags: 5,
      customCollections: 10,
      dayReports: 365,
      compositeWayDeps: 3,
    },
  },
];
