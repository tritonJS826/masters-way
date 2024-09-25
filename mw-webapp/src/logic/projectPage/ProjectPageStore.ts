import {makeAutoObservable} from "mobx";
import {ProjectDAL} from "src/dataAccessLogic/ProjectDAL";
import {load} from "src/hooks/useLoad";
import {Project} from "src/model/businessModel/Project";

/**
 * ProjectPageStore related methods
 */
export class ProjectPageStore {

  /**
   * Project value
   * Should be initialized!
   */
  public project!: Project;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(projectUuid: string) {
    makeAutoObservable(this);
    this.initialize(projectUuid);
  }

  /**
   * Set project
   */
  private setProject = (project: Project) => {
    this.project = project;
  };

  /**
   * Initialize
   */
  private async initialize(projectUuid: string) {
    await load<Project>({

      /**
       * Load data
       */
      loadData: () => this.loadData(projectUuid),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setProject,
    });

    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (projectUuid: string): Promise<Project> => {
    const project = await ProjectDAL.getProject(projectUuid);

    return project;
  };

  /**
   * Validate data
   */
  private validateData = (data: Project) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
