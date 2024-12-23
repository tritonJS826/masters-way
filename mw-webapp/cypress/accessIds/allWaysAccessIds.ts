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
        filterByStatus: 'filterByStatus',
        viewButton: 'ViewButton',
        dayReportsSelect: 'dayReportsSelect',
        dayReportsSelectOption0: 'dayReportsSelectOption0',
        dayReportsSelectOptionAtLeast5: 'dayReportsSelectOptionAtLeast5',
    }
    
};