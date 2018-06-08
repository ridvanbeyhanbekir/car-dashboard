function handleIncomingJsonData (jsonData) {
  if (Object.keys(jsonData).length > 0) {
    var action = jsonData.action;
    var data = jsonData.data;

    if (data instanceof Array) {
      for (var index=0; index < data.length; index++) {
        handleIncomingUpdate (data[index]);
      }
    } else {
      handleIncomingUpdate (data);
    }
  }
}

function handleIncomingUpdate (updateData) {
  if (Object.keys(updateData).length > 0) {
    var name = updateData.name;
    var value = updateData.value;

    switch (name) {
      case 'rpm':
        handleTachometerRotation (value);
        break; 
      case 'speed':
        handleMileageRotation (value, 'miles');
        break;
      case 'temperature':
        //handleTemperatureUpdate (value);
        break;
      case 'default': break;
    }
  }
}

$(function () {
  // if user is running mozilla then use it's built-in WebSocket

  window.WebSocket = window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket('ws://localhost:8083/');

  connection.onopen = function () {
    console.log('Connection opened on ws://localhost:8083/');
  };

  connection.onerror = function (error) {
    console.log('Connection error');
  };

  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)

    console.log('Web socket on message!');
    var jsonData = {};
    try {

      jsonData = JSON.parse(message.data);

    } catch (e) {

      console.log('This doesn\'t look like a valid JSON: ',
          message.data);
      return;
    }

    handleIncomingJsonData (jsonData);
  };
});