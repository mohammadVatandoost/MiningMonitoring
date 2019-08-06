const find = require('local-devices');
var  request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');

var minersInfo = [];

 request("http://admin:admin@192.168.1.1", function(error, response, body) {
     console.log("test mining");
     console.log(response);
     console.log(body);
  });


function checkInternet(cb) {
    require('dns').lookup('google.com',function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}

// example usage:
checkInternet(function(isConnected) {
    if (isConnected) {
        // connected to the internet
        console.log("connected") ;
    } else {
        // not connected to the internet
        console.log("not connected") ;
    }
});


const deafaultPort = 3333;

// Find all local network devices.
find().then(devices => {
  console.log(devices) ;
  minersIp.push(devices.ip);
  // createSocket(devices);
  /*
  [
    { name: '?', ip: '192.168.0.10', mac: '...' },
    { name: '...', ip: '192.168.0.17', mac: '...' },
    { name: '...', ip: '192.168.0.21', mac: '...' },
    { name: '...', ip: '192.168.0.22', mac: '...' }
  ]
  */
});


function createSocket(device) {
  var s = require('net').Socket();
  s.connect(deafaultPort, device.ip);
  var message = {'command': 'summary'} ;
  s.write(JSON.stringify(message));
  s.on('data', function(d){
    console.log(d.toString());
  });

  s.end();
}


setInterval(checkMiners, 3000);


function checkMiners() {
  find().then(devices => {
    console.log("checkMiners");
    console.log(devices) ;
     // minersIp.push(devices.ip);
     for(var i=0; i<devices.length; i++) {
       request("http://admin:admin@1"+devices.ip, function(error, response, body) {
         console.log("test mining");
         console.log(response);
         console.log(body);
         console.log(error);
       });
     }
     
  });
}

function sendToServer() {
  var route = "";
  axios.post(route, {minersInfo: minersInfo}).then((response) => {

  }).catch((error) => {console.log("error sendToServer()");console.log(error); });
}