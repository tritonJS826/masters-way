const colors = {
    yellow: "background-color: yellow;",
    green: "background-color: green;",
    blue: "background-color: blue;",
    red: "background-color: red;",
    teal: "background-color: rgb(0, 128, 128);"
};

export const statisticsData = {
    statisticsPlacement: {
        wayPage: "wayPage",
        modal: "modal"
    } as const,

    periodBlockTitles: {
        wayPage: {
            total: "Total",
            lastWeek: "Last week",
            lastMonth: "",
        },
        modal: {
            total: "totalModal",
            lastMonth: "lastMonthModal",
            lastWeek: "lastWeekModal"
        }
    },

    testWays: {
        johnDoeWay: {
            title: "john doe way",
            daysFromStart: "38",

            statistic: {
                total: { totalTime: "7.2", totalReports: "8", finishedJobs: "8", avgTimePerCalendarDay: "0.2", avgTimePerWorkingDay: "0.9", avgJobTime: "0.9" },
                lastMonth: { totalTime: "7.2", totalReports: "8", finishedJobs: "8", avgTimePerCalendarDay: "0.2", avgTimePerWorkingDay: "0.9", avgJobTime: "0.9" },
                lastWeek: { totalTime: "3.0", totalReports: "4", finishedJobs: "3", avgTimePerCalendarDay: "0.4", avgTimePerWorkingDay: "0.8", avgJobTime: "1.0" }
            },

            labelStatistics: {
                total: {
                    row1: { name: "general meeting", color: colors.yellow, jobsAmount: "1(12%)", time: "1(13%)" },
                    row2: { name: "database", color: colors.green, jobsAmount: "3(37%)", time: "2.2(30%)" },
                    row3: { name: "coding", color: colors.blue, jobsAmount: "2(25%)", time: "2(27%)" },
                    row4: { name: "meeting 1:1", color: colors.red, jobsAmount: "2(25%)", time: "2(27%)" }
                },

                lastMonth: {
                    row1: { name: "general meeting", color: colors.yellow, jobsAmount: "1(12%)", time: "1(13%)" },
                    row2: { name: "database", color: colors.green, jobsAmount: "3(37%)", time: "2.2(30%)" },
                    row3: { name: "coding", color: colors.blue, jobsAmount: "2(25%)", time: "2(27%)" },
                    row4: { name: "meeting 1:1", color: colors.red, jobsAmount: "2(25%)", time: "2(27%)" }
                },

                lastWeek: {
                    row1: { name: "database", color: colors.green, jobsAmount: "1(33%)", time: "1(33%)" },
                    row2: { name: "coding", color: colors.blue, jobsAmount: "1(33%)", time: "1(33%)" },
                    row3: { name: "meeting 1:1", color: colors.red, jobsAmount: "1(33%)", time: "1(33%)" }                
                }
            }
        },

        mentorCompositeWay: {
            daysFromStart: "0",

            statistic: {
                total: { totalTime: "9.3", totalReports: "9", finishedJobs: "9", avgTimePerCalendarDay: "0.1", avgTimePerWorkingDay: "1.0", avgJobTime: "1.0" },
                lastMonth: { totalTime: "2.1", totalReports: "1", finishedJobs: "1", avgTimePerCalendarDay: "0.1", avgTimePerWorkingDay: "2.1", avgJobTime: "2.1" },
                lastWeek: { totalTime: "2.1", totalReports: "1", finishedJobs: "1", avgTimePerCalendarDay: "0.3", avgTimePerWorkingDay: "2.1", avgJobTime: "2.1" }
            },

            labelStatistics: {
                total: {
                    row1: { name: "student label", color: colors.teal, jobsAmount: "1(11%)", time: "2.1(22%)" },
                    row2: { name: "general meeting", color: colors.yellow, jobsAmount: "1(11%)", time: "1(10%)" },
                    row3: { name: "database", color: colors.green, jobsAmount: "3(33%)", time: "2.2(23%)" },
                    row4: { name: "coding", color: colors.blue, jobsAmount: "2(22%)", time: "2(21%)" },
                    row5: { name: "meeting 1:1", color: colors.red, jobsAmount: "2(22%)", time: "2(21%)" }
                },

                lastMonth: {
                    row1: { name: "student label", color: colors.teal, jobsAmount: "1(100%)", time: "2.1(100%)" }
                },
                
                lastWeek: {
                    row1: { name: "student label", color: colors.teal, jobsAmount: "1(100%)", time: "2.1(100%)" }
                } 
            }
        }
    }
};