const colors = {
    yellow: "background-color: yellow;",
    green: "background-color: green;",
    blue: "background-color: blue;",
    red: "background-color: red;",
    teal: "background-color: rgb(0, 128, 128);"
};

export const periods = {
    total: "total",
    lastMonth: "lastMonth",
    lastWeek: "lastWeek"
};

export const wayTitleKeys = {
    johnDoeWay: "johnDoeWay",
    mentorCompositeWay: "mentorCompositeWay"
};

export const statisticsData = {
    windowType: {
        wayPage: "page",
        modal: "modal"
    },

    periodBlockTitles: {
        wayPage: {
            total: "Total",
            lastWeek: "Last week"
        },
        modal: {
            total: "totalModal",
            lastMonth: "lastMonthModal",
            lastWeek: "lastWeekModal"
        }
    },

    testWays: {
        [wayTitleKeys.johnDoeWay]: {
            title: "john doe way",
            daysFromStart: "38",

            statistic: {
                [periods.total]: { totalTime: "7.2", totalReports: "8", finishedJobs: "8", avgTimePerCalendarDay: "0.2", avgTimePerWorkingDay: "0.9", avgJobTime: "0.9" },
                [periods.lastMonth]: { totalTime: "7.2", totalReports: "8", finishedJobs: "8", avgTimePerCalendarDay: "0.2", avgTimePerWorkingDay: "0.9", avgJobTime: "0.9" },
                [periods.lastWeek]: { totalTime: "3.0", totalReports: "4", finishedJobs: "3", avgTimePerCalendarDay: "0.4", avgTimePerWorkingDay: "0.8", avgJobTime: "1.0" }
            },

            labelStatistics: {
                [periods.total]: {
                    line1: { name: "general meeting", color: colors.yellow, jobsAmount: "1(12%)", time: "1(13%)" },
                    line2: { name: "database", color: colors.green, jobsAmount: "3(37%)", time: "2.2(30%)" },
                    line3: { name: "coding", color: colors.blue, jobsAmount: "2(25%)", time: "2(27%)" },
                    line4: { name: "meeting 1:1", color: colors.red, jobsAmount: "2(25%)", time: "2(27%)" }
                },

                [periods.lastMonth]: {
                    line1: { name: "general meeting", color: colors.yellow, jobsAmount: "1(12%)", time: "1(13%)" },
                    line2: { name: "database", color: colors.green, jobsAmount: "3(37%)", time: "2.2(30%)" },
                    line3: { name: "coding", color: colors.blue, jobsAmount: "2(25%)", time: "2(27%)" },
                    line4: { name: "meeting 1:1", color: colors.red, jobsAmount: "2(25%)", time: "2(27%)" }
                },

                [periods.lastWeek]: {
                    line1: { name: "database", color: colors.green, jobsAmount: "1(33%)", time: "1(33%)" },
                    line2: { name: "coding", color: colors.blue, jobsAmount: "1(33%)", time: "1(33%)" },
                    line3: { name: "meeting 1:1", color: colors.red, jobsAmount: "1(33%)", time: "1(33%)" }                
                }
            }
        },

        [wayTitleKeys.mentorCompositeWay]: {
            daysFromStart: "0",

            statistic: {
                [periods.total]: { totalTime: "9.3", totalReports: "9", finishedJobs: "9", avgTimePerCalendarDay: "0.1", avgTimePerWorkingDay: "1.0", avgJobTime: "1.0" },
                [periods.lastMonth]: { totalTime: "2.1", totalReports: "1", finishedJobs: "1", avgTimePerCalendarDay: "0.1", avgTimePerWorkingDay: "2.1", avgJobTime: "2.1" },
                [periods.lastWeek]: { totalTime: "2.1", totalReports: "1", finishedJobs: "1", avgTimePerCalendarDay: "0.3", avgTimePerWorkingDay: "2.1", avgJobTime: "2.1" }
            },

            labelStatistics: {
                [periods.total]: {
                    line1: { name: "student label", color: colors.teal, jobsAmount: "1(11%)", time: "2.1(22%)" },
                    line2: { name: "general meeting", color: colors.yellow, jobsAmount: "1(11%)", time: "1(10%)" },
                    line3: { name: "database", color: colors.green, jobsAmount: "3(33%)", time: "2.2(23%)" },
                    line4: { name: "coding", color: colors.blue, jobsAmount: "2(22%)", time: "2(21%)" },
                    line5: { name: "meeting 1:1", color: colors.red, jobsAmount: "2(22%)", time: "2(21%)" }
                },

                [periods.lastMonth]: {
                    line1: { name: "student label", color: colors.teal, jobsAmount: "1(100%)", time: "2.1(100%)" }
                },
                
                [periods.lastWeek]: {
                    line1: { name: "student label", color: colors.teal, jobsAmount: "1(100%)", time: "2.1(100%)" }
                } 
            }
        }
    }
};