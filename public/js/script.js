var socket
  , steps;
impress().init();

$(document).ready(function(){
  steps = $('.step');
  socket = io.connect('http://html5');
  socket.on('gotopag', function(data){
    impress().goto(data.pag);
  });
  this.addEventListener("impress:stepenter", canviaPag , false);
});

function canviaPag (event) {
  var nPag = steps.index(event.target);
  socket.emit('changePag', {pag: nPag});
}

