import {makeAutoObservable} from "mobx";
import {Contact} from "src/model/businessModel/Contact";
import {DefaultWayCollections, Skill, UserPlain, WayCollection} from "src/model/businessModel/User";
import {ProjectPreview} from "src/model/businessModelPreview/ProjectPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Default ways collections
 */
export enum PricingPlan {
  FREE = "free",
  AI_STARTER = "aiStarter",
  STARTER = "starter",
  PRO = "pro",
}

/**
 * UserSettings props
 */
interface ProfileSettingsProps {

  /**
   * Date in ISO format when coins will return to default value
   */
  expirationDate: Date;

  /**
   * User's pricing plan
   */
  pricingPlan: PricingPlan;

  /**
   * Profile setting's UUID
   */
  uuid: string;

  /**
   * Coin's amount remained
   */
  coins: number;

}

/**
 * LoggedIn User's settings
 */
export class ProfileSettings {

  /**
   * Date in ISO format when coins will return to default value
   */
  public expirationDate: Date;

  /**
   * User's pricing plan
   */
  public pricingPlan: PricingPlan;

  /**
   * Profile setting's UUID
   */
  public uuid: string;

  /**
   * Coin's amount remained
   */
  public coins: number;

  constructor(profileSettingsData: ProfileSettingsProps) {
    makeAutoObservable(this);
    this.uuid = profileSettingsData.uuid;
    this.expirationDate = profileSettingsData.expirationDate;
    this.pricingPlan = profileSettingsData.pricingPlan;
    this.coins = profileSettingsData.coins;
  }

  /**
   * Decrease coin
   */
  public decreaseCoins(decreaseCoinsAmount: number) {
    this.coins = this.coins - decreaseCoinsAmount;
  }

}

/**
 * LOggedIn current User props
 */
interface CurrentUserProps {

  /**
   * User's UUID
   */
  uuid: string;

  /**
   * User's name
   */
  name: string;

  /**
   * User's e-mail
   */
  email: string;

  /**
   * User's description
   */
  description: string;

  /**
   * Date when user was created
   */
  createdAt: Date;

  /**
   * Custom way collections {@link WayCollection}
   */
  customWayCollections: WayCollection[];

  /**
   * Default way collections {@link DefaultWayCollections}
   */
  defaultWayCollections: DefaultWayCollections;

  /**
   * User's uuids for whom this user are favorite
   */
  favoriteForUserUuids: string[];

  /**
   * Uuids of users who you liked
   */
  favoriteUsers: UserPlain[];

  /**
   * User's skills {@link Skill}
   */
  skills: Skill[];

  /**
   * User's contacts {@link Contact}
   */
  contacts: Contact[];

  /**
   * User's image path
   */
  imageUrl: string;

  /**
   * Is user mentor or not
   */
  isMentor: boolean;

  /**
   * Way's that requested user become a mentor {@link WayPreview}
   */
  wayRequests: WayPreview[];

  /**
   * User's projects
   */
  projects: ProjectPreview[];

  /**
   * LoggedIn user's profile settings
   */
  profileSetting: ProfileSettings;
}

/**
 * LoggedIn current User model
 */
export class CurrentUser {

  /**
   * User's UUID
   */
  public uuid: string;

  /**
   * User's name
   */
  public name: string;

  /**
   * User's e-mail
   */
  public email: string;

  /**
   * User's description
   */
  public description: string;

  /**
   * Date when user was created
   */
  public createdAt: Date;

  /**
   * Custom way collections {@link WayCollection}
   */
  public customWayCollections: WayCollection[];

  /**
   * Default way collections {@link DefaultWayCollections}
   */
  public defaultWayCollections: DefaultWayCollections;

  /**
   * User's uuids for whom this user are favorite
   */
  public favoriteForUserUuids: string[];

  /**
   * Uuids of users who you liked
   */
  public favoriteUsers: UserPlain[];

  /**
   * User's skills {@link Skill}
   */
  public skills: Skill[];

  /**
   * User's contacts {@link Contact}
   */
  public contacts: Contact[];

  /**
   * User's image path
   */
  public imageUrl: string;

  /**
   * Is user mentor or not
   */
  public isMentor: boolean;

  /**
   * Way's that requested user become a mentor {@link WayPreview}
   */
  public wayRequests: WayPreview[];

  /**
   * User's projects
   */
  public projects: ProjectPreview[];

  /**
   * LoggedIn user's profile settings
   */
  public profileSetting: ProfileSettings;

