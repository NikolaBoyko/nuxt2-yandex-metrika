export default function MockYandexMetrika({ debug = false, ...options }) {
  this.debug = debug;
  console.log('[nuxt-yandex-metrika] MockYandexMetrika recived options:', options);
}

MockYandexMetrika.prototype.addFileExtension = function() {
  console.log('[nuxt-yandex-metrika] addFileExtension:', arguments);
};

MockYandexMetrika.prototype.extLink = function() {
  console.log('[nuxt-yandex-metrika] extLink:', arguments);
};

MockYandexMetrika.prototype.file = function() {
  console.log('[nuxt-yandex-metrika] file:', arguments);
};

MockYandexMetrika.prototype.getClientID = function() {
  console.log('[nuxt-yandex-metrika] getClientID:', arguments);
};

MockYandexMetrika.prototype.hit = function() {
  console.log('[nuxt-yandex-metrika] hit:', arguments);
};

MockYandexMetrika.prototype.notBounce = function() {
  console.log('[nuxt-yandex-metrika] notBounce:', arguments);
};

MockYandexMetrika.prototype.params = function() {
  console.log('[nuxt-yandex-metrika] params:', arguments);
};

MockYandexMetrika.prototype.reachGoal = function() {
  console.log('[nuxt-yandex-metrika] reachGoal:', arguments);
};

MockYandexMetrika.prototype.replacePhones = function() {
  console.log('[nuxt-yandex-metrika] replacePhones:', arguments);
};

MockYandexMetrika.prototype.setUserID = function() {
  console.log('[nuxt-yandex-metrika] setUserID:', arguments);
};

MockYandexMetrika.prototype.userParams = function() {
  console.log('[nuxt-yandex-metrika] userParams:', arguments);
};
