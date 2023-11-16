import {useNavigate, useParams} from "react-router-dom";
import {UserPage} from "src/logic/userPage/UserPage";
import {pages} from "src/router/pages";

/**
 * If uuid of user exists in query params redirect to Page and if not navigate to Page404
 */
export const ValidatedUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userUuid = params.uuid;

  return (
    userUuid
      ? <UserPage uuid={userUuid} />
      :
      <>
        {navigate(pages.page404.path)}
      </>
  );
};