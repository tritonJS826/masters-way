import {makeAutoObservable} from "mobx";
import {localStorageWorker} from "src/utils/LocalStorageWorker";

/**
 * All device related methods
 */
class DeviceStore {

  /**
   * Device ID value
   */
  public deviceId: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadDeviceId();
  }

  /**
   * Load device ID
   */
  public loadDeviceId = () => {
    const getDeviceId = localStorageWorker.getItemByKey<string>("deviceId");

    const deviceId = getDeviceId;

    deviceId && this.setDeviceId(deviceId);
  };

  /**
   * Set device ID
   */
  public setDeviceId = (deviceId: string) => {
    localStorageWorker.setItemByKey("deviceId", deviceId);
    this.deviceId = deviceId;
  };

}

export const deviceStore = new DeviceStore();
