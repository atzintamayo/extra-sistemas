const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const jm = require('js-meter')
const { Socket } = require('dgram')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  const isPrint = true
  const isKb = true// or Mb
  const m = new jm({isPrint, isKb})

  for(var i=0; i<10000; i++){
      Math.random()
  }

  const meter = m.stop()

    socket.on('info', (data) => {
      io.emit('info', data);
    });
    console.log('a user connected');
    socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

/*
// Requiring module
var process = require('process')

// An example displaying the respective memory
// usages in megabytes(MB)
 for (const [key,value] of Object.entries(process.memoryUsage())){
    console.log(`Memory usage by ${key}, ${value/1000000}MB `)
}


    
    
    //console.log(meter)
   */
