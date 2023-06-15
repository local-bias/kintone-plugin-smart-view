//@ts-check
const HP = 'https://konomi.app';
const CDN = 'https://cdn.jsdelivr.net/gh/local-bias/kintone-plugin-smart-view@latest';
const COMMON_CDN = 'https://cdn.jsdelivr.net/gh/local-bias/kintone-cdn@latest';
const localhost = 'https://127.0.0.1:5500';

/** @type {import('@konomi-app/kintone-utilities/dist/types/kintone.config')} */
export default {
  manifest: {
    base: {
      manifest_version: 1,
      version: '2.22.0',
      type: 'APP',
      name: {
        en: 'faster search plugin',
        ja: '一覧高速検索＆絞り込みプラグイン',
        zh: '更快的搜索插件',
      },
      description: {
        en: 'This plugin replaces the default view with a customized view and enables faster searches',
        ja: '指定した一覧を独自のテーブルに置き換え、高速な検索と絞り込みを実現します。',
        zh: '此插件用自定义视图替换默认视图并实现更快的搜索',
      },
      icon: 'image/icon.png',
      homepage_url: { ja: HP, en: HP },
      desktop: { js: [`${COMMON_CDN}/dist/desktop.js`], css: [] },
      mobile: { js: [`${COMMON_CDN}/dist/desktop.js`], css: [] },
      config: {
        html: 'html/config.html',
        js: [`${COMMON_CDN}/dist/config.js`],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      mobile: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      config: { js: [`${localhost}/dist/dev/config/index.js`] },
    },
    prod: {
      desktop: { js: [`${CDN}/cdn/desktop.js`] },
      mobile: { js: [`${CDN}/cdn/desktop.js`] },
      config: { js: [`${CDN}/cdn/config.js`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'] },
      mobile: { js: ['desktop.js'] },
      config: { js: ['config.js'] },
    },
  },
};
