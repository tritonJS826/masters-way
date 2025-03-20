import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {navigationMenuSelectors} from "cypress/scopesSelectors/navigationMenuSelectors";

export enum Page {
  LogoHome = "Logo",
  Home = "Home",
  UserPersonalArea = "PersonalArea",
  AllWays = "AllWays",
  AllTrainings = "AllTrainings",
  AllUsers = "AllUsers",
  AboutProject = "AboutProject",
  Partnership = "Partnership",
  Pricing = "Pricing",
  Settings = "Settings",
}

export class Navigation {
    static openPage(page: Page) {
      headerSelectors.getBurgerMenu().click({ force: true });
      navigationMenuSelectors.menuItemLinks[`get${page}ItemLink`]().click();
  }
}