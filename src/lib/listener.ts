import { KintoneEventManager } from '@konomi-app/kintone-utilities';
import { isDev, isProd } from './global';
import { PLUGIN_NAME } from './statics';

export const listener = new KintoneEventManager({
  errorHandler: (error, props) => {
    const { event } = props;
    event.error = `プラグイン「${PLUGIN_NAME}」の処理内でエラーが発生しました。`;
    console.error('エラー', error);
    return event;
  },
  logPrefix: `[${PLUGIN_NAME}] `,
  logDisabled: isProd,
});

isDev && console.info('[plugin] Event listener has been initialized');
