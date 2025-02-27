import {LabelColors} from "cypress/testData/testData";

const DAYS_IN_MONTH = "30";
const DAYS_IN_WEEK = "7";

const johnDoeWayStatsData = {
    daysFromStart: "9",
    total: {
        totalTime: "7.2", 
        totalReports: "8", 
        finishedJobs: "8"
    },
    lastMonth: {
        totalTime: "7.2", 
        totalReports: "8", 
        finishedJobs: "8"
    },
    lastWeek: {
        totalTime: "5.0", 
        totalReports: "6", 
        finishedJobs: "5"
    },
    labelColors: {
        yellow: `background-color: ${LabelColors.yellow};`,
        green: `background-color: ${LabelColors.green};`,
        blue: `background-color: ${LabelColors.blue};`,
        red: `background-color: ${LabelColors.red};`,
        teal: `background-color: ${LabelColors.teal};`,
    },
    labelActivityNames: {
        generalMeeting: "general meeting",
        database: "database",
        coding: "coding",
        meeting1To1: "meeting 1:1"
    }
};

export const studentStatsData = {
    total: {
        totalTime: "2.1", 
        totalReports: "1", 
        finishedJobs: "1"
    },
    lastMonth: {
        totalTime: "2.1", 
        totalReports: "1", 
        finishedJobs: "1"
    },
    lastWeek: {
        totalTime: "2.1", 
        totalReports: "1", 
        finishedJobs: "1"
    },
    labelColors: {
        teal: `background-color: ${LabelColors.teal};`,
    },
    labelActivityNames: {
        studentLabel: "student label"
    }
};

const mentorCompositeTwoChildWayStatsData = {
    daysFromStart: "11",
    total: {
        totalTime: (Number(johnDoeWayStatsData.total.totalTime) + Number(studentStatsData.total.totalTime)).toFixed(1),
        totalReports: String(Number(johnDoeWayStatsData.total.totalReports) + Number(studentStatsData.total.totalReports)),
        finishedJobs: String(Number(johnDoeWayStatsData.total.finishedJobs) + Number(studentStatsData.total.finishedJobs))
    },
    lastMonth: {
        totalTime: "9.3",
        totalReports: "9",
        finishedJobs: "9",
    },
    lastWeek: {
        totalTime: "5.1",
        totalReports: "5",
        finishedJobs: "4"
    }                  
};

enum Periods {
    Total = "total",
    LastMonth = "lastMonth",
    LastWeek = "lastWeek"
};

function calculateAvgTimePerCalendarDay(totalTime: string, daysFromStart: string): string {
    const time = parseFloat(totalTime);
    const days = parseFloat(daysFromStart);
    if (days === 0) return "0.0";
    return (Math.round((time / days) * 10) / 10).toFixed(1);
}

function calculateAvgJobTime(totalTime: string, finishedJobs: string): string {
    const time = parseFloat(totalTime);
    const jobs = parseFloat(finishedJobs);
    if (jobs === 0) return "0.0";
    return (Math.round((time / jobs) * 10) / 10).toFixed(1);
}

function calculateWorkingDays(totalDays: number): number {
    const fullWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const workingDays = fullWeeks * 5 + Math.min(remainingDays, 5);
    return workingDays;
}

function calculateAvgTimePerWorkingDay(totalTime: string, totalDays: string): string {
    const total = parseFloat(totalTime);
    const days = parseFloat(totalDays);
    if (days === 0) return "0.0";

    const workingDays = calculateWorkingDays(days);

    return (Math.round((total / workingDays) * 10) / 10).toFixed(1);
}

