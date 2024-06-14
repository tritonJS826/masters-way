import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {Analytics, logEvent} from "src/firebase";

/**
 * Component to tracking custom google analytics
 */
export const FirebaseAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent(Analytics.SCREEN_VIEW, {pathname: window.location.pathname});
  }, [location]);

  return (<div />);
};
