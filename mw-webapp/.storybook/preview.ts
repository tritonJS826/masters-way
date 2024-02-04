import type { Preview } from "@storybook/react";
import { Theme, ThemeWorker } from './../src/utils/ThemeWorker';

ThemeWorker.setTheme(Theme.LIGHT);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
