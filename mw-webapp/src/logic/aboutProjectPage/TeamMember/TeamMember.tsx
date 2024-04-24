import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
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
  profession: string;

  /**
   * Image Url
   */
  imageUrl: string;
}

export const teamMembers: TeamMemberType[] = [
  {
    id: 1,
    name: "Viktar Veratsennikau",
    profession: "Founder",
    imageUrl: "",
  },
  {
    id: 2,
    name: "Ekaterina Veretennikova",
    profession: "Team Leader",
    imageUrl: "",
  },
  {
    id: 3,
    name: "Sergei Aslanov",
    profession: "developer",
    imageUrl: "",
  },
  {
    id: 4,
    name: "Marat Assimbayev",
    profession: "developer",
    imageUrl: "",
  },
  {
    id: 5,
    name: "Alexandr Chorniy",
    profession: "developer",
    imageUrl: "",
  },
];

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
    <div className={styles.ourTeamMember}>
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
        {props.member.profession}
      </div>
    </div>
  );
};
