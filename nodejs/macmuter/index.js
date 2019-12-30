const execSync = require('child_process').execSync;
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

var mute_vol = 10;
var mute_duration = 3000;
var vol = 0;
function mute(){
  vol =  Number(execSync(get_volume()));
  // console.log(vol);
  const out =  execSync(set_volume(mute_vol));
  setTimeout(resume,mute_duration);
}
resume = function(){
  const out =  execSync(set_volume(vol));
}
function get_volume(){
  return `osascript -e "(get volume settings)'s output volume"`;
}
function set_volume(v){
  return `osascript -e "set volume ` + v + `/100*7"`;
}

client.connect('ws://localhost:1880/ws/trigger', 'echo-protocol');
