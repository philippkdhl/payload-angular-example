import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {App} from './app/app';
import {StorybookConfig} from '@storybook/angular';


const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
};

export default config;

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
