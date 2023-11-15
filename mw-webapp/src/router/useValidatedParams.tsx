import React, {PropsWithChildren, ReactElement} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {pages} from "src/router/pages";

/**
 * Query param types
 */
export type QueryParamTypes = {

  /**
   * Page's uuid
   */
  uuid: string;
}

/**
 * If query params exist allow redirect to Page and if not navigate to Page404
 */
export const ValidatedParams = (props: PropsWithChildren) => {
  const {uuid} = useParams<QueryParamTypes>();
  const navigate = useNavigate();

  /**
   * Render children with possibility pass props
   */
  const renderChildren = (id: string) => {
    return React.createElement(React.Fragment, null,
      React.Children.map(props.children, (child) => {
        return (
          React.cloneElement(child as ReactElement, {uuid: id})
        );
      }));
  };

  return (
    uuid ?
      <>
        {renderChildren(uuid)}
      </>
      :
      <>
        {navigate(pages.page404.path)}
      </>
  );

};