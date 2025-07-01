import {topicDTOToTopic} from "src/dataAccessLogic/DTOToPreviewConverter/topicDTOToTopic";
import {topicPreviewDTOToTopicPreview} from "src/dataAccessLogic/DTOToPreviewConverter/topicPreviewDTOToTopicPreview";
import {Topic} from "src/model/businessModel/Topic";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {TopicService} from "src/service/TopicService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Create topics params
 */
export interface CreateTopicsParams {

  /**
   * Training uuid
   */
  trainingId: string;

  /**
   * Topic's parent Id
   */
  topicsParentId?: string;

  /**
   * Topic's names
   */
  topicsName: string[];
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
  public static async createTopics(params: CreateTopicsParams): Promise<TopicPreview[]> {
    const topicsNames = params.topicsName.map((topicName) => ({name: topicName}));
    const topicsPreviewDTO = await TopicService.createTopics({
      request: {topicsPayload: topicsNames},
      trainingId: params.trainingId,
      topicsParentId: params.topicsParentId,
    });
    const topicsPreview = topicsPreviewDTO.topics.map(topicPreviewDTOToTopicPreview);

    return topicsPreview;
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
  public static async updateTopic(topic: PartialWithUuid<Topic>): Promise<TopicPreview> {
    const updatedTopicDTO = await TopicService.updateTopic({
      topicId: topic.uuid,
      request: {name: topic.name ?? ""},
    });
    const updatedTopic = topicPreviewDTOToTopicPreview(updatedTopicDTO);

    return updatedTopic;
  }

  /**
   * Delete topic
   */
  public static async deleteTopic(topicId: string): Promise<void> {
    await TopicService.deleteTopic({topicId});
  }

}

