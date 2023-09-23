import {useEffect, useState} from "react";
import {WayCard} from "src/component/waysBlock/wayCard/WayCard";
import {WayDTO} from "src/model/firebaseCollection/WayDTO";
import {WayService} from "src/service/WayService";
import styles from "src/component/waysBlock/WaysBlock.module.scss";

export const WaysBlock = () => {
  const [ways, setWays] = useState<WayDTO[]>([]);

  const setWaysValue = async () => {
    setWays(await WayService.getWays());
  };

  useEffect(() => {
    setWaysValue();
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