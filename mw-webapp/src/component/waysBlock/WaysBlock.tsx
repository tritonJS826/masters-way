import {useState, useEffect} from "react";
import {Way} from "src/model/firebaseCollection/Way";
import {WayService} from "src/service/WayService";
import {WayCard} from "src/component/waysBlock/wayCard/WayCard";
import styles from "src/component/waysBlock/WaysBlock.module.scss";

export const WaysBlock = () => {
  const [ways, setWays] = useState<Way[]>([]);

  useEffect(() => {
    WayService.onValueFromRealTimeDb(setWays);
    () => {
      //TODO
      // removeEventListener from db if needed (read about handling event listeners
      // in react use effect components (when and whyu you shoud remove them))
    };
  }, []);

  const renderWays = () => {
    return ways.map((way) => (
      <WayCard key={way.uuid}
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