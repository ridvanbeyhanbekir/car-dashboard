var MiniDisplayManager = {
	getSelectedTemperatureUnit: function () {
		return $('#dashboard-mini-temperature').find('input[type="radio"]:checked');
	},
	updateTemperatureUnit : function () {
		var $selectedTempUnit = this.getSelectedTemperatureUnit();
		var selectedTempUnitId = $selectedTempUnit.attr('id');
		var $selectedTempUnitLabel = $('label[for="' + selectedTempUnitId + '"]');

		$('#temp-unit').text($selectedTempUnitLabel.text());
	},
	convertTemperatureValue(value, from) {
		value = value || 0;
		var temperatureValue = parseInt(value);

		if (!isNaN(temperatureValue) && from) {
			if (from === 'celcius') { // to miles
			
				temperatureValue = (temperatureValue * (9 / 5)) + 32;

			} else if (from === 'fahrenheit') { // to kilometers

				temperatureValue = (temperatureValue - 32) * (5 / 9);

			}
		}

		return Math.round(temperatureValue);
	},
	handleTemperatureUpdate : function (temperature, unit) {
		temperature = temperature || 0;
		var temperature = parseInt(temperature);
		var $checkedDisplayMode = this.getSelectedTemperatureUnit();
		var checkedDisplayModeValue = $checkedDisplayMode.val().toLowerCase();

		if (!isNaN(temperature) && unit) {

			console.log('Temperature: ' + temperature + ' ' + unit);
			var unitToConvertFrom = checkedDisplayModeValue !== unit ? unit : '';
			temperature = this.convertTemperatureValue (temperature, unitToConvertFrom);
			
			$('#temp-value').text(temperature);
		}
	},
	updateTemperature : function (unit) {
		var currentTemp = $('#temp-value').text();
		unit = unit.toLowerCase();

		if (currentTemp) {
			this.handleTemperatureUpdate(currentTemp, unit);
		}
	},
	handleGearUpdate (value) {
		if (value) {
			$('#gear-position').text(value);
		}
	}
};