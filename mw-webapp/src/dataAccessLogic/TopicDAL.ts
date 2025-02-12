import {topicDTOToTopic} from "src/dataAccessLogic/DTOToPreviewConverter/topicDTOToTopic";
import {Topic} from "src/model/businessModel/Topic";
import {TopicService} from "src/service/TopicService";

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
  public static async createTopic(trainingId: string): Promise<Topic> {
    const topicDTO = await TopicService.createTopic({trainingId});
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

