import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/aboutProjectPage/TeamMember/TeamMember.module.scss";

/**
 *TeamMemberType
 */
export interface TeamMemberType {

  /**
   * Id member
   */
  id: number;

  /**
   * Name member
   */
  name: string;

  /**
   * Profession member
   */
  description: string;

  /**
   * Image Url
   */
  imageUrl: string;
}

/**
 * VerticalContainer props
 */
interface TeamMemberProps {

  /**
   * Additional custom class name
   */
  member: TeamMemberType;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Team member
 */
export const TeamMember = (props: TeamMemberProps) => {
  return (
    <VerticalContainer className={styles.ourTeamMember}>
      <Avatar
        alt={props.member.name}
        src={props.member.imageUrl}
        size={AvatarSize.LARGE}
        className={styles.avatar}
      />
      <div>
        {props.member.name}
      </div>
      <div>
        {props.member.description}
      </div>
    </VerticalContainer>
  );
};
