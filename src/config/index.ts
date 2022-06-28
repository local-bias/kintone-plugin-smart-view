import main from './main';
import '@common/sentry';

((PLUGIN_ID) => main(PLUGIN_ID))(kintone.$PLUGIN_ID);
