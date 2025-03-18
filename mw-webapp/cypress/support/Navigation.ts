import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {AllWaysPage} from "cypress/support/pages/AllWaysPage";

export class Navigation {
    static openAllUsersPage() {
      headerSelectors.getBurgerMenu().click({force: true});
      navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();
    };
    
    static openAllWaysPage() {
      headerSelectors.getBurgerMenu().click({force: true});
      navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();

      return AllWaysPage;
    };
}