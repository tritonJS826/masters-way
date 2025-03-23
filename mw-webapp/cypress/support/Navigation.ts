import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";
import {AllWaysPage} from "cypress/support/pages/AllWaysPage";
import {AllUsersPage} from "cypress/support/pages/AllUsersPage";

export class Navigation {
    static openAllUsersPage() {
      headerSelectors.getBurgerMenu().click({force: true});
      navigationMenuSelectors.menuItemLinks.getAllUsersItemLink().click();

      return AllUsersPage;
    };
    
    static openAllWaysPage() {
      headerSelectors.getBurgerMenu().click({force: true});
      navigationMenuSelectors.menuItemLinks.getAllWaysItemLink().click();

      return AllWaysPage;
    };
}