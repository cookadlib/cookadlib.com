'use strict';

function setupTranslation() {
  var language = window.navigator.language;
  var languageWhitelist = [
    'en',
    'en-GB',
    'en-US',
    'fr',
    'zh',
    'zh-CN',
    'zh-HK'
  ];

  var translate = i18n.init({
    debug: true,
    fallbackLng: 'en',
    lng: language,
    lngWhitelist: languageWhitelist,
    ns: {
      namespaces: [
        'ns.common',
        'ns.interface'
      ],
      defaultNs: 'ns.common',
    },
    // useDataAttrOptions: true,
    useLocalStorage: false
  }).done(function() {
    // var x = $.t('ns.interface:copyright');
    // var y = $.t('interface:copyright');
    // var z = $.t('ns.interface');
    // console.log('ns.interface:copyright', x, y, z);
    // $('.colophon').css({'color': 'red'}).i18n();
    $('body').i18n();
  });
}

window.addEventListener('WebComponentsReady', setupTranslation);
// $(setupTranslation);
