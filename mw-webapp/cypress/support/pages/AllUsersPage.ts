import {allUsersSelectors} from "cypress/scopesSelectors/allUsersSelectors";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {LanguageService} from "src/service/LanguageService";

export type UserStatus = keyof typeof LanguageService.allUsers.filterBlock.mentoringTypeOptions;

export enum ViewMode {
    cardView = "cardView",
    tableView = "tableView"
}

export interface UserFilters {
    searchByEmail?: string;
    searchByName?: string;
    status?: UserStatus;
    viewMode?: ViewMode;
};

export class AllUsersPage {
    static searchUserByEmail(searchSymbols: string) {
        allUsersSelectors.filterViewBlock.getSearchByEmailInput().type(searchSymbols);
    }

    static searchUserByName(searchSymbols: string) {
        allUsersSelectors.filterViewBlock.getSearchByNameInput().type(searchSymbols);
    }

    static adjustUserFilterStatus(status: UserStatus) {
        allUsersSelectors.filterViewBlock.getStatusSelect().click();
        allUsersSelectors.filterViewBlock.getStatusSelectOption(status).click();
    }

    static adjustUsersViewMode(viewMode: string) {
        viewMode === ViewMode.tableView
            ? allWaysSelectors.filterViewBlock.getTableViewButton().click()
            : allWaysSelectors.filterViewBlock.getCardViewButton().click();
    }

    static openUserPersonalAreaPageByClickingCard(
        userName: string,
        userFilters?: UserFilters
    ) {
        if(userFilters) {
            userFilters.searchByEmail && this.searchUserByEmail(userFilters.searchByEmail);
            userFilters.searchByName && this.searchUserByEmail(userFilters.searchByName);
            userFilters.status && this.adjustUserFilterStatus(userFilters.status);
            userFilters.viewMode && this.adjustUsersViewMode(userFilters.viewMode);
        }
        allUsersSelectors.card.getCardLink(userName)
            .contains(userName)
            .click();
    }
}