/*global console:false, window:false, document:false, $:false, jQuery:false, speechSynthesis:false, SpeechSynthesisUtterance:false, i18n:false, Notification: false */

'use strict';

var db;
var databaseName = 'structure';
var language = window.navigator.language;
var utterance = new SpeechSynthesisUtterance();
var version = 1;

// language = 'fr';
// language = 'en-US';
// language = 'zh-CN';
// language = 'zh-HK';

utterance.lang = language;
utterance.rate = 0.1;

function appendContent() {
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

function processStructure() {
  // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
  var transaction = db.transaction([databaseName], 'readwrite');
  var objectStore = transaction.objectStore(databaseName);

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;

    // if there is still another cursor to go, keep running this code
    if (cursor) {
      console.log('cursor', cursor);
    }
  };

}

function router() {

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
    // If some other tab is loaded with the database, then it needs to be closed
    // before we can proceed.
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

    console.log('db.objectStoreNames', db.objectStoreNames);

    $.each(stores, function(key, value) {
      if (db.objectStoreNames.contains(key)) {
        console.log('deleting store', key);
        db.deleteObjectStore(key);
      }

      var objectStore = db.createObjectStore(key, {
        keyPath: 'title'
        // autoIncrement: true
      });

      objectStore.createIndex('href', 'href', {
        unique: true
      });

      objectStore.createIndex('title', 'title', {
        unique: false
      });
    });

    // db.close();

    console.log('Object store created.');
    defer.resolve();
  };

  return defer;
}

function saveItems(store, items) {
  var transaction = db.transaction([store], 'readwrite');

  transaction.oncomplete = function(event) {
    // console.log('complete', event);
  };

  transaction.onerror = function(event) {
    console.log('error', event);
  };

  var objectStore = transaction.objectStore(store);

  $.each(items, function(index, value) {
    var objectStoreRequest = objectStore.add(value);
    objectStoreRequest.onsuccess = function(event) {
      console.log('success', event);
    };
  });
}

function speech() {
  var speechPlayButtons = 'button[data-target^="speech"]';

  $('body').on('click', speechPlayButtons, function(event) {
    utterance.text = $.t('greeting');
    speechSynthesis.speak(utterance);
  });
}

function loadData() {
  var structure = $.getJSON('structure/' + language + '/main.json');
};


(function() {
  //check if local storage and IndexedDB have all the necessary data

  if (hasData) {
    // data = load from local storage
    loadData();
  } else {
    // data = load from remote
    saveData();
  }

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

  render();

  // deleteDatabase();

  // window.indexedDB.webkitGetDatabaseNames().onsuccess = function(sender,args) {
  //   console.log('webkitGetDatabaseNames', sender.target.result);
  // };

  $.when(structure, translate).then(
    function(structureResponse, translateResponse) {
      // router();
      // speech();
      // appendContent();

      var stores = structureResponse[0];

      openDatabase(stores).then(
        function() {
          // setTimeout(function() {
            $.each(stores, function(key, value) {
              saveItems(key, value);
            });
          // }, 1000);

        }, function() {
          console.log('openDatabase failed');
        }
      );
    },
    function(structureResponse, translateResponse) {
      console.log('failure');
    },
    function(structureResponse, translateResponse) {
      console.log('progress');
    }
  );

})();
