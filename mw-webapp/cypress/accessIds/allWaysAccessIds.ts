export const allWaysAccessIds = {
    allWaysTitles: {
        title: 'waysTitle',
        totalAmountTitle: 'totalFoundTitle'
    },

    allWaysTable: {
        table: 'table',
        tableTh: 'tableTh',
        tableBodyTr: 'tableBodyTr',
        tableBodyTd: 'tableBodyTd',
        ownerLink: (ownerName: string) => `ownerLink_${ownerName}`,
        wayLink: (wayLink: string) => `wayLink_${wayLink}`,
        mentorLink: (mentorLink: string) => `mentorLink_${mentorLink}`
    },

    allWaysCard: {
        wayCardLink: (wayLink: string) => `wayLink_${wayLink}`
    },

    filterViewBlock: {
        searchByWayNameInput: 'searchByWayNameInput',

        statusSelect: 'filterByStatusSelect',
        statusSelectOptionAll: 'statusSelectOptionAll',
        statusSelectOptionCompleted: 'statusSelectOptionCompleted',
        statusSelectOptionAbandoned: 'statusSelectOptionAbandoned',
        statusSelectOptionInProgress: 'statusSelectOptionInProgress',

        dayReportsSelect: 'dayReportsSelect',
        dayReportsSelectOption0: 'dayReportsSelectOptionAny',
        dayReportsSelectOptionAtLeast5: 'dayReportsSelectOptionAtLeast5',
        dayReportsSelectOptionAtLeast20: 'dayReportsSelectOptionAtLeast20',
        dayReportsSelectOptionAtLeast50: 'dayReportsSelectOptionAtLeast50',

        viewButton: 'ViewButton',
    }
    
};