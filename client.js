var net = require('net');

var client = new net.Socket();
client.connect({
    port: 4040
});

client.on('connect', () => {
    console.log('Client: connection established with server');

    console.log('-------Client details-------');
    var address = client.address();
    var port = client.port();
    var family = client.family();
    var ipadrr = address.address;
    console.log('Client is linstening on port ' + port);
    console.log('Client ip :' + ipadrr);
    console.log('Client is IP4/IP6 :' + family);

    client.write('Hello from client');

});

client.on('data', (data) => {
    console.log('Data from server :' + data);
})