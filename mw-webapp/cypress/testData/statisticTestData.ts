import {LabelColors} from "cypress/testData/testData";
import {DateUtils} from "src/utils/DateUtils";

const DAYS_IN_MONTH = 30;
const DAYS_IN_WEEK = 7;

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
    daysFromStart: 9,
    total: {
        totalTime: 430, 
        totalReports: 8, 
        finishedJobs: 8
    },
    lastMonth: {
        totalTime: 430, 
        totalReports: 8, 
        finishedJobs: 8
    },
    lastWeek: {
        totalTime: 300, 
        totalReports: 6, 
        finishedJobs: 5
    },
    labels: {
        generalMeeting: {
            name: "general meeting",
            color: `background-color: ${LabelColors.yellow};`
        },
        database: {
            name: "database",
            color: `background-color: ${LabelColors.green};`
        },
        coding: {
            name: "coding",
            color: `background-color: ${LabelColors.blue};`
        },
        meeting1To1: {
            name: "meeting 1:1",
            color: `background-color: ${LabelColors.red};`
        }
    }
};

export const studentStatsData = {
    total: {
        totalTime: 125, 
        totalReports: 1, 
        finishedJobs: 1
    },
    lastMonth: {
        totalTime: 125, 
        totalReports: 1, 
        finishedJobs: 1
    },
    lastWeek: {
        totalTime: 125, 
        totalReports: 1, 
        finishedJobs: 1
    },
    labels:{
        studentLabel: {
            name: "student label",
            color: `background-color: ${colorNameToRgbString(LabelColors.teal)};`,
        }
    }
};

const mentorCompositeTwoChildWayStatsData = {
    daysFromStart: 11,
    total: {
        totalTime: johnDoeWayStatsData.total.totalTime + studentStatsData.total.totalTime,
        totalReports: johnDoeWayStatsData.total.totalReports + studentStatsData.total.totalReports,
        finishedJobs: johnDoeWayStatsData.total.finishedJobs + studentStatsData.total.finishedJobs
    },
    lastMonth: {
        totalTime: 555,
        totalReports: 9,
        finishedJobs: 9,
    },
    lastWeek: {
        totalTime: 305,
        totalReports: 5,
        finishedJobs: 4
    }                  
};

enum Periods {
    Total = "total",
    LastMonth = "lastMonth",
    LastWeek = "lastWeek"
};

