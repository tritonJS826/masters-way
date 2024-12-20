export const wayDescriptionAccessIds = {
    wayDashBoardLeft: {
        title : 'wayTitle',
        addToFavoritesButton: 'addToFavoritesButton',
        goal: 'wayGoal',
        tag: {
            addTagButton: 'addTagButton',
            tagInput: "tagInput",
            createTagButton: "createTagButton",
            tagTitle: "tagTitle"
        }
    },

    peopleBlock: {
        applyAsMentorButton: 'applyAsMentorButton',
        mentorsOfWayText: 'mentorsOfWayText',
        wayMentorLink: 'wayMentorLink',
        childWaysTitle: "childWaysTitle",
        childLink: (name: string) => `childLink_${name}`,
        deleteFromCompositeWayButton: (name: string) => `deleteFromCompositeWayButton_${name}`,

        deleteFromCompositeDialogContent: {
            deleteButton: 'deleteButton'
        },

        deleteFromMentors: {
            trashIcon: (name: string) => `trashIcon_${name}`,
            deleteButton: 'deleteButton',
            dialogContent: 'dialogContent'
        }
    },

    mentorRequestDialog: {
        mentorNameLink: 'mentorName',
        acceptButton: 'acceptButton'
    },

    wayActionMenu: {
        wayActionButton: 'wayActionButton',
        wayActionMenuList: "wayActionMenuList",
        wayMenuItem: 'wayMenuItem',
        waySubMenuItem: 'waySubMenuItem',
        waySubTriggerItem: 'waySubTriggerItem',
        
        DeleteWayItem: {
            dialog: {
                deleteButton: 'deleteWayButton',
                content: 'deleteWayDialogContent'
            }
        }
    }
};