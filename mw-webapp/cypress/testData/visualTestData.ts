export const viewports = [
  {name: 'desktop', width: 1920, height: 1080},
  {name: 'tablet', width: 768, height: 1024},
  {name: 'mobile', width: 375, height: 812},
];

export const themes = [
  {name: 'light', clicks: 0},
  {name: 'obsidian', clicks: 1},
  {name: 'night', clicks: 2},
];

export const matchImageSnapshotParam: {
  failureThreshold: number;
  failureThresholdType: 'percent' | 'pixel';
  capture: 'viewport' | 'fullPage';
} = {
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
  capture: 'viewport',
};