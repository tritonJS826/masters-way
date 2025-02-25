import {topicDTOToTopic} from "src/dataAccessLogic/DTOToPreviewConverter/topicDTOToTopic";
import {topicPreviewDTOToTopicPreview} from "src/dataAccessLogic/DTOToPreviewConverter/topicPreviewDTOToTopicPreview";
import {Topic} from "src/model/businessModel/Topic";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {TopicService} from "src/service/TopicService";

/**
 * Create topic params
 */
export interface CreateTopicParams {

  /**
   * Training uuid
   */
  trainingId: string;

  /**
   * Topic's name
   */
  topicParentId?: string;
}

/**
 * Update topic params
 */
export interface UpdateTopicParams {

  /**
   * Topic uuid
   */
  uuid: string;

  /**
   * Topic's name
   */
  name: string;
}

/**
 * Provides methods to interact with the Topics
 */
export class TopicDAL {

  /**
   * Create topic
   */
  public static async createTopic(params: CreateTopicParams): Promise<TopicPreview> {
    const topicPreviewDTO = await TopicService.createTopic({
      trainingId: params.trainingId,
      topicParentId: params.topicParentId,
    });
    const topicPreview = topicPreviewDTOToTopicPreview(topicPreviewDTO);

    return topicPreview;
  }

  /**
   * Get topic by Uuid
   */
  public static async getTopic(topicId: string): Promise<Topic> {
    const topicDTO = await TopicService.getTopic({topicId});
    const topic = topicDTOToTopic(topicDTO);

    return topic;
  }

  /**
   * Update topic
   */
  public static async updateTopic(params: UpdateTopicParams): Promise<Topic> {
    const updatedTopicDTO = await TopicService.updateTopic({
      topicId: params.uuid,
      request: {name: params.name},
    });
    const updatedTopic = topicDTOToTopic(updatedTopicDTO);

    return updatedTopic;
  }

  /**
   * Delete topic
   */
  public static async deleteTopic(topicId: string): Promise<void> {
    await TopicService.deleteTopic({topicId});
  }

}

