import {PricingPlan} from "src/model/businessModel/CurrentUser";

/**
 * Convert pricing plan string to enum
 */
export const convertPricingPlanStringToEnum = (pricingPlan: string): PricingPlan => {
  switch (pricingPlan) {
    case PricingPlan.FREE:
      return PricingPlan.FREE;
      break;
    case PricingPlan.AI_STARTER:
      return PricingPlan.AI_STARTER;
      break;
    case PricingPlan.STARTER:
      return PricingPlan.STARTER;
      break;
    case PricingPlan.PRO:
      return PricingPlan.PRO;
      break;
    default:
      return PricingPlan.FREE;
  }
};
