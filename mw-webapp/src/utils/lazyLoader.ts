
/**
 * LazyLoader class to load libraries only once
 */
export class LazyLoader {

  /** Cached pdfmake instance */
  private static pdfMake: typeof import("pdfmake/build/pdfmake") | null = null;

  /**
   * Get pdfmake instance
   * @returns pdfmake instance
   */
  public static async getPDFMake(): Promise<typeof import("pdfmake/build/pdfmake")> {
    if (!LazyLoader.pdfMake) {
      try {
        const pdfMake = await import("pdfmake/build/pdfmake");
        LazyLoader.pdfMake = pdfMake.default;
        LazyLoader.pdfMake.fonts = {
          Roboto: {
            normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Regular.ttf",
            bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Medium.ttf",
            italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Italic.ttf",
            bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-MediumItalic.ttf",
          },
        };
      } catch (error) {
        throw new Error("Failed to load pdfmake library");
      }
    }

    return LazyLoader.pdfMake;
  }

}
