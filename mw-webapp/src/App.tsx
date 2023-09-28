import ErrorBoundary from "src/component/errorBoundary/ErrorBoundary";
import {Header} from "src/component/header/Header";
import {Router} from "src/router/Router";

const App = () => {
  return (
    <ErrorBoundary>
      <Header />
      <Router />
    </ErrorBoundary>
  );
};

export default App;