  constructor(userData: CurrentUserProps) {
    makeAutoObservable(this);
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.description = userData.description;
    this.createdAt = userData.createdAt;
    this.customWayCollections = userData.customWayCollections.map(customWayCollection => new WayCollection(customWayCollection));
    this.defaultWayCollections = new DefaultWayCollections(userData.defaultWayCollections);
    this.favoriteForUserUuids = userData.favoriteForUserUuids;
    this.favoriteUsers = userData.favoriteUsers;
    this.skills = userData.skills.map(skill => new Skill(skill));
    this.contacts = userData.contacts.map(contact => new Contact(contact));
    this.imageUrl = userData.imageUrl;
    this.isMentor = userData.isMentor;
    this.wayRequests = userData.wayRequests;
    this.projects = userData.projects.map(project => new ProjectPreview(project));
    this.profileSetting = new ProfileSettings(userData.profileSetting);
  }

  /**
   * Update user's name
   */
  public updateName(nameToUpdate: string): void {
    this.name = nameToUpdate;
    this.updateDefaultWayCollections("name", nameToUpdate);
  }

  /**
   * Update isMentor property
   */
  public updateIsMentor(isMentorToUpdate: boolean): void {
    this.isMentor = isMentorToUpdate;
    this.updateDefaultWayCollections("isMentor", isMentorToUpdate);
  }

  /**
   * Update user's description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

  /**
   * Add new collection to user
   */
  public addCollection(newCollection: WayCollection): void {
    this.customWayCollections.push(newCollection);
  }

  /**
   * Add new project to user
   */
  public addProject(newProject: ProjectPreview): void {
    this.projects.push(newProject);
  }

  /**
   * Delete collection from user
   */
  public deleteCollection(collectionId: string): void {
    this.customWayCollections = this.customWayCollections.filter(collection => collection.uuid !== collectionId);
  }

  /**
   * Delete project from user
   */
  public deleteProject(projectId: string): void {
    this.projects = this.projects.filter(project => project.uuid !== projectId);
  }

  /**
   * Add new skill to user
   */
  public addSkill(newSkill: Skill): void {
    this.skills.push(newSkill);
  }

  /**
   * Delete skill from user
   */
  public deleteSkill(skillUuid: string): void {
    this.skills = this.skills.filter(skill => skill.uuid !== skillUuid);
  }

  /**
   * Add new contact to user
   */
  public addContact(newContact: Contact): void {
    this.contacts.push(newContact);
  }

  /**
   * Delete contact from user
   */
  public deleteContact(contactUuid: string): void {
    this.contacts = this.contacts.filter(contact => contact.uuid !== contactUuid);
  }

  /**
   * Add way to favorite collection
   */
  public addWayToFavorite(newWay: WayPreview): void {
    this.defaultWayCollections.favorite.addWay(newWay);
  }

  /**
   * Delete way from favorite collection
   */
  public deleteWayFromFavorite(wayUuid: string): void {
    this.defaultWayCollections.favorite.deleteWay(wayUuid);
  }

  /**
   * Add way to composite
   */
  public addWayToComposite(parentWayUuid: string, childWayUuid: string): void {
    const ways = this.defaultWayCollections.own.ways.map((way) => {

      return way.uuid !== parentWayUuid
        ? way
        : new WayPreview({
          ...way,
          childrenUuids: way.childrenUuids.concat(childWayUuid),
        });
    });
    const ownCollection = new WayCollection({...this.defaultWayCollections.own, ways});

    this.defaultWayCollections = new DefaultWayCollections({
      ...this.defaultWayCollections,
      own: ownCollection,
    });
  }

  /**
   * Delete way from composite
   */
  public deleteWayFromComposite(parentWayUuid: string, childWayUuid: string): void {
    const ways = this.defaultWayCollections.own.ways.map((way) => {

      return way.uuid !== parentWayUuid
        ? way
        : new WayPreview({
          ...way,
          childrenUuids: way.childrenUuids.filter(wayUuid => wayUuid !== childWayUuid),
        });
    });
    const ownCollection = new WayCollection({...this.defaultWayCollections.own, ways});

    this.defaultWayCollections = new DefaultWayCollections({
      ...this.defaultWayCollections,
      own: ownCollection,
    });
  }

  /**
   * Update DefaultWayCollections
   */
  private updateDefaultWayCollections(updateKey: keyof CurrentUser, updateValue: CurrentUser["name"] | CurrentUser["isMentor"]) {
    const ways = this.defaultWayCollections.own.ways.map((way) => {
      const owner = new UserPlain({...way.owner, [updateKey]: updateValue});

      return new WayPreview({
        ...way,
        owner,
      });
    });
    const ownCollection = new WayCollection({...this.defaultWayCollections.own, ways});

    this.defaultWayCollections = new DefaultWayCollections({
      ...this.defaultWayCollections,
      own: ownCollection,
    });
  }

}
