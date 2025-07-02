import type {TFontDictionary} from "pdfmake/interfaces";

/**
 * Pdfmake instance to make sure that the library is loaded only once
 */
let pdfMakeInstance: typeof import("pdfmake/build/pdfmake") | null;

/**
 * Fonts configuration
 */
const fonts: TFontDictionary = {
  Roboto: {
    normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Medium.ttf",
    italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

/**
 * Loads the pdfmake library and caches the instance
 * @returns The pdfmake instance
 */
export const pdfMakeLazyLoader = async () => {
  if (!pdfMakeInstance) {
    try {
      const pdfMake = await import("pdfmake/build/pdfmake");
      pdfMakeInstance = pdfMake.default;
      pdfMakeInstance.fonts = fonts;
    } catch (error) {
      throw new Error("Failed to load pdfmake library");
    }
  }

  return pdfMakeInstance;
};
