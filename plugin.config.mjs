//@ts-check
const HP = 'https://konomi.app';
const common = 'https://kintone-plugin.konomi.app/common';
const localhost = 'https://127.0.0.1:4689';

/** @type {import('@konomi-app/kintone-utilities').PluginConfig} */
export default {
  version: 1,
  manifest: {
    base: {
      manifest_version: 1,
      version: '3.0.1',
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
      icon: 'icon.png',
      homepage_url: { ja: HP, en: HP },
      desktop: { js: [`${common}/desktop.js`], css: [] },
      mobile: { js: [`${common}/desktop.js`], css: [] },
      config: {
        html: 'config.html',
        js: [`${common}/config.js`],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: {
        js: [`${localhost}/dist/dev/desktop/index.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      mobile: {
        js: [`${localhost}/dist/dev/desktop/index.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      config: {
        js: [`${localhost}/dist/dev/config/index.js`],
        css: [`${localhost}/dist/dev/config.css`],
      },
    },
    prod: {
      desktop: { js: [`desktop.js`], css: [`desktop.css`] },
      mobile: { js: [`desktop.js`], css: [`desktop.css`] },
      config: { js: [`config.js`], css: [`config.css`] },
    },
    standalone: {
      desktop: { js: [`desktop.js`], css: [`desktop.css`] },
      mobile: { js: [`desktop.js`], css: [`desktop.css`] },
      config: { js: [`config.js`], css: [`config.css`] },
    },
  },
};