export const statisticsData = {
    statisticsPlacement: {
        wayPage: "wayPage",
        modal: "modal"
    } as const,

    testWays: {
        johnDoeWay: {
            title: "john doe way" as const,
            daysFromStart: johnDoeWayStatsData.daysFromStart,

            statistic: {
                [Periods.Total]: {
                    totalTime: johnDoeWayStatsData.total.totalTime, 
                    totalReports: johnDoeWayStatsData.total.totalReports, 
                    finishedJobs: johnDoeWayStatsData.total.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(johnDoeWayStatsData.total.totalTime, johnDoeWayStatsData.daysFromStart),
                    avgTimePerWorkingDay: "0.9",
                    // calculateAvgTimePerWorkingDay(johnDoeWayStatsData.total.totalTime, johnDoeWayStatsData.daysFromStart),
                    avgJobTime: calculateAvgJobTime(johnDoeWayStatsData.total.totalTime, johnDoeWayStatsData.total.finishedJobs) 
                },
                [Periods.LastMonth]: {
                    totalTime: johnDoeWayStatsData.lastMonth.totalTime,
                    totalReports: johnDoeWayStatsData.lastMonth.totalReports,
                    finishedJobs: johnDoeWayStatsData.lastMonth.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(johnDoeWayStatsData.lastMonth.totalTime, DAYS_IN_MONTH),
                    avgTimePerWorkingDay: "0.9",
                    // calculateAvgTimePerWorkingDay(johnDoeWayStatsData.lastMonth.totalTime, "30"),
                    avgJobTime: calculateAvgJobTime(johnDoeWayStatsData.lastMonth.totalTime, johnDoeWayStatsData.lastMonth.finishedJobs) 
                },
                [Periods.LastWeek]: {
                    totalTime: johnDoeWayStatsData.lastWeek.totalTime,
                    totalReports: johnDoeWayStatsData.lastWeek.totalReports,
                    finishedJobs: johnDoeWayStatsData.lastWeek.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(johnDoeWayStatsData.lastWeek.totalTime, DAYS_IN_WEEK),
                    avgTimePerWorkingDay: "0.8",
                    // calculateAvgTimePerWorkingDay(johnDoeWayStatsData.lastWeek.totalTime, "7"),
                    avgJobTime: calculateAvgJobTime(johnDoeWayStatsData.lastWeek.totalTime, johnDoeWayStatsData.lastWeek.finishedJobs)
                }
            },

            labelStatistics: {
                [Periods.Total]: {
                    row1: {
                        name: johnDoeWayStatsData.labelActivityNames.generalMeeting,
                        color: johnDoeWayStatsData.labelColors.yellow,
                        jobsAmount: "1(12%)",
                        time: "1(13%)"
                    },
                    row2: {
                        name: johnDoeWayStatsData.labelActivityNames.database,
                        color: johnDoeWayStatsData.labelColors.green,
                        jobsAmount: "3(37%)",
                        time: "2.2(30%)"
                    },
                    row3: {
                        name:johnDoeWayStatsData.labelActivityNames.coding,
                        color: johnDoeWayStatsData.labelColors.blue,
                        jobsAmount: "2(25%)", 
                        time: "2(27%)"
                    },
                    row4: {
                        name: johnDoeWayStatsData.labelActivityNames.meeting1To1,
                        color: johnDoeWayStatsData.labelColors.red,
                        jobsAmount: "2(25%)",
                        time: "2(27%)"
                    }
                },

                [Periods.LastMonth]: {
                    row1: {
                        name: johnDoeWayStatsData.labelActivityNames.generalMeeting,
                        color: johnDoeWayStatsData.labelColors.yellow,
                        jobsAmount: "1(12%)",
                        time: "1(13%)" 
                    },
                    row2: {
                        name: johnDoeWayStatsData.labelActivityNames.database,
                        color: johnDoeWayStatsData.labelColors.green,
                        jobsAmount: "3(37%)",
                        time: "2.2(30%)"
                    },
                    row3: {
                        name: johnDoeWayStatsData.labelActivityNames.coding,
                        color: johnDoeWayStatsData.labelColors.blue,
                        jobsAmount: "2(25%)",
                        time: "2(27%)"
                    },
                    row4: { 
                        name: johnDoeWayStatsData.labelActivityNames.meeting1To1, 
                        color: johnDoeWayStatsData.labelColors.red, 
                        jobsAmount: "2(25%)", 
                        time: "2(27%)" 
                    }
                },

                [Periods.LastWeek]: {
                    row1: {
                        name: johnDoeWayStatsData.labelActivityNames.generalMeeting, 
                        color: johnDoeWayStatsData.labelColors.yellow, 
                        jobsAmount: "1(20%)", 
                        time: "1(20%)" 
                    },
                    row2: { 
                        name: johnDoeWayStatsData.labelActivityNames.database, 
                        color: johnDoeWayStatsData.labelColors.green, 
                        jobsAmount: "1(20%)", 
                        time: "1(20%)" 
                    },
                    row3: { 
                        name: johnDoeWayStatsData.labelActivityNames.coding, 
                        color: johnDoeWayStatsData.labelColors.blue, 
                        jobsAmount: "1(20%)", 
                        time: "1(20%)" 
                    },
                    row4: { 
                        name: johnDoeWayStatsData.labelActivityNames.meeting1To1, 
                        color: johnDoeWayStatsData.labelColors.red, 
                        jobsAmount: "2(40%)", 
                        time: "2(40%)" 
                    }
                }
            }
        },

        mentorCompositeTwoChildWay: {
            daysFromStart: mentorCompositeTwoChildWayStatsData.daysFromStart,

            statistic: {
                [Periods.Total]: {
                    totalTime: mentorCompositeTwoChildWayStatsData.total.totalTime,
                    totalReports: mentorCompositeTwoChildWayStatsData.total.totalReports,
                    finishedJobs: mentorCompositeTwoChildWayStatsData.total.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(
                        mentorCompositeTwoChildWayStatsData.total.totalTime, mentorCompositeTwoChildWayStatsData.daysFromStart),
                    avgTimePerWorkingDay: "1.0", 
                    avgJobTime: calculateAvgJobTime(
                        mentorCompositeTwoChildWayStatsData.total.totalTime, mentorCompositeTwoChildWayStatsData.total.finishedJobs)
                },
                [Periods.LastMonth]: {
                    totalTime: mentorCompositeTwoChildWayStatsData.lastMonth.totalTime,
                    totalReports: mentorCompositeTwoChildWayStatsData.lastMonth.totalReports,
                    finishedJobs: mentorCompositeTwoChildWayStatsData.lastMonth.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(
                        (Number(johnDoeWayStatsData.lastMonth.totalTime) + Number(studentStatsData.lastMonth.totalTime)).toFixed(1), DAYS_IN_MONTH),
                    avgTimePerWorkingDay: "1.0",
                    avgJobTime: calculateAvgJobTime(
                        (Number(johnDoeWayStatsData.total.totalTime) + Number(studentStatsData.total.totalTime)).toFixed(1),
                        (Number(johnDoeWayStatsData.total.finishedJobs) + Number(studentStatsData.total.finishedJobs)).toFixed(1)) 
                },
                [Periods.LastWeek]: {
                    totalTime: mentorCompositeTwoChildWayStatsData.lastWeek.totalTime,
                    totalReports: mentorCompositeTwoChildWayStatsData.lastWeek.totalReports,
                    finishedJobs: mentorCompositeTwoChildWayStatsData.lastWeek.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(
                        mentorCompositeTwoChildWayStatsData.lastWeek.totalTime, DAYS_IN_WEEK),
                    avgTimePerWorkingDay: "1.0",
                    avgJobTime: calculateAvgJobTime(
                        mentorCompositeTwoChildWayStatsData.lastWeek.totalTime, mentorCompositeTwoChildWayStatsData.lastWeek.finishedJobs)
                }
            },

            labelStatistics: {
                [Periods.Total]: {
                    row1: {
                        name: studentStatsData.labelActivityNames.studentLabel,
                        color: studentStatsData.labelColors.teal,
                        jobsAmount: "1(11%)",
                        time: "2.1(22%)"
                    },
                    row2: {
                        name: johnDoeWayStatsData.labelActivityNames.generalMeeting,
                        color: johnDoeWayStatsData.labelColors.yellow,
                        jobsAmount: "1(11%)",
                        time: "1(10%)"
                    },
                    row3: {
                        name: johnDoeWayStatsData.labelActivityNames.database,
                        color: johnDoeWayStatsData.labelColors.green,
                        jobsAmount: "3(33%)",
                        time: "2.2(23%)"
                    },
                    row4: {
                        name: johnDoeWayStatsData.labelActivityNames.coding,
                        color: johnDoeWayStatsData.labelColors.blue,
                        jobsAmount: "2(22%)",
                        time: "2(21%)"
                    },
                    row5: {
                        name: johnDoeWayStatsData.labelActivityNames.meeting1To1,
                        color: johnDoeWayStatsData.labelColors.red,
                        jobsAmount: "2(22%)",
                        time: "2(21%)"
                    }
                },

                [Periods.LastMonth]: {
                    row1: {
                        name: studentStatsData.labelActivityNames.studentLabel,
                        color: studentStatsData.labelColors.teal,
                        jobsAmount: "1(11%)",
                        time: "2.1(22%)"
                    },
                    row2: {
                        name: johnDoeWayStatsData.labelActivityNames.generalMeeting,
                        color: johnDoeWayStatsData.labelColors.yellow,
                        jobsAmount: "1(11%)",
                        time: "1(10%)"
                    },
                    row3: {
                        name: johnDoeWayStatsData.labelActivityNames.database,
                        color: johnDoeWayStatsData.labelColors.green,
                        jobsAmount: "3(33%)",
                        time: "2.2(23%)"
                    },
                    row4: {
                        name: johnDoeWayStatsData.labelActivityNames.coding,
                        color: johnDoeWayStatsData.labelColors.blue,
                        jobsAmount: "2(22%)",
                        time: "2(21%)"
                    },
                    row5: {
                        name: johnDoeWayStatsData.labelActivityNames.meeting1To1,
                        color: johnDoeWayStatsData.labelColors.red,
                        jobsAmount: "2(22%)",
                        time: "2(21%)"
                    }
                },
                
                [Periods.LastWeek]: {
                    row1: {
                        name: studentStatsData.labelActivityNames.studentLabel,
                        color: studentStatsData.labelColors.teal,
                        jobsAmount: "1(25%)",
                        time: "2.1(40%)"
                    },
                    row2: {
                        name: johnDoeWayStatsData.labelActivityNames.database,
                        color: johnDoeWayStatsData.labelColors.green,
                        jobsAmount: "1(25%)",
                        time: "1(19%)"
                    },
                    row3: {
                        name: johnDoeWayStatsData.labelActivityNames.coding,
                        color: johnDoeWayStatsData.labelColors.blue,
                        jobsAmount: "1(25%)",
                        time: "1(19%)"
                    },
                    row4: {
                        name: johnDoeWayStatsData.labelActivityNames.meeting1To1,
                        color: johnDoeWayStatsData.labelColors.red,
                        jobsAmount: "1(25%)",
                        time: "1(19%)"
                    }
                } 
            }
        }
    }
};