import {makeAutoObservable} from "mobx";

/**
 * Test session result props
 */
interface TestSessionResultProps {

  /**
   * Test's UUID
   */
  testUuid: string;

  /**
   * Session's UUID
   */
  sessionUuid: string;

  /**
   * Test's session result description
   */
  resultDescription: string;

  /**
   * Date when test session result was created
   */
  createdAt: Date;

}

/**
 * Test session result model
 */
export class TestSessionResult {

  /**
   * Test's UUID
   */
  public testUuid: string;

  /**
   * Session's UUID
   */
  public sessionUuid: string;

  /**
   * Test's session result description
   */
  public resultDescription: string;

  /**
   * Date when test session result was created
   */
  public createdAt: Date;

  constructor(testSessionResultData: TestSessionResultProps) {
    makeAutoObservable(this);
    this.testUuid = testSessionResultData.testUuid;
    this.sessionUuid = testSessionResultData.sessionUuid;
    this.resultDescription = testSessionResultData.resultDescription;
    this.createdAt = testSessionResultData.createdAt;
  }

}
