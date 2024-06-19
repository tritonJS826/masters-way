import ReactGA from "react-ga4";

/**
 * Track user interaction with button params
 */
interface TrackUserInteractionWithButtonParams {

  /**
   * Describe action on tracked button click
   */
  action: string;

  /**
   * Describe place and additional info about button.
   * Need if we have few similar buttons in different places (pages, blocks) and get more info which button is more popular
   */
  label: string;
}

/**
 * Tracking user interaction by clicking buttons
 */
export const trackUserInteractionWithButton = (params: TrackUserInteractionWithButtonParams) => {
  ReactGA.event({
    category: "User Interaction",
    action: params.action,
    label: params.label,
  });

};
