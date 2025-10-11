// @ts-check
const HP = 'https://konomi.app';
const cdn = 'https://kintone-plugin.konomi.app';
const key = 'smart-view';

/** @satisfies { Plugin.Meta.Config } */
export default /** @type { const } */ ({
  version: 1,
  id: `ribbit-kintone-plugin-${key}`,
  pluginReleasePageUrl: 'https://ribbit.konomi.app/kintone-plugin/',
  server: {
    port: 4689,
  },
  lint: {
    build: false,
  },
  tailwind: {
    css: 'src/styles/global.css',
    config: {
      desktop: 'tailwind.config.desktop.mjs',
      config: 'tailwind.config.config.mjs',
    },
  },
  manifest: {
    base: {
      manifest_version: 1,
      version: '5.4.0',
      type: 'APP',
      name: {
        en: 'faster search plugin',
        ja: '一覧高速検索＆絞り込みプラグイン',
        zh: '更快的搜索插件',
        'zh-TW': '更快的搜尋插件',
        es: 'Complemento de búsqueda rápida',
        'pt-BR': 'Plugin de busca rápida',
        th: 'ปลั๊กอินค้นหาอย่างรวดเร็ว',
      },
      description: {
        en: 'This plugin replaces the default view with a customized view and enables faster searches',
        ja: '指定した一覧を独自のテーブルに置き換え、高速な検索と絞り込みを実現します。',
        zh: '此插件用自定义视图替换默认视图并实现更快的搜索',
        'zh-TW': '此插件透過無縫連接多個應用程式來大幅提高工作效率，除了快速搜尋。',
        es: 'Este complemento mejora enormemente la eficiencia del trabajo al conectar sin problemas múltiples aplicaciones además de la búsqueda rápida.',
        'pt-BR':
          'Este plugin melhora muito a eficiência do trabalho conectando vários aplicativos de forma contínua, além de uma busca rápida.',
        th: 'ปลั๊กอินนี้ช่วยเพิ่มประสิทธิภาพการทำงานอย่างมากโดยการเชื่อมต่อแอปพลิเคชันหลายตัวอย่างไร้รอยต่อ นอกเหนือจากการค้นหาอย่างรวดเร็ว',
      },
      icon: 'icon.png',
      homepage_url: { ja: HP, en: HP },
      desktop: {
        js: [`${cdn}/common/desktop.js`],
        css: [`${cdn}/common/desktop.css`],
      },
      mobile: {
        js: [`${cdn}/common/desktop.js`],
        css: [`${cdn}/common/desktop.css`],
      },
      config: {
        html: 'config.html',
        js: [`${cdn}/common/config.js`],
        css: [`${cdn}/common/config.css`],
        required_params: [],
      },
    },
    prod: {
      desktop: {
        js: [`${cdn}/${key}/desktop.js`],
        css: [`${cdn}/${key}/desktop.css`],
      },
      mobile: {
        js: [`${cdn}/${key}/desktop.js`],
        css: [`${cdn}/${key}/desktop.css`],
      },
      config: {
        js: [`${cdn}/${key}/config.js`],
        css: [`${cdn}/${key}/config.css`],
      },
    },
    standalone: {
      desktop: { js: ['desktop.js'], css: ['desktop.css'] },
      mobile: { js: ['desktop.js'], css: ['desktop.css'] },
      config: { js: ['config.js'], css: ['config.css'] },
    },
  },
});
