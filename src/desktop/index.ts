import { PLUGIN_NAME } from '@/common/statics';
import event from './event';
import { KintoneEventListener } from '@konomi-app/kintone-utilities';
import { pushPluginName } from '@/common/local-storage';
import '@/common/global';

((pluginId) => {
  try {
    pushPluginName();
  } catch (error) {}
  const listener = new KintoneEventListener({
    pluginId,
    errorHandler: (error, props) => {
      const { event } = props;
      event.error = `プラグイン「${PLUGIN_NAME}」の処理内でエラーが発生しました。`;
      console.error('エラー', error);
    },
    logDisabled: process.env.NODE_ENV === 'production',
  });
  event(listener);
})(kintone.$PLUGIN_ID);
