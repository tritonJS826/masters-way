import {Modal} from "src/component/modal/Modal";
import {SupportModalContent} from "src/logic/supportModal/supportModalContent/SupportModalContent";
import styles from "src/logic/supportModal/SupportModal.module.scss";

/**
 * Support component
 */
export const SupportModal = () => {

  return (
    <Modal
      trigger={
        <div className={styles.supportModalTrigger}>
          ?
        </div>
      }
      content={<SupportModalContent />}
      contentClassName={styles.modalContent}
    />
  );
};
