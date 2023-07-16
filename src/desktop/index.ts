import '@/lib/global';
import { pushPluginName } from '@/lib/local-storage';
import { PLUGIN_NAME } from '@/lib/statics';
import { KintoneEventListener } from '@konomi-app/kintone-utilities';
import event from './event';

try {
  pushPluginName();
} catch (error) {}

const listener = new KintoneEventListener({
  errorHandler: (error, props) => {
    const { event } = props;
    event.error = `プラグイン「${PLUGIN_NAME}」の処理内でエラーが発生しました。`;
    console.error('エラー', error);
  },
  logDisabled: process.env.NODE_ENV !== 'development',
});

event(listener);
