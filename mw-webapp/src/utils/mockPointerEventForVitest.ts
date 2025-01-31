import {vi} from "vitest";

/**
 * The MockPointerEvent class overrides the default PointerEvent to ensure the dropdown interactions work in tests.
 */
export class MockPointerEvent extends Event {

  /**
   * Represents which mouse or pointer button was pressed.
   * Uses the `PointerButton` enum
   */
  private button: number;

  /**
   * * Indicates whether the `Ctrl` key was pressed during the event.
   */
  private ctrlKey: boolean;

  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button ?? 0;
    this.ctrlKey = props.ctrlKey ?? false;
  }

}
window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
