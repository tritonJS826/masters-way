import {useState} from "react";
import {DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger, Root as DialogRoot} from "@radix-ui/react-dialog";
import {Avatar} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input, InputType} from "src/component/input/Input";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/chat/Chat.module.scss";

/**
 * Chat props
 */
interface ChatProps {

  /**
   * Controls whether the modal is initially open or closed.
   * @default false
   */
  isOpen?: boolean;

  /**
   * Value for chat trigger button
   */
  triggerText: string;

  /**
   * Title for chat
   */
  chatTitle: string;

  /**
   * Title for contacts list
   */
  contactsTitle: string;

}

/**
 * Chat component
 */
export const Chat = (props: ChatProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <div
          role="button"
          className={styles.chatTrigger}
        >
          <Icon
            name="WayIcon"
            size={IconSize.SMALL}
            className={styles.chatIcon}
          />
          <div className={styles.chatTriggerText}>
            {props.triggerText}
          </div>
        </div>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className={styles.chatOverlay} />
        <DialogContent className={styles.chatContent}>
          <VerticalContainer className={styles.chatContainer}>
            <HorizontalContainer className={styles.chatHeader}>
              <Title
                level={HeadingLevel.h2}
                placeholder=""
                text={props.chatTitle}
              />
              <DialogClose asChild>
                <div
                  role="button"
                  className={styles.removeButton}
                >
                  <Icon
                    size={IconSize.SMALL}
                    name="RemoveIcon"
                    className={styles.removeIcon}
                  />
                </div>

              </DialogClose>
            </HorizontalContainer>

            <HorizontalContainer className={styles.chatContactsMessages}>
              <VerticalContainer className={styles.contacts}>
                <Title
                  level={HeadingLevel.h3}
                  placeholder=""
                  text={props.contactsTitle}
                />
                <VerticalContainer className={styles.chatList}>
                  <HorizontalContainer>
                    <Avatar
                      alt="Jonnie"
                      src={null}
                    />
                    <VerticalContainer>
                      <p className={styles.chatItem}>
                        Jonnie Joe
                      </p>
                      <span>
                        online
                      </span>
                    </VerticalContainer>
                  </HorizontalContainer>
                  <HorizontalContainer>
                    <Avatar
                      alt="Veratsennikava Katsiaryna"
                      src={null}
                    />
                    <VerticalContainer>
                      <p className={styles.chatItem}>
                        VeratsennikavaKatsiarynaVeratsennikavaKatsiaryna
                      </p>
                      <span>
                        offline
                      </span>
                    </VerticalContainer>
                  </HorizontalContainer>
                </VerticalContainer>
              </VerticalContainer>

              <VerticalContainer className={styles.chatBlock}>
                <HorizontalContainer className={styles.chatInfo}>
                  <HorizontalContainer>
                    <Avatar
                      alt="Veratsennikava Katsiaryna"
                      src={null}
                    />
                    <VerticalContainer>
                      <p className={styles.chatItem}>
                        VeratsennikavaKatsiarynaVeratsennikavaKatsiaryna
                      </p>
                      <span>
                        offline
                      </span>
                    </VerticalContainer>
                  </HorizontalContainer>

                  <Button
                    buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                    onClick={() => {}}
                    icon={
                      <Icon
                        size={IconSize.MEDIUM}
                        name={"MoreVertical"}
                      />
                    }
                  />
                </HorizontalContainer>
                <VerticalContainer className={styles.messageList}>
                  Coming soon!
                </VerticalContainer>
              </VerticalContainer>
            </HorizontalContainer>

            <HorizontalContainer className={styles.messageInputBlock}>
              <Input
                value=""
                onChange={() => {}}
                placeholder="Write a message..."
                typeInput={InputType.Border}
              />
              <Button
                value="Send"
                onClick={() => {}}
                buttonType={ButtonType.PRIMARY}
              />
            </HorizontalContainer>

          </VerticalContainer>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
