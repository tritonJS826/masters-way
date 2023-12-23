UserDTO
uuid: string
name: string
email: string
ownWayUuids: string[] @Way.uuid
favoriteWayUuids: string[] @Way.uuid
mentoringWayUuids: string[] @Way.uuid
description: string
createdAt: timestamp

WayDTO
uuid: string
name: string
dayReportUuids: string[] @DayReport.uuid[]
ownerUuId: string @User.uuid
goalUuid: string @Goal.uuid
isCompleted: boolean
lastUpdate: timestamp
favoriteForUserUuids: string[] @User.uuid[]
mentorUuids: string[] @User.uuid[]
mentorRequestUuids: string[] @User.uuid
createdAt: timestamp
wayRags: string[]
jobDoneTags: string[]

DayReportDTO
uuid: string
date: timestamp // deprecated
jobDoneUuids: string[] @JobDone.uuid[] // deprecated
planForNextPeriodUuids: string[] @PlanForNextPeriod.uuid[] // deprecated
problemForCurrentPeriodUuids: string[] @CurrentProblem.uuid[] // deprecated
commentUuids: string[] @Comment.uuid[] // // deprecated
createdAt?: timestamp
jobsDoneStringified?: string[] @JobDone
plansStringified?: string[] @PlanForNextPeriod
problemsStringified?: string[] @CurrentProblem
commentsStringified?: string[] @Comment
isDayOff: boolean


GoalDTO
uuid: string
studentUuid: string @UserUuid
metricUuids: string[] @GoalMetric.uuid[] // only one element in the array
description: string
estimationTime: number

PlanForNextPeriodDTO (subCollection of DayReport)
uuid: string
job: string
estimationTime: number
ownerUuid: string @User.uuid
tags: string[]

JobDoneDTO (subCollection of DayReport)
uuid: string
description: string
time: number
tags: string[]

CurrentProblemDTO (subCollection of DayReport)
uuid: string
description: string
isDone: boolean
ownerUuid: string @User.uuid
tags: string[]

CommentDTO (subCollection of DayReport)
uuid: string
ownerUuid: string @User.uuid
description: string
isDone: boolean
tags: string[]

GoalMetricDTO
uuid: string
metricUuids: string[]
description: string[]
isDone: boolean[]
doneDate: (timestamp|null)[]
