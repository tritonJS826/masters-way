# Unity <-> react integration data (events)

## Unity->React (React.jslib unity)
1. GameStarted: undefined
2. GameFinished: undefined
3. UserAnsweredQuestion: {
    questionUuid: string,
    userAnswer: string
}
4. UserCapturedTarget: {
    questionUuid: string
}
5. UserReadyToStartPlay {
    userUuid: string,
}
6. HostStartedGame: {
    <!-- percentage from 0.01x to 100x -->
    speedScale: number,
    <!-- seconds from 1 to 1800 -->
    enemyInterval: number,
}

## React->Unity ()
1. QuestionListReceived: {
        questions: []QuestionUnity{
            answer: string,
            name: string,
            order: number,
            questionText: string,
            uuid: string,
            <!-- seconds -->
            timeToAnswer: number,
}}
2. SessionStateUpdated: {
    selfUserUuid: string,
    <!-- url to invite other -->
    shareUrl: string,
    userHostUuid: string,
    currentUsers: {
        userUuid: string
        userName: string
    }[]
}
2. UserJoinedSession: {
    userUuid: string,
    userName: string
}
3. UserReadyToStartPlay: {
    userUuid: string
}
4. HostStartedGame: {
    <!-- percentage from 0.01x to 100x -->
    speedScale: number,
    <!-- seconds from 1 to 1800 -->
    enemyInterval: number,
}
5. UserCapturedTarget: {
    userUuid: string,
    questionUuid: string,
}
6. UserAnsweredQuestion: {
    userUuid: string,
    questionUuid: string,
}
7. UserAnswerHandledByServer: {
        isOk: bool,
        userUuid: string,
        userAnswer: string,
        questionName: string,
        questionDescription: string,
        questionAnswer: string,
        resultDescription: string,
        questionUuid: string,
        <!-- handledAnswer identificator -->
        uuid: string 
}