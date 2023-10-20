import {Link} from "src/component/link/Link";

/**
 * Render link inside cell
 */
export const renderLinkInCell = (path: string, value: string) => {
  return (
    <Link
      value={value}
      path={path}
    />
  );
};