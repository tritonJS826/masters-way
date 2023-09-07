import styles from "src/component/waysBlock/wayCard/WayCard.module.scss";

interface WayCardProps {
  isCompleted: string;
}

export const WayCard = (props: WayCardProps) => {
  return (
    <li className={styles.container}>
      <div>
        {`Completed: ${props. isCompleted}`}
      </div>
    </li>
  );
};