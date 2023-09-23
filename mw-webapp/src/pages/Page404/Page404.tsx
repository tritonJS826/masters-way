import {Heading} from "@radix-ui/themes";
import {HeadingLevel} from "src/component/title/Title";
import styles from "src/pages/page404/Page404.module.scss";

const ERROR_404 = "404 NOT FOUND";

export const Page404 = () => {
  return (
    <Heading
      as={HeadingLevel.h2}
      className={styles.errorPageContainer}
    >
      {ERROR_404}
    </Heading>
  );
};