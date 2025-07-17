export type UserInfo = {

  /**
   * UserUuid
   */
  userUuid: string;
}

/**
 * Current SOL unity session state
 */
export class CurrentSessionState {

  /**
   * Current users
   */
  public currentUsers: UserInfo[];

  constructor(currentSessionStateProps: CurrentSessionState) {
    this.currentUsers = currentSessionStateProps.currentUsers;
  }

}
