# Unity <-> react integration data (events)

## Unity->React (React.jslib unity)
1. GameStarted: undefined
2. GameFinished: undefined
3. UserAnsweredQuestion: {
    questionUuid: string,
    userAnswer: string
}
4. (for multiplayer) UserCapturedTarget: {questionUuid: string}


## React->Unity ()
1. QuestionListReceived: {questions: []QuestionUnity{
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
    currentUsers: {
        userUuid: string
    }[]
}
2. UserJoinedSession: {
    userUuid: string
}
3. UserReadyToStartPlay: {
    userUuid: string
}
4. HostStartedGame: {}
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