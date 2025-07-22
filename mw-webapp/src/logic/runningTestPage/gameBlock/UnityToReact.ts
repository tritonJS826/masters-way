/**
 * Event names used to send from Unity to React.
 */
export enum UnityToReactEvents {
  GameFinished = "GameFinished",
  HostStartedGame = "HostStartedGame",
  GameStarted = "GameStarted",
  UserReadyToStartPlay = "UserReadyToStartPlay",
  UserAnsweredQuestion = "UserAnsweredQuestion",
  UserCapturedTarget = "UserCapturedTarget"
}
