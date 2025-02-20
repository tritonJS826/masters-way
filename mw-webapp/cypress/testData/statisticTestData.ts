const colors = {
    yellow: "background-color: yellow;",
    green: "background-color: green;",
    blue: "background-color: blue;",
    red: "background-color: red;",
    teal: "background-color: rgb(0, 128, 128);"
} as const;

const labelActivityNames = {
    generalMeeting: "general meeting",
    database: "database",
    coding: "coding",
    meeting1To1: "meeting 1:1",
    studentLabel: "student label"
} as const;

export enum Periods {
    Total = "total",
    LastMonth = "lastMonth",
    LastWeek = "lastWeek"
};

export const statisticsData = {
    statisticsPlacement: {
        wayPage: "wayPage",
        modal: "modal"
    } as const,

    periodBlockTitles: {
        wayPage: {
            [Periods.Total]: "Total",
            [Periods.LastWeek]: "Last week",
            [Periods.LastMonth]: "",
        },
        modal: {
            [Periods.Total]: "totalModal",
            [Periods.LastMonth]: "lastMonthModal",
            [Periods.LastWeek]: "lastWeekModal"
        }
    },

    testWays: {
        johnDoeWay: {
            title: "john doe way" as const,
            daysFromStart: "38",

            statistic: {
                [Periods.Total]: { totalTime: "7.2", totalReports: "8", finishedJobs: "8", avgTimePerCalendarDay: "0.2", avgTimePerWorkingDay: "0.9", avgJobTime: "0.9" },
                [Periods.LastMonth]: { totalTime: "7.2", totalReports: "8", finishedJobs: "8", avgTimePerCalendarDay: "0.2", avgTimePerWorkingDay: "0.9", avgJobTime: "0.9" },
                [Periods.LastWeek]: { totalTime: "3.0", totalReports: "4", finishedJobs: "3", avgTimePerCalendarDay: "0.4", avgTimePerWorkingDay: "0.8", avgJobTime: "1.0" }
            },

            labelStatistics: {
                [Periods.Total]: {
                    row1: { name: labelActivityNames.generalMeeting, color: colors.yellow, jobsAmount: "1(12%)", time: "1(13%)" },
                    row2: { name: labelActivityNames.database, color: colors.green, jobsAmount: "3(37%)", time: "2.2(30%)" },
                    row3: { name: labelActivityNames.coding, color: colors.blue, jobsAmount: "2(25%)", time: "2(27%)" },
                    row4: { name: labelActivityNames.meeting1To1, color: colors.red, jobsAmount: "2(25%)", time: "2(27%)" }
                },

                [Periods.LastMonth]: {
                    row1: { name: labelActivityNames.generalMeeting, color: colors.yellow, jobsAmount: "1(12%)", time: "1(13%)" },
                    row2: { name: labelActivityNames.database, color: colors.green, jobsAmount: "3(37%)", time: "2.2(30%)" },
                    row3: { name: labelActivityNames.coding, color: colors.blue, jobsAmount: "2(25%)", time: "2(27%)" },
                    row4: { name: labelActivityNames.meeting1To1, color: colors.red, jobsAmount: "2(25%)", time: "2(27%)" }
                },

                [Periods.LastWeek]: {
                    row1: { name: labelActivityNames.database, color: colors.green, jobsAmount: "1(33%)", time: "1(33%)" },
                    row2: { name: labelActivityNames.coding, color: colors.blue, jobsAmount: "1(33%)", time: "1(33%)" },
                    row3: { name: labelActivityNames.meeting1To1, color: colors.red, jobsAmount: "1(33%)", time: "1(33%)" }                
                }
            }
        },

        mentorCompositeWay: {
            daysFromStart: "0",

            statistic: {
                [Periods.Total]: { totalTime: "9.3", totalReports: "9", finishedJobs: "9", avgTimePerCalendarDay: "0.0", avgTimePerWorkingDay: "1.0", avgJobTime: "1.0" },
                [Periods.LastMonth]: { totalTime: "2.1", totalReports: "1", finishedJobs: "1", avgTimePerCalendarDay: "0.1", avgTimePerWorkingDay: "2.1", avgJobTime: "2.1" },
                [Periods.LastWeek]: { totalTime: "2.1", totalReports: "1", finishedJobs: "1", avgTimePerCalendarDay: "0.3", avgTimePerWorkingDay: "2.1", avgJobTime: "2.1" }
            },

            labelStatistics: {
                [Periods.Total]: {
                    row1: { name: labelActivityNames.studentLabel, color: colors.teal, jobsAmount: "1(11%)", time: "2.1(22%)" },
                    row2: { name: labelActivityNames.generalMeeting, color: colors.yellow, jobsAmount: "1(11%)", time: "1(10%)" },
                    row3: { name: labelActivityNames.database, color: colors.green, jobsAmount: "3(33%)", time: "2.2(23%)" },
                    row4: { name: labelActivityNames.coding, color: colors.blue, jobsAmount: "2(22%)", time: "2(21%)" },
                    row5: { name: labelActivityNames.meeting1To1, color: colors.red, jobsAmount: "2(22%)", time: "2(21%)" }
                },

                [Periods.LastMonth]: {
                    row1: { name: labelActivityNames.studentLabel, color: colors.teal, jobsAmount: "1(100%)", time: "2.1(100%)" }
                },
                
                [Periods.LastWeek]: {
                    row1: { name: labelActivityNames.studentLabel, color: colors.teal, jobsAmount: "1(100%)", time: "2.1(100%)" }
                } 
            }
        }
    }
};