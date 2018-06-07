$(function () {
  // if user is running mozilla then use it's built-in WebSocket

  window.WebSocket = window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket('ws://localhost:3000/ws');

  connection.onopen = function () {
    console.log('Connection opened on port 3000');

    connection.send('');
  };

  connection.onerror = function (error) {
    console.log('Connection error');
  };

  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)

    console.log('Web socket on message!');
    try {

      var json = JSON.parse(message.data);
      console.log(json);

    } catch (e) {

      console.log('This doesn\'t look like a valid JSON: ',
          message.data);
      return;

    }
  };
});