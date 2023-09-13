import {useState, useEffect} from "react";
import {Way} from "src/model/firebaseCollection/Way";
import {WayCard} from "src/component/waysBlock/wayCard/WayCard";
import styles from "src/component/waysBlock/WaysBlock.module.scss";

export const WaysBlock = () => {
  const [ways] = useState<Way[]>([]);

  useEffect(() => {
    //TODO: need to add setWays if we will need to render ways on the page or delete this component
    // WayService.onValueFromRealTimeDb(setWays);
    // setWays(waysList);
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