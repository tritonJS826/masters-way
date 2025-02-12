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
        statusSelectOption: (option: string) => `statusSelectOption${option}`,

        dayReportsSelect: 'dayReportsSelect',
        dayReportsSelectOption: (option: string) => `dayReportsSelect_${option}`,

        viewButton: 'ViewButton',
    }
    
};