import {vi} from "vitest";

/**
 * Build functions to mock and restore pointer event
 */
function makeMockPointer() {
  // Save fields to restore them later
  const originalHasPointerCapture = HTMLElement.prototype.hasPointerCapture;
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
  const originalReleasePointerCapture = HTMLElement.prototype.releasePointerCapture;

  /**
   * Function to mock pointer event
   * After this function {@link restorePointerEvents} should be called
   */
  const mockPointerEvents = () => {
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  };

  /**
   * Function to restore pointer event
   * Should be called after {@link mockPointerEvents}
   */
  const restorePointerEvents = () => {
    window.HTMLElement.prototype.hasPointerCapture = originalHasPointerCapture;
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    window.HTMLElement.prototype.releasePointerCapture = originalReleasePointerCapture;
  };

  return {
    mockPointerEvents,
    restorePointerEvents,
  };
}

/**
 * Mock pointer events for Vitest because jsdom does not support them. Radix Select uses them.
 */
export function withMockPointerEvents(callback: () => Promise<void>) {
  return async () => {
    const {mockPointerEvents, restorePointerEvents} = makeMockPointer();
    try {
      mockPointerEvents();
      await callback();
    } finally {
      restorePointerEvents();
    }
  };
}
