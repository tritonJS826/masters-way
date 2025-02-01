import {vi} from "vitest";

/**
 * Mock pointer events for Vitest because jsdom does not support them. Radix Select uses them
 */
export function mockPointerEvents() {
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
}

/**
 * Restore pointer events after tests
 */
export function restoreOriginalPointerEvents() {
  window.HTMLElement.prototype.hasPointerCapture =
    HTMLElement.prototype.hasPointerCapture;
  window.HTMLElement.prototype.scrollIntoView =
    HTMLElement.prototype.scrollIntoView;
  window.HTMLElement.prototype.releasePointerCapture =
    HTMLElement.prototype.releasePointerCapture;
}
