import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import styles from "src/component/tab/Tab.module.scss";

/**
 * TabTrigger props
 */
interface TabTriggerProps {

  /**
   * Tab's trigger Id
   */
  id: string;

  /**
   * Tab's value
   */
  value: string;

  /**
   * Additional className for tab trigger
   */
  className?: string;
}

/**
 * TabTrigger props
 */
interface TabContentProps {

  /**
   * Tab's content Id
   */
  id: string;

  /**
   * Tab's value
   */
  value: JSX.Element;

  /**
   * Additional className for tab trigger
   */
  className?: string;
}

/**
 * Tab item props
 */
export interface TabItemProps {

  /**
   * Tab's item Id
   */
  id: string;

  /**
   * Tab item trigger
   */
  tabTrigger: TabTriggerProps;

  /**
   * Tab item content
   */
  tabContent: TabContentProps;

  /**
   * Tab value
   */
  value: string;

  /**
   * Callback triggered on tab click
   */
  onCLick?: () => void;
}

/**
 * Tab props
 */
interface TabProps {

  /**
   * Tab's list
   */
  tabList: TabItemProps[];

  /**
   * Tab's default value
   */
  defaultValue?: string;

  /**
   * Is tabs vertical
   */
  isVertical?: boolean;

  /**
   * Sdf
   */
  className?: string;

}

/**
 * Tab component
 */
export const Tab = observer((props: TabProps) => {
  return (
    <Tabs.Root
      className={clsx(styles.tabsRoot, styles.className)}
      defaultValue={props.defaultValue ?? props.tabList[0].value}
    >
      <Tabs.List
        className={clsx(styles.tabsList, props.isVertical && styles.vertical)}
        aria-label="User's collections and projects"
      >
        {props.tabList.map((tab) => (
          <Tabs.Trigger
            key={tab.tabTrigger.id}
            className={styles.tabsTrigger}
            value={tab.value}
            onClick={tab.onCLick}
          >
            {tab.tabTrigger.value}
          </Tabs.Trigger>
        ))
        }
      </Tabs.List>
      {props.tabList.map((tab) => (
        <Tabs.Content
          key={tab.tabContent.id}
          className={styles.tabsContent}
          value={tab.value}
        >
          {tab.tabContent.value}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
});

