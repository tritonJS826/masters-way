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

WayDTO #collection
uuid: string
name: string
dayReportUuids: string[] @DayReport.uuid[]
ownerUuId: string @User.uuid
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
metricUuids: string[] @GoalMetric.uuid[] // only one element in the array
description: string
estimationTime: number

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

GoalMetricDTO #collection
uuid: string
metricUuids: string[]
description: string[]
isDone: boolean[]
doneDate: (timestamp|null)[]

WaysCollectionDTO
id: string
name: string
uuids: string[]
