import {contactDTOToContact} from "src/dataAccessLogic/DTOToPreviewConverter/ContactDTOtoContact";
import {Contact} from "src/model/businessModel/Contact";
import {ContactService} from "src/service/ContactService";

/**
 * Params for {@link ContactDAL.createContact}
 */
interface CreateUserContactParams {

  /**
   * Contact name
   */
  contactLink: string;

  /**
   * Contact value
   */
  description?: string;

  /**
   * Owner uuid
   */
  ownerUuid: string;
}

/**
 * Params for {@link ContactDAL.updateContact}
 */
interface UpdateUserContactParams {

  /**
   * Owner uuid
   */
  userId: string;

  /**
   * Contact's uuid
   */
  contactId: string;

  /**
   * Contact name
   */
  contactLink?: string;

  /**
   * Contact value
   */
  description?: string;
}

/**
 * Params for {@link ContactDAL.deleteContact}
 */
interface DeleteUserContactParams {

  /**
   * Owner uuid
   */
  userId: string;

  /**
   * Contact's uuid
   */
  contactId: string;
}

/**
 * Provides methods to interact with the contacts
 */
export class ContactDAL {

  /**
   * Create contact
   */
  public static async createContact(params: CreateUserContactParams): Promise<Contact> {
    const contactDTO = await ContactService.createContact({
      userId: params.ownerUuid,
      request: {
        contactLink: params.contactLink,
        description: params.description,
      },
    });

    const contact = contactDTOToContact(contactDTO);

    return contact;
  }

  /**
   * Update contact
   */
  public static async updateContact(params: UpdateUserContactParams): Promise<void> {
    await ContactService.updateContact({
      contactId: params.contactId,
      userId: params.userId,
      request: {
        contactLink: params.contactLink,
        description: params.description,
      },
    });

  }

  /**
   * Delete contact by UUID
   */
  public static async deleteContact(params: DeleteUserContactParams): Promise<void> {
    await ContactService.deleteContact({
      contactId: params.contactId,
      userId: params.userId,
    });
  }

}
