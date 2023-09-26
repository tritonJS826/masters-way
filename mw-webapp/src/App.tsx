import ErrorBoundary from "src/component/errorBoundary/ErrorBoundary";
import {Header} from "src/component/header/Header";
import {Router} from "src/router/Router";

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </>
  );
}

export default App;