import {PricingPlan} from "src/model/businessModel/CurrentUser";

/**
 * Convert pricing plan string to enum
 */
export const convertPricingPlanStringToEnum = (pricingPlan: string): PricingPlan => {
  switch (pricingPlan) {
    case PricingPlan.FREE:
      return PricingPlan.FREE;
    case PricingPlan.AI_STARTER:
      return PricingPlan.AI_STARTER;
    case PricingPlan.STARTER:
      return PricingPlan.STARTER;
    case PricingPlan.PRO:
      return PricingPlan.PRO;
    default:
      throw new Error("The income value does not match to the existing pricing plan values");
  }
};
