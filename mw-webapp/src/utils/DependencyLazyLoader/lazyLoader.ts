import {PdfDownloader} from "src/utils/DependencyLazyLoader/dependencies/pdfdownloader";

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

