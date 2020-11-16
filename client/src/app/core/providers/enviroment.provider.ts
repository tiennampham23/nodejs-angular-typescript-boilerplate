import {EnvironmentService} from '@authentication-based/shared/services';

export const EnvironmentServiceFactory = () => {
  const environment = new EnvironmentService();
  const env = 'environment';
  const browserWindowEnvironment = window[env] || {};
  for (const key in browserWindowEnvironment) {
    if (browserWindowEnvironment.hasOwnProperty(key)) {
      environment[key] = browserWindowEnvironment[key];
    }
  }
  return environment;
};

export const EnvironmentServiceProvider: any = {
  provide: EnvironmentService,
  useFactory: EnvironmentServiceFactory,
  deps: []
};
