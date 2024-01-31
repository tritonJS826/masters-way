UserDTO #collection
uuid: string
name: string
email: string
ownWayUuids: string[] @Way.uuid
favoriteWayUuids: string[] @Way.uuid
mentoringWayUuids: string[] @Way.uuid
description: string
createdAt: timestamp
customWayCollectionsStringified: string[] stringified@WaysCollection
favoriteForUserUuids: string[] @User.uuid
favoriteUserUuids: string[] @User.uuid

WayDTO #collection
uuid: string
name: string
dayReportUuids: string[] @DayReport.uuid[]
ownerUuid: string @User.uuid
goalUuid: string @Goal.uuid
isCompleted: boolean
lastUpdate: timestamp
favoriteForUserUuids: string[] @User.uuid[]
mentorUuids: string[] @User.uuid[]
formerMentorUuids: string[] @User.uuid
mentorRequestUuids: string[] @User.uuid
createdAt: timestamp
wayTags: string[]
jobDoneTags: string[]
copiedFromWayUuid: string

DayReportDTO #collection
uuid: string
createdAt: timestamp
jobsDoneStringified: string[] stringified@JobDone
plansStringified: string[] stringified@PlanForNextPeriod
problemsStringified: string[] stringified@CurrentProblem
commentsStringified: string[] stringified@Comment
isDayOff: boolean

GoalDTO #collection
uuid: string
studentUuid: string @UserUuid
metricsStringified: string[] stringified@Metric
description: string
estimationTime: number

MetricDTO
uuid: string
description: string
isDone: boolean
doneDate: number|null

PlanDTO
uuid: string
job: string
estimationTime: number
ownerUuid: string @User.uuid
tags: string[]

JobDoneDTO
uuid: string
description: string
time: number
tags: string[]

ProblemDTO
uuid: string
description: string
isDone: boolean
ownerUuid: string @User.uuid
tags: string[]

CommentDTO
uuid: string
ownerUuid: string @User.uuid
description: string
isDone: boolean
tags: string[]

WaysCollectionDTO
id: string
name: string
wayUuids: string[]
