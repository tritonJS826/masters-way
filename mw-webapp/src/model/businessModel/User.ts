import {makeAutoObservable} from "mobx";
import {WayNotSaturatedUser} from "src/model/businessModelPreview/WayNotSaturatedUser";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * WayCollection props
 */
interface WayCollectionProps {

  /**
   * Date in ISO format
   */
  createdAt: Date;

  /**
   * Way collection name
   */
  name: string;

  /**
   * Way collection's owner
   */
  ownerUuid: string;

  /**
   * Date in ISO format
   */
  updatedAt: Date;

  /**
   * Way collection's UUID
   */
  uuid: string;

  /**
   * Ways preview that exist inside way collection
   */
  ways: WayPreview[];

}

/**
 * Default WayCollections
 */
export class DefaultWayCollections {

  /**
   * Own collection
   */
  public own: WayCollection;

  /**
   * Favorite collection
   */
  public favorite: WayCollection;

  /**
   * Mentoring collection
   */
  public mentoring: WayCollection;

  constructor(wayCollections: DefaultWayCollections) {
    makeAutoObservable(this);
    this.own = wayCollections.own;
    this.favorite = wayCollections.favorite;
    this.mentoring = wayCollections.mentoring;

  }

}

/**
 * Specific way collection data
 */
export class WayCollection {

  /**
   * Date in ISO format
   */
  public createdAt: Date;

  /**
   * Way collection name
   */
  public name: string;

  /**
   * Way collection's owner
   */
  public ownerUuid: string;

  /**
   * Date in ISO format
   */
  public updatedAt: Date;

  /**
   * Way collection's UUID
   */
  public uuid: string;

  /**
   * Ways preview that exist inside way collection
   */
  public ways: WayPreview[];

  constructor(wayCollection: WayCollectionProps) {
    makeAutoObservable(this);
    this.createdAt = wayCollection.createdAt;
    this.name = wayCollection.name;
    this.ownerUuid = wayCollection.ownerUuid;
    this.updatedAt = wayCollection.updatedAt;
    this.uuid = wayCollection.uuid;
    this.ways = wayCollection.ways;
  }

  /**
   * Add way to ways
   */
  public addWay(newWay: WayPreview) {
    this.ways.push(newWay);
  }

  /**
   * Delete way to ways
   */
  public deleteWay(wayUuid: string) {
    const updatedWays = this.ways.filter((way) => way.uuid !== wayUuid);
    this.ways = updatedWays;
  }

  /**
   * Update way to ways
   */
  public updateWay(wayToUpdate: PartialWithUuid<WayPreview>) {
    const updatedWays = this.ways.map((way) => way.uuid !== wayToUpdate.uuid
      ? way
      : new WayPreview({...way, ...wayToUpdate}),
    );
    this.ways = updatedWays;
  }

}

/**
 * User tag data
 */
export type UserTag = {

  /**
   * User tag uuid
   */
  uuid: string;

  /**
   * User tag name
   */
  name: string;
};

/**
 * Main short user information
 */
export class UserPlain {

  /**
   * User's UUID
   */
  public uuid: string;

  /**
   * Date when user was created
   */
  public createdAt: Date;

  /**
   * User's description
   */
  public description: string;

  /**
   * User's e-mail
   */
  public email: string;

  /**
   * User's image path
   */
  public imageUrl: string | null;

  /**
   * Is user mentor or not
   */
  public isMentor: boolean;

  /**
   * User's name
   */
  public name: string;

  constructor(user: UserPlain) {
    makeAutoObservable(this);
    this.uuid = user.uuid;
    this.createdAt = user.createdAt;
    this.description = user.description;
    this.email = user.email;
    this.imageUrl = user.imageUrl;
    this.isMentor = user.isMentor;
    this.name = user.name;
  }

}

/**
 * User preview model
 */
export class User {

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
   * User's tags {@link UserTag}
   */
  public tags: UserTag[];

  /**
   * User's image path
   */
  public imageUrl: string;

  /**
   * Is user mentor or not
   */
  public isMentor: boolean;

  /**
   * Way's that requested user become a mentor {@link WayNotSaturatedUser}
   */
  public wayRequests: WayNotSaturatedUser[];

  constructor(userData: User) {
    makeAutoObservable(this);
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.description = userData.description;
    this.createdAt = userData.createdAt;
    this.customWayCollections = userData.customWayCollections;
    this.defaultWayCollections = userData.defaultWayCollections;
    this.favoriteForUserUuids = userData.favoriteForUserUuids;
    this.favoriteUsers = userData.favoriteUsers;
    this.tags = userData.tags;
    this.imageUrl = userData.imageUrl;
    this.isMentor = userData.isMentor;
    this.wayRequests = userData.wayRequests;
  }

}
