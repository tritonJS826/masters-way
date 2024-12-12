const HEIGHT_FROM_BOTTOM_POSITION = 10;

/**
 * Formatted date
 */
export class ScrollEventUtils {

  /**
   * Check the scroll position
   */
  public static handleScrollPosition(
    element: HTMLDivElement | null,
    isMoreElementExist: boolean,
    callback: () => Promise<void>,
  ): void {
    if (isMoreElementExist
      && element
      && (element.scrollHeight - element.scrollTop - element.clientHeight) <= HEIGHT_FROM_BOTTOM_POSITION
    ) {
      callback();
    }
  }

}
