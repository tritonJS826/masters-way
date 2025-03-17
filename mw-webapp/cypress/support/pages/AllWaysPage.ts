import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {WayPage} from "cypress/support/pages/WayPage";
import {LanguageService} from "src/service/LanguageService";

export type WayStatus = keyof typeof LanguageService.allWays.filterBlock.typeOptions;

export enum MinDayReports {
    any = "0",
    atLeast5Reports = "5",
    atLeast20Reports = "20",
    atLeast50Reports = "50"
};

export interface WayFilters {
    searchByWayName?: string;
    status?: WayStatus;
    minDayReports?: MinDayReports;
};

export class AllWaysPage {
    adjustWayFilterMinDayReports(minDayReports: MinDayReports) {
        const reportOptions = {
            [MinDayReports.any]: LanguageService.allWays.filterBlock.minDayReportsAmountOption0.en,
            [MinDayReports.atLeast5Reports]: LanguageService.allWays.filterBlock.minDayReportsAmountOption1.en,
            [MinDayReports.atLeast20Reports]: LanguageService.allWays.filterBlock.minDayReportsAmountOption2.en,
            [MinDayReports.atLeast50Reports]: LanguageService.allWays.filterBlock.minDayReportsAmountOption3.en
        };
        allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelectOption(reportOptions[minDayReports]).click();
    }

    adjustWayFilterStatus(status: WayStatus) {
        allWaysSelectors.filterViewBlock.getStatusSelect().click();
        allWaysSelectors.filterViewBlock.getStatusSelectOption(status).click();
    }
    
    searchByWayName(wayName: string) {
        allWaysSelectors.filterViewBlock.getSearchByWayNameInput().click().type(`${wayName}{enter}`);
    }
    
    openWayByClickingCard(
        wayTitle: string,
        wayFilters?: WayFilters
    ) {
        if (wayFilters) {
            wayFilters.searchByWayName && this.searchByWayName(wayFilters.searchByWayName);
            wayFilters.status && this.adjustWayFilterStatus(wayFilters.status);
            wayFilters.minDayReports && this.adjustWayFilterMinDayReports(wayFilters.minDayReports);
        }
        allWaysSelectors.allWaysCard.getCardLink(wayTitle).click();
        return new WayPage();
    }
    
}