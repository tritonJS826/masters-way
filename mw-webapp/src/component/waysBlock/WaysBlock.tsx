import {useEffect, useState} from "react";
import {WayCard} from "src/component/waysBlock/wayCard/WayCard";
import {Way} from "src/model/firebaseCollection/Way";
import {WayService} from "src/service/WayService";
import styles from "src/component/waysBlock/WaysBlock.module.scss";

export const WaysBlock = () => {
  const [ways, setWays] = useState<Way[]>([]);

  useEffect(() => {
    const detachListener = WayService.onValueFromRealTimeDb(setWays);

    return () => {
      detachListener();
    };
  }, []);

  const renderWays = () => {
    return ways.map((way) => (
      <WayCard
        key={way.uuid}
        isCompleted={`${way.isCompleted}`}
      />
    ),
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Ways:
      </h2>
      <ul>
        {renderWays()}
      </ul>
    </div>
  );
};