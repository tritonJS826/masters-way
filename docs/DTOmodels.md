UserDTO #collection
uuid: string
name: string
email: string
description: string
createdAt: timestamp
ownWayUuids: string[] @Way.uuid
favoriteWayUuids: string[] @Way.uuid
mentoringWayUuids: string[] @Way.uuid
customWayCollectionsStringified: string[] stringified@WaysCollection
favoriteForUserUuids: string[] @User.uuid
favoriteUserUuids: string[] @User.uuid
tagsStringified: string[] stringified@UserTag
imageUrl: string
isMentor: boolean
wayRequestUuids: string[] @WayUuid

WayDTO #collection
uuid: string
name: string
dayReportUuids: string[] @DayReport.uuid[]
ownerUuid: string @User.uuid
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
goalDescription: string
metricsStringified: string[] stringified@Metric
estimationTime: number

DayReportDTO #collection
uuid: string
createdAt: timestamp
jobsDoneStringified: string[] stringified@JobDone
plansStringified: string[] stringified@PlanForNextPeriod
problemsStringified: string[] stringified@CurrentProblem
commentsStringified: string[] stringified@Comment
isDayOff: boolean

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
