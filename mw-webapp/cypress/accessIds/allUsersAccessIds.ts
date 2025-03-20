export const allUsersAccessIds = {
    allUsersTitles: {
        title: 'usersTitle',
        totalFoundTitle: 'totalFoundTitle'
    },

    filterViewBlock: {
        searchByEmailInput: 'searchByEmailInput',
        searchByNameInput: 'searchByNameInput',
        statusSelect: 'filterByStatusSelect',
        statusSelectOption: (option: string) => `statusSelectOption${option}`,
    },

    allUsersTable: {
        table: 'table',
        userName: 'userName',
        userLink: (userLink: string) => `wayLink_${userLink}`,
        userContact: 'userContact'
    },

    allUsersCard: {
        userCardLink: (userName: string) => `userCardLink_${userName}`,
        mentorFlag: 'mentorFlag'
    },

    loadMoreButton: 'loadMoreButton'
};