function calculateAverage(time: number, divisor: number): number {
    return divisor === 0 ? 0.0 : DateUtils.minutesToHoursFixed1(time / divisor);
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
                    totalTime: DateUtils.minutesToHoursFixed1(johnDoeWayStatsData.total.totalTime), 
                    totalReports: johnDoeWayStatsData.total.totalReports, 
                    finishedJobs: johnDoeWayStatsData.total.finishedJobs,
                    avgTimePerCalendarDay: calculateAverage(johnDoeWayStatsData.total.totalTime, johnDoeWayStatsData.daysFromStart),
                    avgTimePerWorkingDay: calculateAverage(johnDoeWayStatsData.total.totalTime, johnDoeWayStatsData.total.totalReports),
                    avgJobTime: calculateAverage(johnDoeWayStatsData.total.totalTime, johnDoeWayStatsData.total.finishedJobs) 
                },
                [Periods.LastMonth]: {
                    totalTime: DateUtils.minutesToHoursFixed1(johnDoeWayStatsData.lastMonth.totalTime), 
                    totalReports: johnDoeWayStatsData.lastMonth.totalReports,
                    finishedJobs: johnDoeWayStatsData.lastMonth.finishedJobs,
                    avgTimePerCalendarDay: calculateAverage(johnDoeWayStatsData.lastMonth.totalTime, DAYS_IN_MONTH),
                    avgTimePerWorkingDay: calculateAverage(johnDoeWayStatsData.lastMonth.totalTime, johnDoeWayStatsData.lastMonth.totalReports),
                    avgJobTime: calculateAverage(johnDoeWayStatsData.lastMonth.totalTime, johnDoeWayStatsData.lastMonth.finishedJobs) 
                },
                [Periods.LastWeek]: {
                    totalTime: DateUtils.minutesToHoursFixed1(johnDoeWayStatsData.lastWeek.totalTime), 
                    totalReports: johnDoeWayStatsData.lastWeek.totalReports,
                    finishedJobs: johnDoeWayStatsData.lastWeek.finishedJobs,
                    avgTimePerCalendarDay: calculateAverage(johnDoeWayStatsData.lastWeek.totalTime, DAYS_IN_WEEK),
                    avgTimePerWorkingDay: calculateAverage(johnDoeWayStatsData.lastWeek.totalTime, johnDoeWayStatsData.lastWeek.totalReports),
                    avgJobTime: calculateAverage(johnDoeWayStatsData.lastWeek.totalTime, johnDoeWayStatsData.lastWeek.finishedJobs)
                }
            },

            labelStatistics: {
                [Periods.Total]: {
                    row1: {
                        label: johnDoeWayStatsData.labels.generalMeeting,
                        jobsAmount: "1(12%)",
                        time: "1(13%)"
                    },
                    row2: {
                        label: johnDoeWayStatsData.labels.database,
                        jobsAmount: "3(37%)",
                        time: "2.2(30%)"
                    },
                    row3: {
                        label: johnDoeWayStatsData.labels.coding,
                        jobsAmount: "2(25%)", 
                        time: "2(27%)"
                    },
                    row4: {
                        label: johnDoeWayStatsData.labels.meeting1To1,
                        jobsAmount: "2(25%)",
                        time: "2(27%)"
                    }
                },

                [Periods.LastMonth]: {
                    row1: {
                        label: johnDoeWayStatsData.labels.generalMeeting,
                        jobsAmount: "1(12%)",
                        time: "1(13%)" 
                    },
                    row2: {
                        label: johnDoeWayStatsData.labels.database,
                        jobsAmount: "3(37%)",
                        time: "2.2(30%)"
                    },
                    row3: {
                        label: johnDoeWayStatsData.labels.coding,
                        jobsAmount: "2(25%)",
                        time: "2(27%)"
                    },
                    row4: {
                        label: johnDoeWayStatsData.labels.meeting1To1,
                        jobsAmount: "2(25%)", 
                        time: "2(27%)" 
                    }
                },

                [Periods.LastWeek]: {
                    row1: {
                        label: johnDoeWayStatsData.labels.generalMeeting,
                        jobsAmount: "1(20%)", 
                        time: "1(20%)" 
                    },
                    row2: {
                        label: johnDoeWayStatsData.labels.database,
                        jobsAmount: "1(20%)", 
                        time: "1(20%)" 
                    },
                    row3: {
                        label: johnDoeWayStatsData.labels.coding,
                        jobsAmount: "1(20%)", 
                        time: "1(20%)" 
                    },
                    row4: {
                        label: johnDoeWayStatsData.labels.meeting1To1,
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
                    totalTime: DateUtils.minutesToHoursFixed1(mentorCompositeTwoChildWayStatsData.total.totalTime),
                    totalReports: mentorCompositeTwoChildWayStatsData.total.totalReports,
                    finishedJobs: mentorCompositeTwoChildWayStatsData.total.finishedJobs,
                    avgTimePerCalendarDay: calculateAverage(
                        mentorCompositeTwoChildWayStatsData.total.totalTime, mentorCompositeTwoChildWayStatsData.daysFromStart),
                    avgTimePerWorkingDay: calculateAverage(
                        mentorCompositeTwoChildWayStatsData.total.totalTime, mentorCompositeTwoChildWayStatsData.total.totalReports), 
                    avgJobTime: calculateAverage(
                        mentorCompositeTwoChildWayStatsData.total.totalTime, mentorCompositeTwoChildWayStatsData.total.finishedJobs)
                },
                [Periods.LastMonth]: {
                    totalTime: DateUtils.minutesToHoursFixed1(mentorCompositeTwoChildWayStatsData.lastMonth.totalTime),
                    totalReports: mentorCompositeTwoChildWayStatsData.lastMonth.totalReports,
                    finishedJobs: mentorCompositeTwoChildWayStatsData.lastMonth.finishedJobs,
                    avgTimePerCalendarDay: calculateAverage(mentorCompositeTwoChildWayStatsData.lastMonth.totalTime, DAYS_IN_MONTH),
                    avgTimePerWorkingDay: calculateAverage(
                        mentorCompositeTwoChildWayStatsData.lastMonth.totalTime, mentorCompositeTwoChildWayStatsData.lastMonth.totalReports), 
                    avgJobTime: calculateAverage(
                        mentorCompositeTwoChildWayStatsData.lastMonth.totalTime, mentorCompositeTwoChildWayStatsData.lastMonth.finishedJobs)
                },
                [Periods.LastWeek]: {
                    totalTime: DateUtils.minutesToHoursFixed1(mentorCompositeTwoChildWayStatsData.lastWeek.totalTime),
                    totalReports: mentorCompositeTwoChildWayStatsData.lastWeek.totalReports,
                    finishedJobs: mentorCompositeTwoChildWayStatsData.lastWeek.finishedJobs,
                    avgTimePerCalendarDay: calculateAverage(mentorCompositeTwoChildWayStatsData.lastWeek.totalTime, DAYS_IN_WEEK),
                    avgTimePerWorkingDay: calculateAverage(
                        mentorCompositeTwoChildWayStatsData.lastWeek.totalTime, mentorCompositeTwoChildWayStatsData.lastWeek.totalReports), 
                    avgJobTime: calculateAverage(
                        mentorCompositeTwoChildWayStatsData.lastWeek.totalTime, mentorCompositeTwoChildWayStatsData.lastWeek.finishedJobs)
                }
            },

            labelStatistics: {
                [Periods.Total]: {
                    row1: {
                        label: studentStatsData.labels.studentLabel,
                        jobsAmount: "1(11%)",
                        time: "2.1(22%)"
                    },
                    row2: {
                        label: johnDoeWayStatsData.labels.generalMeeting,
                        jobsAmount: "1(11%)",
                        time: "1(10%)"
                    },
                    row3: {
                        label: johnDoeWayStatsData.labels.database,
                        jobsAmount: "3(33%)",
                        time: "2.2(23%)"
                    },
                    row4: {
                        label: johnDoeWayStatsData.labels.coding,
                        jobsAmount: "2(22%)",
                        time: "2(21%)"
                    },
                    row5: {
                        label: johnDoeWayStatsData.labels.meeting1To1,
                        jobsAmount: "2(22%)",
                        time: "2(21%)"
                    }
                },

                [Periods.LastMonth]: {
                    row1: {
                        label: studentStatsData.labels.studentLabel,
                        jobsAmount: "1(11%)",
                        time: "2.1(22%)"
                    },
                    row2: {
                        label: johnDoeWayStatsData.labels.generalMeeting,
                        jobsAmount: "1(11%)",
                        time: "1(10%)"
                    },
                    row3: {
                        label: johnDoeWayStatsData.labels.database,
                        jobsAmount: "3(33%)",
                        time: "2.2(23%)"
                    },
                    row4: {
                        label: johnDoeWayStatsData.labels.coding,
                        jobsAmount: "2(22%)",
                        time: "2(21%)"
                    },
                    row5: {
                        label: johnDoeWayStatsData.labels.meeting1To1,
                        jobsAmount: "2(22%)",
                        time: "2(21%)"
                    }
                },
                
                [Periods.LastWeek]: {
                    row1: {
                        label: studentStatsData.labels.studentLabel,
                        jobsAmount: "1(25%)",
                        time: "2.1(40%)"
                    },
                    row2: {
                        label: johnDoeWayStatsData.labels.database,
                        jobsAmount: "1(25%)",
                        time: "1(19%)"
                    },
                    row3: {
                        label: johnDoeWayStatsData.labels.coding,
                        jobsAmount: "1(25%)",
                        time: "1(19%)"
                    },
                    row4: {
                        label: johnDoeWayStatsData.labels.meeting1To1,
                        jobsAmount: "1(25%)",
                        time: "1(19%)"
                    }
                } 
            }
        }
    }
};