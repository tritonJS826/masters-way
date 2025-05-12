import {ReactElement, useState} from "react";
import Picker from "@emoji-mart/react";
import {Content as DialogContent, Root as DialogRoot, Trigger as DialogTrigger} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Theme, themeStore} from "src/globalStore/ThemeStore";
import styles from "src/component/emojiPicker/EmojiPickerPopover.module.scss";

/**
 * Emoji type from @emoji-mart/react
 */
export interface Emoji {

  /**
   * Emoji native
   */
  native: string;
}

/**
 * EmojiPickerPopover props
 */
interface EmojiPickerPopoverProps {

  /**
   * Callback triggered when emoji is selected
   */
  onEmojiSelect: (emoji: Emoji) => void;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * EmojiPickerPopover component
 */
export const EmojiPickerPopover = (props: EmojiPickerPopoverProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const {theme} = themeStore;

  /**
   * Translate app theme to emoji picker theme
   */
  const emojiPickerTheme = () => theme === Theme.LIGHT ? "light" : "dark";

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          icon={
            <Icon
              size={IconSize.SMALL}
              name="EmojiIcon"
            />
          }
          onClick={() => {}}
          buttonType={ButtonType.ICON_BUTTON}
          dataCy={props.dataCy}
        />
      </DialogTrigger>
      <DialogContent
        className={styles.popover}
        onInteractOutside={() => setIsOpen(false)}
      >
        <div className={styles.emojiPicker}>
          <Picker
            theme={emojiPickerTheme()}
            previewPosition="none"
            onEmojiSelect={(emoji: Emoji) => {
              props.onEmojiSelect(emoji);
              setIsOpen(false);
            }}
          />
        </div>
      </DialogContent>
    </DialogRoot>
  );
};
