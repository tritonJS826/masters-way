export const dayReportsAccessIds = {
    createNewDayReportButton: "createNewDayReportButton",

    labels: {
        adjustLabelsButton: "adjustLabelsButton",

        adjustLabelsContent:{
            content: "adjustLabelsContent",
            addLabelButton: "addLabelButton",
            addLabelDialog: {
                content: "createLabelContent",
                input: "labelNameInput",
                okButton: "okButton",
                cancelButton: "cancelButton"
            }
        },

        addLabel: {
            addLabelLine: (reportItem: string) => `addLabelLine_${reportItem}`, 
            crossCloseButton: "crossCloseButton", 
            addLabelDialog: "addLabelDialog",
            saveButton: "saveButton",
            cancelButton: "cancelButton",
            labelToChoose: "labelToChoose"
        }
    },
    
    dayReportsContent: {
        reportDate: 'reportDate',
        addButton: "addButton",

        jobDone: {
            reporterName: 'reporterName',
            jobDoneDescription: 'jobDoneDescription',
            jobDoneDescriptionInput: 'jobDoneDescriptionInput',
            timeSpentOnJob: 'timeSpentOnJob',
            timeSpentOnJobInput: 'timeSpentOnJobInput',
        },

        plans: {
            planDescription: 'planDescription',
            planDescriptionInput: 'planDescriptionInput',
            estimatedPlanTime: 'estimatedPlanTime',
            estimatedPlanTimeInput: 'estimatedPlanTimeInput',
        },

        problems: {
            problemDescription: 'problemDescription',
            problemDescriptionInput: 'problemDescriptionInput',
        },

        comments: {
            commentDescription: 'commentDescription',
            commentDescriptionInput: 'commentDescriptionInput',
        },

        summaryText: 'summaryTimeText'
    }

};