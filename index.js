var net = require('net');
var colors = require('colors');
var express = require('express');
const transcode = require('buffer').transcode;
const { urlencoded } = require('body-parser');
const Buffer  = require('buffer').Buffer;
var _underscore = require('underscore');
var encoding = require('encoding');

var bodyParser = require('body-parser');
var server = net.createServer();
var app = express();

var changes = [];
const newData = initLocalMemory();

function initLocalMemory() {
  const arr = [];

  return {
    add: function(data) {
      arr.push(data);
    },
    give: function() {
      return [].concat(arr);
    },
    clear: function() {
      let amount = arr.length;
      for( let i = 0; i< amount; i++) {
        arr.pop();
      }
    },
  }
}

app.use(bodyParser.json());
app.use(express.static('dist'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/getData', (req, res) => {
    if(newData.give().length){
        let d = newData.give();
        newData.clear();
        console.log('New Data', newData.give());
        res.status(200).send({data: d});
        
    } else {
        res.send(200);
    }
});

app.post('/someUrl', (req, res) => {
  res.send(200);
  let message = req.body.message;

  //message = Buffer.from(message, 'ascii');

  //Старый буффер
//  let front_wrapp = Buffer.from([ 0x43,  0x2c]);
//  let back_wrapp = Buffer.from([ 0x20,  0x0d]);
//  message =  Buffer.concat([front_wrapp, message, back_wrapp], front_wrapp.length + message.length + back_wrapp.length);
//   console.log('some URL', message);
//   changes.push(message.toString('ascii'));
});
//let bitList = message.split(' ').filter(i => i !== '').map(e=> +('0x'+e));
//let someIndexData = 0;
//setInterval( ()=> newData.add('TXT txt'+ someIndexData++) , 10000);

server.on("connection", (socket) => {
  var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
  console.log("new client connected %s".green, remoteAddress);

  socket.on("data", (d) => {
    d = d.toString();
    console.log(remoteAddress, d);

    let isResp = d.match(/[a-zA-Z]/);

    let data

    if (isResp) {
      data = {
        from: remoteAddress,
        resp: d,
      }
    } else {
      let values = d.split(',');
      data = {
        from: remoteAddress,
        c: values[0],
        s: values[1],
      }
    }

      if(changes.length){
   let toDevice = changes.shift();
   console.log('toDevice:', toDevice, toDevice.length);
          socket.write(toDevice, 'ascii');
      }
      newData.add(data);
  });

    socket.once("close", () =>{
        console.log('Connection  %s closed'.yellow, remoteAddress);
    });

    socket.on("error", (err) =>{
        console.log('Connection %s error: %s'.red, remoteAddress, err.message);
    });

});

server.listen(4040, () => {
    console.log("Server start at port %j", server.address());
});

app.listen(3000, () => {
    console.log('Server express started ')
});

