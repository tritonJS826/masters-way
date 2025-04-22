declare module 'cypress-image-snapshot/plugin' {
    import { PluginConfigOptions } from 'cypress';
    export function addMatchImageSnapshotPlugin(
      on: Cypress.PluginEvents,
      config: PluginConfigOptions
    ): void;
  }
  
  declare module 'cypress-image-snapshot/command' {
    interface MatchImageSnapshotOptions {
      failureThreshold?: number;
      failureThresholdType?: 'pixel' | 'percent';
      customDiffConfig?: Record<string, unknown>;
      capture?: 'viewport' | 'fullPage';
      customSnapshotsDir?: string;
      customDiffDir?: string;
      customSnapshotIdentifier?: string | (() => string);
      blackout?: string[];
    }
  
    declare global {
      namespace Cypress {
        interface Chainable {
          matchImageSnapshot(nameOrOptions?: string | MatchImageSnapshotOptions): void;
        }
      }
    }
  
    export function addMatchImageSnapshotCommand(): void;
  }
  