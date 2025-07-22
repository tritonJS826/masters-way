import {useState} from "react";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Text} from "src/component/text/Text";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {downloadTestAsPDF} from "src/logic/lobbyTestPage/renderTestAsPdf/downloadTestAsPDF";
import {Test} from "src/model/businessModel/Test";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/lobbyTestPage/downloadPdfModal/dowloadPdfModal.module.scss";

/**
 * Props for PDF download modal
 */
interface DownloadPDFModalProps {

  /**
   * Test data to download
   */
  test: Test;

  /**
   * Time to complete the test
   */
  timeToTest: number;

  /**
   * Language for the PDF
   */
  language: Language;

  /**
   * Function to close the modal
   */
  onClose: () => void;
}

/**
 * Reusable PDF download modal component
 */
export const DownloadPDFModal = (props: DownloadPDFModalProps) => {

  const [isIncludeAnswers, setIsIncludeAnswers] = useState(false);

  /**
   * Handle download
   */
  const handleDownload = () => {
    downloadTestAsPDF(props.test, props.timeToTest, props.language, isIncludeAnswers);
    props.onClose();

  };

  return (
    <VerticalContainer className={styles.modalContainer}>
      <HorizontalContainer className={styles.modalCheckboxContainer}>
        <Checkbox
          isDefaultChecked={isIncludeAnswers}
          onChange={() => setIsIncludeAnswers(!isIncludeAnswers)}
        />
        <Text text={LanguageService.lobbyTest.downloadPDFModal.includeAnswers[props.language]} />

      </HorizontalContainer>
      <HorizontalContainer className={styles.modalButtonsContainer}>
        <Button
          value={LanguageService.lobbyTest.downloadPDFModal.download[props.language]}
          buttonType={ButtonType.PRIMARY}
          onClick={handleDownload}
        />
        <Button
          value={LanguageService.lobbyTest.downloadPDFModal.cancel[props.language]}
          buttonType={ButtonType.SECONDARY}
          onClick={props.onClose}
        />
      </HorizontalContainer>
    </VerticalContainer>
  );
};

