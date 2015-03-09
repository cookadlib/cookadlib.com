function setupDatabase() {
  var databaseName = 'structure';
  var db;
  var stores = [
    'navigation_primary',
    'navigation_secondary',
    'navigation_footer',
    'promos',
    'widgets',
    'pages'
  ];
  var structureDataRequest;
  var version = 1;

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

  function iterateStoreRecords(index, key) {
    if (key === 'pages') {
      return;
    }

    var transaction = db.transaction([key], 'readwrite');
    var objectStore = transaction.objectStore(key);

    objectStore.openCursor().onsuccess = function(event) {

      var cursor = event.target.result;

      if (cursor) {
        renderTemplate(key, cursor.value);

        cursor.continue();
      }

    };

  }

  function iterateStores() {
    $.each(stores, iterateStoreRecords);
  }

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
        structureDataRequest.done(populateStores).done(iterateStores);
      } else {
        iterateStores();
      }

      defer.resolve();
    };

    request.onupgradeneeded = function(event) {
      console.log('Database upgrade needed', event, stores);

      db = event.target.result;

      db.onerror = function(event) {
        console.log('Error', event);
        defer.reject();
      };

      event.target.transaction.onerror = window.indexedDB.onerror;

      setupStores(stores);

      structureDataRequest = $.getJSON('structure/' + language + '/main.json');
    };

    return defer;
  }

  function populateStores(stores) {
    $.each(stores, populateStore);
  }

  function populateStore(key, values) {
    var transaction = db.transaction([key], 'readwrite');

    transaction.oncomplete = function(event) {
      // console.log('Complete', event);
    };

    transaction.onerror = function(event) {
      console.log('Error', event);
    };

    var objectStore = transaction.objectStore(key);

    $.each(values, function(index, value) {
      var objectStoreRequest = objectStore.add(value);

      objectStoreRequest.onsuccess = function(event) {
        // console.log('objectStore.add success', event);
      };

    });

  }

  function renderTemplate(key, properties) {
    // Polymer.import(urls, callback);
    var selector = '#' + key;

    var host = document.querySelector(selector);

    if (host) {
      // var root = host.createShadowRoot();

      var element = document.createElement(properties.name);

      element.textContent = properties.textContent;

      var attributes = properties.attributes;

      for (var name in attributes) {

        if (attributes.hasOwnProperty(name)) {
          element.setAttribute(name, attributes[name]);
        }

      }

      host.appendChild(element);
    }

    // var number = 3500;
    // var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
    // var price = new Intl.NumberFormat(language).format(number);
    // var time = new Intl.DateTimeFormat(language).format(date);
    //
    // var host = document.querySelector('main article');
    // var root = host.createShadowRoot();
    //
    // var product = document.querySelector('template.product');
    //
    // product.content.querySelector('h1').textContent = $.t('greeting');
    // product.content.querySelector('time').textContent = time;
    // product.content.querySelector('.price').textContent = price;
    // product.content.querySelector('button.action-add-to-cart').textContent = $.t('ns.interface:button.continue');
    // product.content.querySelector('img').src = 'http://webcomponents.org/img/logo.svg';
    //
    // var clone = product.content.cloneNode(true);
    //
    // root.appendChild(clone);

    // var clone = document.importNode(product.content, true);
    // host.appendChild(clone);
  }

  function setupStores() {

    return $.when.apply($, $.map(stores, function(key, index) {
      return setupStore(index, key);
    })).promise();

  }

  function setupStore(index, key) {
    var defer = $.Deferred();

    if (db.objectStoreNames.contains(key)) {
      console.log('Deleting existing store', key);
      db.deleteObjectStore(key);
    }

    var createObjectStore = db.createObjectStore(key, {
      // keyPath: 'title',
      autoIncrement: true
    });

    createObjectStore.createIndex('name', 'name', {
      unique: false
    });

    // createObjectStore.createIndex('href', 'attributes.href', {
    //   unique: false
    // });
    //
    // createObjectStore.createIndex('title', 'attributes.title', {
    //   unique: false
    // });

    defer.resolve('Object store created for ', key);
    // console.log('Object store created for ', key);
  }

  // deleteDatabase();

  openDatabase(stores)
  .done(function() {
    console.log('Loaded data from IndexedDB');

    // iterateStores();
  })
  .fail(function() {
    console.log('Could not load data from IndexedDB');
  });

}

(setupDatabase)();
