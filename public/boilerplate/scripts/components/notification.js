(function() {
  var notificationOpenButtons = 'button[data-target^="notification"]';
  var $notificationOpenButtons = $(notificationOpenButtons);

  Notification.requestPermission(function(permission){
    console.log('permission', permission);
  });

  if (Notification.permission === 'granted') {
    $('body').on('click', notificationOpenButtons, function(event) {
      var target = $(event.target).attr('data-target');

      var notification1 = new Notification('A Simple Title', {
        body: 'Donald Duck approves',
        icon: './images/Donald-Duck-small.png'
      });
    });
  }
})();
