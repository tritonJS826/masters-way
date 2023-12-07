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
date: timestamp
jobDoneUuids: string[] @JobDone.uuid[]
planForNextPeriodUuids: string[] @PlanForNextPeriod.uuid[]
problemForCurrentPeriodUuids: string[] @CurrentProblem.uuid[]
commentUuids: string[] @Comment.uuid[]
isDayOff: boolean


GoalDTO
uuid: string
studentUuid: string @UserUuid
metricUuids: string[] @GoalMetric.uuid[]
description: string
estimationTime: number

PlanForNextPeriodDTO
uuid: string
job: string
estimationTime: number (sec)
ownerUuid: string @User.uuid
tags: string[]

JobDoneDTO
uuid: string
description: string
time: number (sec)
tags: string[]

CurrentProblemDTO
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

GoalMetricDTO
uuid: string
description: string
isDone: boolean
doneDate: timestamp
