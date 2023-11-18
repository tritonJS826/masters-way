import {Params, useNavigate, useParams} from "react-router-dom";
import {PageParams, pages} from "src/router/pages";
import {UrlParamsType} from "src/router/PageUrlValidator/UrlParamsType";

/**
 * ValidatedParamsProps
 */
interface ValidatedParamsProps {

  /**
   * Page params
   */
  paramsSchema: PageParams;
}

/**
 * Validate uuid
 */
const validateUuid = (uuid: Readonly<Params<string>>) => {
  if (!uuid) {
    throw new Error(`Not valid uuid ${uuid}`);
  }
};

/**
 * Validate param
 */
const validateParam = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  realParamValue: Readonly<Params<string>>,
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

  const navigate = useNavigate();

  try {
    validateParams(params, props.paramsSchema.urlParams);
  } catch (e) {
    alert("Wrong param");
    navigate(pages.page404.getPath());
    // Navigate() show notification!
    // navigate to error page with error message
  }

  return props.paramsSchema.getPageComponent(params);
};