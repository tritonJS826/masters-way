export const allUsersAccessIds = {
    allUsersTitles: {
        title: 'usersTitle',
        totalFoundTitle: 'totalFoundTitle'
    },

    filterViewBlock: {
        searchByEmailInput: 'searchByEmailInput',
        searchByNameInput: 'searchByNameInput'
    },

    allUsersTable: {
        table: 'table',
        userName: 'userName',
        userLink: (userLink: string) => `wayLink_${userLink}`,
        userContact: 'userContact'
    },

    allUsersCard: {
        userCardLink: (userName: string) => `userCardLink_${userName}`
    },

    loadMoreButton: 'loadMoreButton'
};