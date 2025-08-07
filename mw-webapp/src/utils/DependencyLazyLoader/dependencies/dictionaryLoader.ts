
type MentorLandingContent = typeof import ("src/dictionary/landing/MentorsLandingContent.json");

/**
 * Lazy loader class for dictionary
 */
export class DictionaryLoader {

  /**
   * Variable to save dictionary
   */
  private mentorsLandingDictionary: MentorLandingContent | null = null;

  constructor() {
    this.loadMentorsLandingDictionary();
  }

  /**
   * Method to get a dictionary
   */
  public async loadMentorsLandingDictionary(): Promise<MentorLandingContent> {
    if (this.mentorsLandingDictionary) {
      return this.mentorsLandingDictionary;
    }

    const module = await import("src/dictionary/landing/MentorsLandingContent.json");
    this.mentorsLandingDictionary = module.default || module;

    return this.mentorsLandingDictionary;
  }

  /**
   * Synchronous getter
   */
  public getMentorsLandingDictionarySync(): MentorLandingContent | null {

    return this.mentorsLandingDictionary;
  }

}
