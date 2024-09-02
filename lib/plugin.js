import MockYandexMetrika from '@nik7212/nuxt2-yandex-metrika/lib/yandexMetrikaMock';

export default ({ app, $config}, inject) => {
  const emptyID = 'XXXXXXXX';
  const { useRuntimeConfig, ...moduleOptions} = JSON.parse('<%= JSON.stringify(options) %>');
  if ($config && useRuntimeConfig) {
    Object.assign(moduleOptions, $config[useRuntimeConfig])
  }
  const { router } = app;
  let navigationReady = false;

  const isProduction = process.env.NODE_ENV === 'production';

  if (!moduleOptions.id) {
    moduleOptions.id = emptyID;
    console.warn('[nuxt-yandex-metrika]: YANDEX.METRIKA counter id not set');
  }

  if (!isProduction || moduleOptions.disabled) {
    console.warn(
      '[nuxt-yandex-metrika]: TRACKING is disabled, because env option is not \'production\'');
  }

  if (moduleOptions.debug) {
    console.warn(
      '[nuxt-yandex-metrika]: DEBUG is true: you\'ll see all API calls in the console');
  }

  /**
   *  Подписываемся на событие инициализации навигации(router)
   */
  router.onReady(() => {
    navigationReady = true;
  });

  const ymUrl =
    (moduleOptions.useCDN ? 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch' : 'https://mc.yandex.ru/metrika') +
    '/tag.js';

  let yandexMetrika;
  if(!isProduction || moduleOptions.disabled || moduleOptions.id === emptyID){
    /**
     *  В dev режиме мокаем сервис Yandex.Metrika
     */
    yandexMetrika = (window[`yaCounter${moduleOptions.id}`] = new MockYandexMetrika(moduleOptions));
  } else {
    /* eslint-disable */
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", ymUrl, "ym");
    /* eslint-enable */

    ym(moduleOptions.id, 'init', moduleOptions);

    yandexMetrika = {
      reachGoal: (targetName = '', params = {}) => ym(moduleOptions.id, 'reachGoal', targetName, params),
      hit: (url = '', options = {}) => ym(moduleOptions.id, 'hit', url, options),
      addFileExtension: (extensions) => ym(moduleOptions.id, 'addFileExtension', extensions),
      extLink: (url = '', options = {}) => ym(moduleOptions.id, 'extLink', url, options),
      file: (url = '', options = {}) => ym(moduleOptions.id, 'file', url, options),
      getClientID: (callback = (clientID) => clientID) => ym(moduleOptions.id, 'getClientID', callback),
      notBounce: (options = {}) => ym(moduleOptions.id, 'notBounce', options),
      params: (params = {}) => ym(moduleOptions.id, 'params', params),
      replacePhones: () => ym(moduleOptions.id, 'replacePhones'),
      setUserID: (userID) => ym(moduleOptions.id, 'setUserID', userID),
      userParams: (params = {}) => ym(moduleOptions.id, 'userParams', params),
    };
  }

  router.afterEach((to, from) => {
    if (!navigationReady) {
      /**
       *  Не дублируем hit c урлом
       */
      return;
    }

    yandexMetrika.hit(to.fullPath, {
      referer: from.fullPath,
    });
  });

  inject('yandexMetrika', yandexMetrika);
};
