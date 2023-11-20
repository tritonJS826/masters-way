import {HeadingLevel, Title} from "src/component/title/Title";

/**
 * PageProps
 */
interface UserProfilePageProps {

  /**
   * Page's uuid
   */
  uuid: string;
}

/**
 * User profile page
 */
export const UserProfilePage = (props: UserProfilePageProps) => {
  return (
    <Title
      level={HeadingLevel.h2}
      text={`User profile page of user with uuid ${props.uuid}`}
    />
  );
};
