var DashboardManager = {
  handleIncomingJsonData : function (jsonData) {
    if (Object.keys(jsonData).length > 0) {
      var action = jsonData.action;
      var data = jsonData.data;

      if (data instanceof Array) {
        for (var index=0; index < data.length; index++) {
          this.handleIncomingUpdate (data[index]);
        }
      } else {
        this.handleIncomingUpdate (data);
      }
    }
  },
  handleIncomingUpdate : function (updateData) {
    if (Object.keys(updateData).length > 0) {
      var name = updateData.name;
      var value = updateData.value;

      switch (name) {
        case 'rpm':
          Tachometer.handleTachometerRotation (value);
          break; 
        case 'speed':
          Speedometer.handleMileageRotation (value, 'miles');
          break;
        case 'gear':
          MiniDisplayManager.handleGearUpdate (value);
          break;
        case 'temperature':
          MiniDisplayManager.handleTemperatureUpdate (value, 'celcius');
          break;
        case 'default': break;
      }
    }
  }
};