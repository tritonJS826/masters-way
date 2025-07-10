import {TDocumentDefinitions, TFontDictionary} from "pdfmake/interfaces";
import {NotificationType} from "src/component/notification/displayNotification";
import {displayNotification} from "src/component/notification/Notification";
import {Language} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";

/**
 * PdfDownloader class to download pdf files
 */
class PdfDownloader {

  /**
   * PdfMake instance
   */
  private pdfMake: typeof import("pdfmake/build/pdfmake") | null = null;

  /**
   * Fonts configuration
   */
  private fonts: TFontDictionary = {
    Roboto: {
      normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Regular.ttf",
      bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Medium.ttf",
      italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Italic.ttf",
      bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-MediumItalic.ttf",
    },
  };

  /**
   * Create a PDF file and download it
   */
  public async createPdf(
    definition: TDocumentDefinitions,
    language: Language,
    fileName: string,
  ): Promise<void> {
    try {
      const pdfMake = await this.getPdfMake();
      const pdf = pdfMake.createPdf(definition);
      pdf.download(fileName);

      displayNotification({
        text: LanguageService.common.notifications.pdfDownloaded[language],
        type: NotificationType.INFO,
      });
    } catch (error) {
      displayNotification({
        text: "Downloading PDF failed. Please try again.",
        type: NotificationType.ERROR,
      });
    }
  }

  /**
   * Get PdfMake instance and initialize it if it's not initialized
   */
  private async getPdfMake(): Promise<
    typeof import("pdfmake/build/pdfmake")> {
    if (!this.pdfMake) {
      const pdfMakeModule = await import("pdfmake/build/pdfmake");
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.fonts = this.fonts;
    }

    return this.pdfMake;
  }

}

/**
 * LazyLoader class to load libraries only once
 */
export class LazyLoader {

  /**
   * PdfDownloader instance
   */
  private static pdfDownloader = new PdfDownloader();

  /**
   * Get PdfDownloader instance
   */
  public static getPdfDownloader(): PdfDownloader {
    return this.pdfDownloader;
  }

}
