/**
 * RunningTestPage props
 */

/**
 * Parameters for test
 */
export interface RunningTestPageProps {

  /**
   * Test's Uuid
   */
  testUuid: string;

  /**
   * Session's Uuid
   */
  sessionUuid: string;

  /**
   * If true - test loading in game mode, if false - usual test
   */
  isGameMode: boolean;
}
