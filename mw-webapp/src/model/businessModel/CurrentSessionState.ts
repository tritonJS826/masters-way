export type UserInfo = {

  /**
   * UserUuid
   */
  userUuid: string;

  /**
   * User's name
   */
  userName: string;
}

/**
 * Current SOL unity session state
 */
export class CurrentSessionState {

  /**
   * Current users
   */
  public currentUsers: UserInfo[];

  /**
   * Session's user-host's uuid
   */
  public userHostUuid: string;

  constructor(currentSessionStateProps: CurrentSessionState) {
    this.currentUsers = currentSessionStateProps.currentUsers;
    this.userHostUuid = currentSessionStateProps.userHostUuid;
  }

}
