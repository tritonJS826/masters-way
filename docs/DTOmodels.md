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
goalDescription: string
createdAt: timestamp
lastUpdate: timestamp
estimationTime: number
ownerUuid: string @User.uuid
copiedFromWayUuid: string
dayReportUuids: string[] @DayReport.uuid[]
status: string | null,
favoriteForUserUuids: string[] @User.uuid[]
mentorUuids: string[] @User.uuid[]
formerMentorUuids: string[] @User.uuid
mentorRequestUuids: string[] @User.uuid
metricsStringified: string[] stringified@Metric
wayTagsStringified: string[] stringified@WayTag
jobTagsStringified: string[] stringified@JobTag

DayReportDTO #collection
uuid: string
createdAt: timestamp
updatedAt: timestamp
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

UserTagDTO
uuid: string
name: string

WayTagDTO
uuid: string
name: string

JobTagDTO
uuid: string
name: string
description: string
color: string