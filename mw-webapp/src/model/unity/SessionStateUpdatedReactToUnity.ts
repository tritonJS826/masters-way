type UserInfo = {

    /**
     * User's uuid
     */
    userUuid: string;
}

export type SessionStateUpdatedReactToUnity = {

    /**
     * User uuid
     */
    currentUsers: UserInfo[];

    /**
     * Link for sharing
     */
    shareUrl: string;

    /**
     * Current user uuid (current player)
     */
    selfUserUuid: string;

    /**
     * Host of the session
     */
    userHostUuid: string;

}
