angular.module('webSuenth.suenth', [
  'BufferLoader'
])

.controller('SuenthCtrl', function($scope, BufferLoader) {

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();

  // var soundBuffer = null;
  // function loadSound(url) {
  //   var request = new XMLHttpRequest();
  //   request.open('GET', url, true);
  //   request.responseType = 'arraybuffer';
  //
  //   // Decode asynchronously
  //   request.onload = function() {
  //     context.decodeAudioData(request.response, function(buffer) {
  //       soundBuffer = buffer;
  //     }, function() {
  //       console.error('Loading sound failed!');
  //     });
  //   };
  //   request.send();
  // }
  // loadSound('http://localhost:8080/assets/sounds/arp2.wav');

  function playSound(buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
    // note: on older systems, may have to use deprecated noteOn(time);
  }

  var arpSound = {};

  myBufferLoader = new BufferLoader(
    context, [
      'assets/sounds/arp2.wav'
    ],
    function(bufferList) {
      console.log('Sound loaded!');
      arpSound = bufferList[0];
    }
  );
  myBufferLoader.load();

  $scope.playSound = function() {
    playSound(arpSound);
  };

})

;
