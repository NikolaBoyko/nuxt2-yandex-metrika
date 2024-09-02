// @ts-check

const path = require('path');
const config = require('./config');

/**
 * @typedef {Object} ThisType
 * @property {Object} nuxt - экземпляр Nuxt
 * @property {Object} options - опции(конфиги) Nuxt nuxt.config.js
 * @property {Function} addPlugin - метод для установки плагинов
 */

/**
 * @this ThisType
 * @param {{
 *   id?: string,
 *   webvisor?: boolean,
 *   clickmap?: boolean,
 *   useCDN?: boolean,
 *   trackLinks?: boolean,
 *   accurateTrackBounce?: boolean,
 *   debug?: boolean,
 *   noJS?: boolean,
 *   disabled?: boolean,
 *}} moduleOptions - Опции которые задаем модулю(плагину) в nuxt.config.js
 * @returns {void}
 */
export default function init( moduleOptions ) {
  const options = {
    ...config,
    useRuntimeConfig: this.options.publicRuntimeConfig
      ? 'yandexMetrika'
      : undefined,
    ...this.options.yandexMetrika,
    ...moduleOptions,
  };

  this.addPlugin(
    { src: path.resolve(__dirname, 'plugin.js'), mode: 'client', options });
}

module.exports.meta = require('../package.json');
