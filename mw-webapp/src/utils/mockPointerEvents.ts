import {vi} from "vitest";

/**
 * Mock pointer events for Vitest because jsdom does not support them. Radix Select uses them
 */
export function mockPointerEvents() {
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
}
