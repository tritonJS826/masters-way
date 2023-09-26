import React, {Component} from "react";
import {Page404} from "src/pages/page404/Page404";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
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

export default ErrorBoundary;