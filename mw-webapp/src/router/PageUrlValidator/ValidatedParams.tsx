import {Params, useNavigate, useParams} from "react-router-dom";
import {PageParams, pages, ParamName} from "src/router/pages";
import {UrlParamsType} from "src/router/PageUrlValidator/UrlParamsType";

/**
 * ValidatedParamsProps
 */
interface ValidatedParamsProps {

  /**
   * Page params
   *
   * Should be the same as type of pages
   * Probably it is wrong due to using as operator in pages
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramsSchema: PageParams<any>;
}

/**
 * Validate uuid
 */
const validateUuid = (uuid?: string) => {
  if (!uuid) {
    throw new Error(`Not valid uuid ${uuid}`);
  }
};

/**
 * Validate param
 */
const validateParam = (
  realParamValue: string | undefined,
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
 * Validate params
 */
const validateParams = (
  realParams: Readonly<Params>,
  paramsSchema: Record<ParamName, UrlParamsType>,
) => {
  Object.entries(paramsSchema).forEach(([key, paramType]) => {
    const realParamValue = realParams[key];
    validateParam(realParamValue, paramType);
  });
};

/**
 * If uuid of user exists in query params redirect to Page and if not navigate to error page
 */
export const WithValidatedParams = (props: ValidatedParamsProps) => {
  const params = useParams();

  const navigate = useNavigate();

  try {
    validateParams(params, props.paramsSchema.urlParams);
  } catch (e) {
    alert("Wrong param");
    navigate(pages.errorPage.getPath({}));
    // TODO: Navigate() show notification!
    // TODO: navigate to error page with error message
  }

  return props.paramsSchema.getPageComponent(params);
};
