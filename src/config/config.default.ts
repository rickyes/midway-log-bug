import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611123404347_5832';

  // add your config here
  config.middleware = ['accessMiddleware'];

  config.logger = {
    dir: path.join(appInfo.appDir, 'logs'),
    appLogName: 'app-web.log',
    errorLogName: 'app-error.log',
  };

  config.customLogger = {
    accessLogger: {
      file: path.join(config.logger.dir, 'access.log'),
    },
  };

  return config;
};
