angular.module('webSuenth.suenth', [
  'BufferLoader',
  'ui.bootstrap',
  'angularAwesomeSlider'
])

.controller('SuenthCtrl', function($scope, BufferLoader) {

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContext();

  $scope.globalVolume = 0.5;
  var globalAmp = audioContext.createGain();
  globalAmp.gain.volume = $scope.globalVolume;
  globalAmp.connect(audioContext.destination);

  var oscillator = {};

  var TONES = ['C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A', 'A#1', 'H1', 'C2'];
  $scope.buttons = [];

  $scope.oscillatorTypes = ['sine', 'square', 'triangle', 'sawtooth'];
  $scope.filterTypes = ['allpass', 'highpass', 'lowpass', 'bandpass'];

  $scope.filter = {
    type: 'lowpass',
    frequency: 5000
  };

  $scope.oscillator = {
    type: 'sawtooth',
    volume: 0.5,
    attack: 0.5,
    decay: 1,
    sustain: 1,
    release: 0.5
  };

  var filter = audioContext.createBiquadFilter();

  $scope.playOscillatorTone = function(button, event) {
    if (event && event.buttons === 0) {
      return false;
    }

    console.log('Global Value: ', globalAmp.gain.volume);

    oscillator = audioContext.createOscillator();
    oscillator.type = $scope.oscillator.type;
    oscillator.frequency.value = button.pitch;

    var currentButton = $scope.buttons[button.index];
    currentButton.amp = getAmp();
    oscillator.connect(filter);
    filter.connect(currentButton.amp);
    currentButton.amp.connect(globalAmp);

    oscillator.start(audioContext.currentTime);
    currentButton.class = getColorOfKey(button.label) + ' active';
  };

  $scope.stopOscillatorTone = function(button) {
    if (oscillator && oscillator.stop) {
      // Sustain + Release
      var currentButton = $scope.buttons[button.index];
      if (currentButton && currentButton.amp) {
        currentButton.amp.gain.setTargetAtTime(0, audioContext.currentTime, $scope.oscillator.release);
      }
      oscillator.stop(audioContext.currentTime + parseFloat($scope.oscillator.release));
    }
    button.class = getColorOfKey(button.label);
  };

  function getColorOfKey(toneName) {
    if (toneName.indexOf('#') > -1) {
      return 'black';
    } else {
      return 'white';
    }
  }

  function getFrequencyFromMiddleC(offset) {
    return 440 * Math.pow(2, (3 + offset) / 12);
  }

  function setupButtons() {
    for (var i = 0; i < TONES.length; i++) {
      $scope.buttons.push({
        index: i,
        label: TONES[i],
        pitch: getFrequencyFromMiddleC(i),
        id: 'button' + TONES[i],
        class: getColorOfKey(TONES[i])
      });
    }
  }
  setupButtons();

  function getButtonIndex(label) {
    for (var i = 0; i < $scope.buttons.length; i++) {
      if ($scope.buttons[i].label === label) {
        return i;
      }
    }
    return false;
  }

  $scope.$watch('globalVolume', function(oldValue, newValue) {
    globalAmp.gain.volume = newValue;
  });

  $scope.$watch('filter.type', function(oldValue, newValue) {
    filter.type = newValue;
  });

  $scope.$watch('filter.frequency', function(oldValue, newValue) {
    filter.frequency.value = newValue;
  });

  function getAmp() {
    var amp = audioContext.createGain();
    amp.gain.value = 0;
    // Attack
    amp.gain.setTargetAtTime($scope.oscillator.volume,
      audioContext.currentTime, parseFloat($scope.oscillator.attack));
    return amp;
  }


  /**
   * wav player
   */
  var wavSound = {};

  myBufferLoader = new BufferLoader(
    audioContext, [
      'assets/sounds/arp2.wav'
    ],
    function(bufferList) {
      wavSound = bufferList[0];
    }
  );
  myBufferLoader.load();

  function playSound(buffer) {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(globalAmp);
    source.start(0);
    // note: on older systems, may have to use deprecated noteOn(time);
  }

  $scope.playSound = function() {
    playSound(wavSound);
  };

})

;
