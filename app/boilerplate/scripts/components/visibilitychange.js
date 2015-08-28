(function() {
  $(document).on('visibilitychange', function(event) {
    if (document.hidden) {
      console.log('hidden');
      utterance.text = 'Your cooking schedule will continue to run while you are away.';
      // pause timer
    } else {
      console.log('visible');
      utterance.text = 'Welcome back.';
      // resume timer
    }

    speechSynthesis.speak(utterance);
  });

})();
