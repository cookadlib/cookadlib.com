/*global console:false, window:false, document:false, $:false, jQuery:false, speechSynthesis:false, SpeechSynthesisUtterance:false, i18n:false, Notification: false */

'use strict';

var data;
var databaseName = 'structure';
var db;
var language = window.navigator.language;
var stores = [
  'navigation_primary',
  'navigation_secondary',
  'navigation_footer',
  'promos',
  'widgets',
  'pages'
];
var structureData;
var structureDataRequest;
var utterance = new SpeechSynthesisUtterance();
var version = 1;

// language = 'fr';
// language = 'en-US';
// language = 'zh-CN';
// language = 'zh-HK';

utterance.lang = language;
utterance.rate = 0.1;

function render() {
  var number = 3500;
  var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  var price = new Intl.NumberFormat(language).format(number);
  var time = new Intl.DateTimeFormat(language).format(date);

  var host = document.querySelector('main article');
  var root = host.createShadowRoot();

  var product = document.querySelector('template.product');

  product.content.querySelector('h1').textContent = $.t('greeting');
  product.content.querySelector('time').textContent = time;
  product.content.querySelector('.price').textContent = price;
  product.content.querySelector('button.action-add-to-cart').textContent = $.t('ns.interface:button.continue');
  product.content.querySelector('img').src = 'http://webcomponents.org/img/logo.svg';

  var clone = product.content.cloneNode(true);

  root.appendChild(clone);

  // var clone = document.importNode(product.content, true);
  // host.appendChild(clone);
}

function renderTemplatesForStore(index, key) {
  // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through

  console.log(index, key);

  var transaction = db.transaction([key], 'readwrite');
  var objectStore = transaction.objectStore(key);

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;

    // if there is still another cursor to go, keep running this code
    if (cursor) {
      console.log('cursor', cursor);
    }
  };
}

function renderTemplates() {
  $.each(stores, renderTemplatesForStore);
}

function deleteDatabase() {
  var defer = $.Deferred();

  var request = window.indexedDB.deleteDatabase(databaseName);

  request.onsuccess = function() {
    console.log('Deleted database successfully');
    defer.resolve();
  };

  request.onerror = function() {
    console.log('Unable to delete database');
    defer.reject('Unable to delete database');
  };

  request.onblocked = function() {
    console.log('Unable to delete database due to the operation being blocked');
    defer.reject('Unable to delete database due to the operation being blocked');
  };

};

function openDatabase(stores) {
  var defer = $.Deferred();

  var request = window.indexedDB.open(databaseName, version);

  request.onblocked = function(event) {
    // If some other tab is loaded with the database, then it needs to be closed before we can proceed.
    console.log('Please close all other tabs with this site open!');
  };

  request.onerror = function(event) {
    defer.reject('Unable to open database due to error code: ' + event.target.errorCode);
  };

  request.onsuccess = function(event) {
    db = this.result;

    db.onversionchange = function(event) {
      console.log('A new version of this page is ready. Please reload!');

      db.close();
    };

    if (structureDataRequest) {
      structureDataRequest.done(populateStores).done(function(data) {
        renderTemplates();
      });
    } else {
      renderTemplates();
    }

    defer.resolve();
  };

  request.onupgradeneeded = function(event) {
    console.log('database upgrade needed', event, stores);

    db = event.target.result;

    db.onerror = function(event) {
      console.log('error', event);
      defer.reject();
    };

    event.target.transaction.onerror = window.indexedDB.onerror;

    // console.log('stores', stores);
    setupStores(stores);

    console.log('setupStores 1');

    structureDataRequest = $.getJSON('structure/' + language + '/main.json');
  };

  return defer;
}

function setupStores() {
  console.log('setupStores');

  return $.when.apply($, $.map(stores, function(key, index) {
    console.log('setupStores', key, index);
    return setupStore(index, key);
  })).promise();

}

function setupStore(index, key) {
  console.log('setupStore', index, key);

  var defer = $.Deferred();

  if (db.objectStoreNames.contains(key)) {
    console.log('Deleting existing store', key);
    db.deleteObjectStore(key);
  }

  var createObjectStore = db.createObjectStore(key, {
    keyPath: 'title'
  });

  createObjectStore.createIndex('name', 'name', {
    unique: false
  });

  createObjectStore.createIndex('href', 'href', {
    unique: true
  });

  createObjectStore.createIndex('title', 'title', {
    unique: false
  });

  defer.resolve('Object store created for ', key);
  // console.log('Object store created for ', key);
}

function populateStores(stores) {
  console.log('populateStores');
  $.each(stores, populateStore);
}

function populateStore(key, values) {
  console.log('populateStore, key, values', key, values);

  var transaction = db.transaction([key], 'readwrite');

  transaction.oncomplete = function(event) {
    console.log('complete', event);
  };

  transaction.onerror = function(event) {
    console.log('error', event);
  };

  var objectStore = transaction.objectStore(key);

  $.each(values, function(index, value) {
    var objectStoreRequest = objectStore.add(value);
    objectStoreRequest.onsuccess = function(event) {
      console.log('success', event);
    };
  });

}

(function() {
  deleteDatabase();

  openDatabase(stores)
  .done(function() {
    console.log('Loaded data from IndexedDB');

    render();
  })
  .fail(function() {
    console.log('Could not load data from IndexedDB');
  });

  var translate = i18n.init({
    debug: true,
    fallbackLng: 'en',
    lng: language,
    lngWhitelist: [
      'en',
      'en-GB',
      'en-US',
      'fr',
      'zh',
      'zh-CN',
      'zh-HK'
    ],
    ns: {
      namespaces: [
        'ns.common',
        'ns.interface'
      ],
      defaultNs: 'ns.common',
    },
    useLocalStorage: false
  });

})();
