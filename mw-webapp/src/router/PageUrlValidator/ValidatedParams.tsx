import React from "react";
import {Params, useParams} from "react-router-dom";
import {PageParams} from "src/router/pages";
import {UrlParamsType} from "src/router/PageUrlValidator/UrlParamsType";

/**
 * ValidatedParamsProps
 */
interface ValidatedParamsProps {

  /**
   * A
   */
  paramsSchema: PageParams;
}

/**
 * A
 */
const validateUuid = (uuid: string) => {
  if (!uuid) {
    throw new Error(`Not valid uuid ${uuid}`);
  }
};

/**
 * A
 */
const validateParam = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  realParamValue: any,
  paramType: UrlParamsType,
) => {
  switch (paramType) {
    case UrlParamsType.UUID:
      validateUuid(realParamValue);
      break;
    default:
      return null;
  }
};

/**
 * A
 */
const validateParams = (
  realParams: Readonly<Params<string>>,
  paramsSchema: Record<string, UrlParamsType>,
) => {
  Object.entries(paramsSchema).forEach(([key, value]) => {
    validateParam(realParams[key], value);
  });
};

/**
 * If uuid of user exists in query params redirect to Page and if not navigate to Page404
 */
export const ValidatedParams = (props: ValidatedParamsProps) => {
  const params = useParams();

  // A const navigate = useNavigate();

  try {
    validateParams(params, props.paramsSchema.urlParams);
  } catch (e) {
    alert("Wrong param");
    // eslint-disable-next-line no-console
    console.error(e);
    // Navigate() show notification!
    // navigate to error page with error message
  }

  /**
   * Render children with possibility pass props
   */
  const renderPage = () => {
    return React.createElement(
      React.Fragment,
      null,
      React.cloneElement(props.paramsSchema.pageComponent, params),
    );
  };

  return renderPage();
};