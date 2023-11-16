import React, {PropsWithChildren, ReactElement} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {QueryParamTypes} from "src/logic/QueryParamTypes";
import {pages} from "src/router/pages";

/**
 * ValidatedParamsProps
 */
interface ValidatedParamsProps {

  /**
   * Params
   */
  params: QueryParamTypes;

  /**
   * Page component that will render if query params validated
   */
  page: ReactElement;
}

/**
 * If uuid of user exists in query params redirect to Page and if not navigate to Page404
 */
export const ValidatedParams = (props: PropsWithChildren<ValidatedParamsProps>) => {
  const navigate = useNavigate();
  const paramsArray = Object.entries(props.params);
  const indexOfParamValue = 1;

  for (const k of paramsArray) {
    switch (k[0]) {
      case "uuid":
        if (k[indexOfParamValue] === "undefined") {
          navigate(pages.page404.path);
        }
    }
  }

  const params = useParams();
  const userUuid = params.uuid;

  /**
   * Render children with possibility pass props
   */
  const renderChildren = () => {
    return React.createElement(React.Fragment, null, React.cloneElement(props.page, {uuid: userUuid}));
  };

  return (
    renderChildren()
  );
};