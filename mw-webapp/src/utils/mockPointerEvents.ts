import {vi} from "vitest";

/**
 * Mock pointer events for Vitest because jsdom does not support them. Radix Select uses them.
 * YOU SHOULD RESTORE ORIGINAL POINTER EVENTS (use {@link restoreOriginalPointerEvents}) AT THE END OF THE TEST
 * WHERE {@link mockPointerEvents} was executed
 */
export function withMockPointerEvents(callback: () => void) {
  // Save original pointer events
  const originalHasPointerCapture = HTMLElement.prototype.hasPointerCapture;
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
  const originalReleasePointerCapture =
    HTMLElement.prototype.releasePointerCapture;

  // Mock pointer events
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();

  callback();

  // Restore pointer events after tests
  window.HTMLElement.prototype.hasPointerCapture = originalHasPointerCapture;
  window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  window.HTMLElement.prototype.releasePointerCapture =
    originalReleasePointerCapture;
}
