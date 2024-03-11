// Import {useState} from "react";
// import {SchemasUserPlainResponse} from "src/apiAutogenerated";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
// Import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {useGlobalContext} from "src/GlobalContext";
import {LanguageService as LangService} from "src/service/LangauageService";
// Import {UserServiceU} from "src/serviceUpdated/UserService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

/**
 * About project page
 */
export const AboutProjectPage = () => {
  const {language} = useGlobalContext();

  // Const [x, setX] = useState<SchemasUserPlainResponse[]>();

  // /**
  //  * Sdf
  //  */
  // const loadX = async () => {
  //   try {
  //     // Const a = await fetch("http://localhost:8000/api/users");
  //     // console.log(await a.json());
  //     const data = await UserServiceU.getAllUsers();
  //     console.log("yep", data);
  //     setX(data);
  //   } catch {
  //     // Console.log("nope");
  //   }
  // };

  // /**
  //  * Sdf
  //  */
  // const createX = async () => {
  //   const user = await UserServiceU.createUser({
  //     request: {
  //       name: "hihi",
  //       email: "fghmail@gmail.com",
  //       description: "vvv",
  //       imageUrl: "",
  //       isMentor: false,
  //     },
  //   });

  //   console.log("ya", user);
  // };

  // /**
  //  * Sdf
  //  */
  // const getX = async () => {
  //   const user = await UserServiceU.getUserByUuid({userId: "e65d2d3f-c594-4181-a9da-e083c003c0c2"});

  //   console.log("get user by uuid", user);
  // };

  // /**
  //  * Sdf
  //  */
  // const updateX = async () => {
  //   const user = await UserServiceU.updateUser({
  //     userId: "e65d2d3f-c594-4181-a9da-e083c003c0c2",
  //     request: {name: "It's updated user name!"},
  //   });

  //   console.log("updated user", user);
  // };

  const accordionItems = LangService.aboutProject.accordion.map((data) => ({
    trigger: {child: data.header[language]},
    content: {child: renderMarkdown(data.description[language])},
  }));

  return (
    <div className={styles.pageWrapper}>
      {/* <Button
        value="fetch"
        onClick={loadX}
      />
      <Button
        value="create"
        onClick={createX}
      />
      <Button
        value="getUserByUuid"
        onClick={getX}
      />
      <Button
        value="updateUser"
        onClick={updateX}
      /> */}
      <Title
        level={HeadingLevel.h2}
        text={LangService.aboutProject.mainTitle[language]}
      />

      <div className={styles.projectDescription}>
        {renderMarkdown(LangService.aboutProject.projectDescription[language])}
      </div>

      <Title
        level={HeadingLevel.h2}
        text={LangService.aboutProject.accordionTitle[language]}
      />

      <Accordion
        items={accordionItems}
        type={accordionTypes.multiple}
        className={styles.accordion}
      />
    </div>
  );
};
