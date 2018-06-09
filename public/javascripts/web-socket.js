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

          console.log('This doesn\'t look like a valid JSON: ', message.data);
          return;
      }

      DashboardManager.handleIncomingJsonData(jsonData);
  };
});