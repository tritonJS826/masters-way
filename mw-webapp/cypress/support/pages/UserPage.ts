import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";

export class UserPage{
    static createNewWay(){
        userWaysSelectors.getCreateNewWayButton().click();
    }

    static openWayByClickingCard(wayTitle: string) {
        userWaysSelectors.collectionBlock.getWayLink(wayTitle).click();

        return this;
    }
}