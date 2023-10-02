import {ErrorBoundary} from "src/component/errorBoundary/ErrorBoundary";
import {Header} from "src/component/header/Header";
import {Router} from "src/router/Router";

export const App = () => {
  return (
    <ErrorBoundary>
      <Header />
      <Router />
    </ErrorBoundary>
  );
};