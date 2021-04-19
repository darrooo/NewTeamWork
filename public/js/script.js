var socket = io();

function sockets(io, socket, data) {
  socket.on('setupCollectors', function(d) {
    //data.createUser(d.roomId, d.playerCount, d.lang);
  })
};

module.exports = sockets;
