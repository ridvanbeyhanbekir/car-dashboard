var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var router = express.Router();

/* GET home page. */
router.ws('/ws', function (ws, req) {
  ws.on('message', function (message) {
  	var sentData = {
  		'speed': {
  			'unit': 'kilometers',
  			'value': 60
  		}
  	};

  	try {
  		//var data = JSON.parse(message);
      	//if (data.type === 'get') {
      		ws.send(JSON.stringify(sentData));
    		console.log('Data sent: ' + JSON.stringify(sentData));
      	//}

    } catch (e) {

      console.log('Error occured while sending back data \n' + e.message);
      return;
    }
  });
});

module.exports = router;