(function() {
  var speechPlayButtons = 'button[data-target^="speech"]';
  var $speechPlayButtons = $(speechPlayButtons);

  $('body').on('click', speechPlayButtons, function(event) {
    console.log('play');
    // utterance.text = '你好, 凯兰';
    // utterance.text = 'Beat the mixture for a couple of minutes, then start sprinkling in the flour.';
    utterance.text = $.t('greeting');
    speechSynthesis.speak(utterance);
  });
})();
