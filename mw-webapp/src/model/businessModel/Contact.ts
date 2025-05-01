import {makeAutoObservable} from "mobx";

/**
 * Contact props
 */
export interface ContactProps {

    /**
     * User contact uuid
     */
    uuid: string;

    /**
     * User contact link
     */
    contactLink: string;

    /**
     * User contact description
     */
    description?: string;
  }

/**
 * Contact data
 */
export class Contact {

  /**
   * User contact uuid
   */
  public uuid: string;

  /**
   * User contact link
   */
  public contactLink: string;

  /**
   * User contact description
   */
  public description?: string;

  constructor(contact: ContactProps) {
    makeAutoObservable(this);
    this.contactLink = contact.contactLink;
    this.uuid = contact.uuid;
    this.description = contact.description;
  }

  /**
   * Update contact
   */
  public updateContact(updatedContact: Partial<Contact>): void {
    this.contactLink = updatedContact.contactLink ?? this.contactLink;
    this.description = updatedContact.description ?? this.description;
  }

}
