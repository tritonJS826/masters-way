export const CONTEXT = {
    page: "page",
    modal: "modal",
};

export const PERIOD_BLOCK_WAY_PAGE_TITLES = {
    total: "Total",
    lastWeek: "Last week",
};

export const PERIOD_BLOCK_MODAL_TITLES = {
    total: "TotalBlock",
    lastMonth: "MonthBlock",
    lastWeek: "WeekBlock",
};

// Описание лейблов (чтобы не дублировать их в каждом периоде)
export const LABELS = {
    generalMeeting: { color: "background-color: yellow;", name: "general meeting" },
    database: { color: "background-color: green;", name: "database" },
    coding: { color: "background-color: blue;", name: "coding" },
    meeting1on1: { color: "background-color: red;", name: "meeting 1:1" },
    studentLabel: { color: "background-color: rgb(0, 128, 128);", name: "student label" },
};

// Функция-шаблон для статистики по времени
export function createStats(totalTime: string, totalReports: string, finishedJobs: string, avgTimePerCalendarDay: string, avgTimePerWorkingDay: string, avgJobTime: string) {
    return { totalTime, totalReports, finishedJobs, avgTimePerCalendarDay, avgTimePerWorkingDay, avgJobTime };
}

// Функция-шаблон для `labelStatistic`
export function createLabelStatistic(lines: { color: string; name: string; jobsAmount: string; time: string }[]) {
    return Object.fromEntries(lines.map((line, index) => [`line${index + 1}`, line]));
}

// Данные для John Doe Way
export const JOHN_DOE_WAY = {
    title: "john doe way",
    daysFromStart: "38",
    total: createStats("7.2", "8", "8", "0.2", "0.9", "0.9"),
    lastMonth: createStats("7.2", "8", "8", "0.2", "0.9", "0.9"),
    lastWeek: createStats("3.0", "4", "3", "0.4", "0.8", "1.0"),
    labelStatistic: {
        total: createLabelStatistic([
            { ...LABELS.generalMeeting, jobsAmount: "1(12%)", time: "1(13%)" },
            { ...LABELS.database, jobsAmount: "3(37%)", time: "2.2(30%)" },
            { ...LABELS.coding, jobsAmount: "2(25%)", time: "2(27%)" },
            { ...LABELS.meeting1on1, jobsAmount: "2(25%)", time: "2(27%)" },
        ]),
        lastMonth: createLabelStatistic([
            { ...LABELS.generalMeeting, jobsAmount: "1(12%)", time: "1(13%)" },
            { ...LABELS.database, jobsAmount: "3(37%)", time: "2.2(30%)" },
            { ...LABELS.coding, jobsAmount: "2(25%)", time: "2(27%)" },
            { ...LABELS.meeting1on1, jobsAmount: "2(25%)", time: "2(27%)" },
        ]),
        lastWeek: createLabelStatistic([
            { ...LABELS.database, jobsAmount: "1(33%)", time: "1(33%)" },
            { ...LABELS.coding, jobsAmount: "1(33%)", time: "1(33%)" },
            { ...LABELS.meeting1on1, jobsAmount: "1(33%)", time: "1(33%)" },
        ]),
    },
};