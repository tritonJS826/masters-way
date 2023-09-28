import React, {Component, PropsWithChildren} from "react";
import {Page404} from "src/pages/page404/Page404";

/**
 *   They are React components that catch JavaScript errors anywhere in their child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 *
 * Example: The component will work fine as long as everything is fine with retrieving data from the DataBase.
 *          But, if for some reason Data is undefined or null, our application will be broken.

     It’s important to note that error boundaries catch errors during rendering, in lifecycle methods,
   and constructors of the whole tree below them. However, error boundaries do not catch errors for:

   Event handlers (for that, you need to use regular try/catch)
   Asynchronous code (e.g., setTimeout or requestAnimationFrame callbacks)
   Server-side rendering
   Errors thrown in the error boundary itself (rather than its children).
 */

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {

  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {hasError: false};
  }

  public componentDidCatch(): void {
    this.setState({hasError: true});
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return <Page404 />;
    }
    return this.props.children;
  }

}