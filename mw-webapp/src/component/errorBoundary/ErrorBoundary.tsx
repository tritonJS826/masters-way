import React, {Component, PropsWithChildren} from "react";

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
    // Update state so the next render will show the fallback UI.
    this.setState({hasError: true});
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
    // You can render the fallback UI.
      return (<h1>
        Something went wrong.
      </h1>);
    }
    return this.props.children;
  }

}
