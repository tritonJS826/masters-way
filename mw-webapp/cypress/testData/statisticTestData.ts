import {LabelColors} from "cypress/testData/testData";

const DAYS_IN_MONTH = "30";
const DAYS_IN_WEEK = "7";

function colorNameToRgbString(colorName: string): string | null {
    const colorMap: { [key: string]: { r: number; g: number; b: number } } = {
        teal: { r: 0, g: 128, b: 128 },
        red: { r: 255, g: 0, b: 0 },
        green: { r: 0, g: 128, b: 0 },
        blue: { r: 0, g: 0, b: 255 },
        yellow: { r: 255, g: 255, b: 0 },
    };

    if (colorMap[colorName]) {
        const { r, g, b } = colorMap[colorName];
        return `rgb(${r}, ${g}, ${b})`;
    }
    return null;
}

const johnDoeWayStatsData = {
    daysFromStart: "9",
    total: {
        totalTime: "430", 
        totalReports: "8", 
        finishedJobs: "8"
    },
    lastMonth: {
        totalTime: "430", 
        totalReports: "8", 
        finishedJobs: "8"
    },
    lastWeek: {
        totalTime: "300", 
        totalReports: "6", 
        finishedJobs: "5"
    },
    labelColors: {
        yellow: `background-color: ${LabelColors.yellow};`,
        green: `background-color: ${LabelColors.green};`,
        blue: `background-color: ${LabelColors.blue};`,
        red: `background-color: ${LabelColors.red};`,
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
        totalTime: "125", 
        totalReports: "1", 
        finishedJobs: "1"
    },
    lastMonth: {
        totalTime: "125", 
        totalReports: "1", 
        finishedJobs: "1"
    },
    lastWeek: {
        totalTime: "125", 
        totalReports: "1", 
        finishedJobs: "1"
    },
    labelColors: {
        teal: `background-color: ${colorNameToRgbString(LabelColors.teal)};`,
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
        totalTime: "555",
        totalReports: "9",
        finishedJobs: "9",
    },
    lastWeek: {
        totalTime: "305",
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
    return ((Math.round((time / days) * 10) / 10) / 60).toFixed(1);
}

function calculateAvgJobTime(totalTime: string, finishedJobs: string): string {
    const time = parseFloat(totalTime);
    const jobs = parseFloat(finishedJobs);
    if (jobs === 0) return "0.0";
    return ((Math.round((time / jobs) * 10) / 10) / 60).toFixed(1);
}

function calculateAvgTimePerWorkingDay(totalTime: string, totalReports: string): string {
    const total = parseFloat(totalTime);
    const reports = parseFloat(totalReports);

    if (reports === 0) return "0.0";

    const workingDays = reports;
    const avgTime = total / workingDays;

    return ((Math.round(avgTime * 10) / 10) / 60).toFixed(1);
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
                    totalTime: (parseFloat(johnDoeWayStatsData.total.totalTime) / 60).toFixed(1), 
                    totalReports: johnDoeWayStatsData.total.totalReports, 
                    finishedJobs: johnDoeWayStatsData.total.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(
                        johnDoeWayStatsData.total.totalTime, johnDoeWayStatsData.daysFromStart),
                    avgTimePerWorkingDay: calculateAvgTimePerWorkingDay(
                        johnDoeWayStatsData.total.totalTime, johnDoeWayStatsData.total.totalReports),
                    avgJobTime: calculateAvgJobTime(
                        johnDoeWayStatsData.total.totalTime, johnDoeWayStatsData.total.finishedJobs) 
                },
                [Periods.LastMonth]: {
                    totalTime: (parseFloat(johnDoeWayStatsData.lastMonth.totalTime) / 60).toFixed(1), 
                    totalReports: johnDoeWayStatsData.lastMonth.totalReports,
                    finishedJobs: johnDoeWayStatsData.lastMonth.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(
                        johnDoeWayStatsData.lastMonth.totalTime, DAYS_IN_MONTH),
                    avgTimePerWorkingDay: calculateAvgTimePerWorkingDay(
                        johnDoeWayStatsData.lastMonth.totalTime, johnDoeWayStatsData.lastMonth.totalReports),
                    avgJobTime: calculateAvgJobTime(
                        johnDoeWayStatsData.lastMonth.totalTime, johnDoeWayStatsData.lastMonth.finishedJobs) 
                },
                [Periods.LastWeek]: {
                    totalTime: (parseFloat(johnDoeWayStatsData.lastWeek.totalTime) / 60).toFixed(1), 
                    totalReports: johnDoeWayStatsData.lastWeek.totalReports,
                    finishedJobs: johnDoeWayStatsData.lastWeek.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(
                        johnDoeWayStatsData.lastWeek.totalTime, DAYS_IN_WEEK),
                    avgTimePerWorkingDay: calculateAvgTimePerWorkingDay(
                        johnDoeWayStatsData.lastWeek.totalTime, johnDoeWayStatsData.lastWeek.totalReports),
                    avgJobTime: calculateAvgJobTime(
                        johnDoeWayStatsData.lastWeek.totalTime, johnDoeWayStatsData.lastWeek.finishedJobs)
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
                    totalTime: (parseFloat(mentorCompositeTwoChildWayStatsData.total.totalTime) / 60).toFixed(1),
                    totalReports: mentorCompositeTwoChildWayStatsData.total.totalReports,
                    finishedJobs: mentorCompositeTwoChildWayStatsData.total.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(
                        mentorCompositeTwoChildWayStatsData.total.totalTime, mentorCompositeTwoChildWayStatsData.daysFromStart),
                    avgTimePerWorkingDay: calculateAvgTimePerWorkingDay(
                        mentorCompositeTwoChildWayStatsData.total.totalTime, mentorCompositeTwoChildWayStatsData.total.totalReports), 
                    avgJobTime: calculateAvgJobTime(
                        mentorCompositeTwoChildWayStatsData.total.totalTime, mentorCompositeTwoChildWayStatsData.total.finishedJobs)
                },
                [Periods.LastMonth]: {
                    totalTime: (parseFloat(mentorCompositeTwoChildWayStatsData.lastMonth.totalTime) / 60).toFixed(1),
                    totalReports: mentorCompositeTwoChildWayStatsData.lastMonth.totalReports,
                    finishedJobs: mentorCompositeTwoChildWayStatsData.lastMonth.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(
                        mentorCompositeTwoChildWayStatsData.lastMonth.totalTime, DAYS_IN_MONTH),
                    avgTimePerWorkingDay: calculateAvgTimePerWorkingDay(
                        mentorCompositeTwoChildWayStatsData.lastMonth.totalTime, mentorCompositeTwoChildWayStatsData.lastMonth.totalReports), 
                    avgJobTime: calculateAvgJobTime(
                        mentorCompositeTwoChildWayStatsData.lastMonth.totalTime, mentorCompositeTwoChildWayStatsData.lastMonth.finishedJobs)
                },
                [Periods.LastWeek]: {
                    totalTime: (parseFloat(mentorCompositeTwoChildWayStatsData.lastWeek.totalTime) / 60).toFixed(1),
                    totalReports: mentorCompositeTwoChildWayStatsData.lastWeek.totalReports,
                    finishedJobs: mentorCompositeTwoChildWayStatsData.lastWeek.finishedJobs,
                    avgTimePerCalendarDay: calculateAvgTimePerCalendarDay(
                        mentorCompositeTwoChildWayStatsData.lastWeek.totalTime, DAYS_IN_WEEK),
                    avgTimePerWorkingDay: calculateAvgTimePerWorkingDay(
                        mentorCompositeTwoChildWayStatsData.lastWeek.totalTime, mentorCompositeTwoChildWayStatsData.lastWeek.totalReports), 
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