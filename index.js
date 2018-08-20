var net = require('net');
var colors = require('colors');
var express = require('express');
const { urlencoded } = require('body-parser');
const Buffer  = require('buffer');

var bodyParser = require('body-parser');
var server = net.createServer();
var app = express();

var changes = [];
var newData = [true, 123];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/getData', (req, res) => {
    if(newData.length){
        let d = newData;
        newData = [];
        res.status(200).send({data: d});
        
    } else {
        res.send(304);
    }
});

app.post('/someUrl', (req, res) => {
    res.send(200);
    const { message } = req.body;
    console.log('some URL', message);
    changes.push(message)

});

server.on("connection", (socket) => {
    var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
    console.log("new client connected %s".green, remoteAddress);

    socket.on("data", (d) => {
        let str = `Data from ${remoteAddress} ${d}`;
        console.log('Data from %s: %s'.cyan, remoteAddress, d);
        if(changes.length){
            socket.write(changes.shift())
        }
        newData.push(str);
    });

    socket.once("close", () =>{
        console.log('Connection from %s closed'.yellow, remoteAddress);
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

