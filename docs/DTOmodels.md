UserDTO
uuid: string
name: string
email: string
ownWayUuids: string[] @Way.uuid
favoriteWayUuids: string[] @Way.uuid
mentoringWayUuids: string[] @Way.uuid
description: string

WayDTO
uuid: string
name: string
dayReportUuids: string[] @DayReport.uuid[]
ownerUuId: string @User.uuid
monthReportUuids: string[] @MonthReport.uuid[]
goalUuid: string @Goal.uuid
currentMentorUuids: string[] @User.uuid[]
isCompleted: boolean
lastUpdate: timestamp
favoriteForUserUuids: string[] @User.uuid[]
mentorUuids: string[] @User.uuid[]
mentorRequestUuids: string[] @User.uuid

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

JobDoneDTO
uuid: string
description: string
time: number (sec)

CurrentProblemDTO
uuid: string
description: string
isDone: boolean
ownerUuid: string @User.uuid

CommentDTO
uuid: string
ownerUuid: string @User.uuid
description: string
isDone: boolean

GoalMetricDTO
uuid: string
description: string
isDone: boolean
doneDate: timestamp

// Do we need it? Maybe for later
MonthReportDTO
uuid: string
date: string
jobDoneUuids: string[] @JobDone.uuid[]
planForNextPeriodUuids: string[] @PlanForNextPeriod.uuid[]
problemForCurrentPeriodUuids: string[] @CurrentProblem.uuid[]
commentUuids: string[] @MentorComment.uuid[]
