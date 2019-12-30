var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('WebSocket Client Closed');
    });
    connection.on('message', function(message) {
        console.log(message);
        // if (message.type === 'utf8') {
        //     console.log("Received: '" + message.utf8Data + "'");
        // }
        mute();
    });

    // connection.sendUTF("sent.");
    // connection.send({test:true});
});

funciton mute(){
  
}

client.connect('ws://localhost:1880/ws/trigger', 'echo-protocol');
