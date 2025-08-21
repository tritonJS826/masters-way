import {makeAutoObservable, runInAction} from "mobx";

type MentorLandingContent = typeof import("src/dictionary/landing/MentorsLandingContent.json");

/**
 * Dictionary loading states
 */
export enum DictionaryState {
  PENDING = "pending",
  DONE = "done",
  ERROR = "error"
}

/**
 * MobX store for dictionary management
 */
export class DictionaryStore {

  /**
   * Observable dictionary state
   */
  public mentorsLandingDictionary: MentorLandingContent | null = null;

  /**
   * State of loading
   */
  public state: DictionaryState = DictionaryState.PENDING;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Load mentors landing dictionary
   */
  public async loadMentorsLandingDictionary(): Promise<MentorLandingContent | null> {
    if (this.mentorsLandingDictionary) {
      return this.mentorsLandingDictionary;
    }

    try {
      runInAction(() => {
        this.state = DictionaryState.PENDING;
      });

      const module = await import("src/dictionary/landing/MentorsLandingContent.json");

      runInAction(() => {
        this.mentorsLandingDictionary = module.default ?? module;
        this.state = DictionaryState.DONE;
      });

      return this.mentorsLandingDictionary;
    } catch (err) {
      runInAction(() => {
        this.state = DictionaryState.ERROR;
      });

      return null;
    }
  }

  /**
   * Check if dictionary is ready
   */
  public get isDictionaryReady(): boolean {
    return this.state === DictionaryState.DONE && this.mentorsLandingDictionary !== null;
  }

}

export const dictionaryStore = new DictionaryStore();
