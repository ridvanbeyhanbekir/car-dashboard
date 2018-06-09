var Speedometer = {
	getDisplayMode : function () {
		return $('#display-mode').find('input[type="radio"]:checked');
	},
	showDisplayMode : function () {
		var $checkedDisplayMode = this.getDisplayMode();

		if ($checkedDisplayMode.length > 0) {
	  		$('#mi-km').html($checkedDisplayMode.val());
		}
	},
	handleMileageRotation : function (value, unit) {
		value = value || 0;
		var speed = parseInt(value);
		var $checkedDisplayMode = this.getDisplayMode();
		var checkedDisplayModeValue = $checkedDisplayMode.val().toLowerCase();

		if (!isNaN(speed) && speed > -1 && unit) {

			console.log('Speed: ' + speed + ' ' + unit);
			var unitToConvertFrom = checkedDisplayModeValue !== unit ? unit : '';
			speed = this.convertSpeed(speed, unitToConvertFrom);
			
			var needle = $("#needle");    
			TweenLite.to(needle, 2, {rotation:speed,  transformOrigin:"bottom right"});

		} else {
	   		$('#miles').val('');
	   		$('#kilometers').val('');
	   		$('#numbers').html('');
	   		$("#errmsg").html("Wrong parameters").show().fadeOut(1600);
	   }
	},
	updateMileageRotation : function (unit) {
		var currentSpeed = $('#numbers').text();
		unit = unit.toLowerCase();

		if (currentSpeed) {
			this.handleMileageRotation(currentSpeed, unit);
		}
	},
	convertSpeed : function (speed, from) {
		var speedNum = speed;
		var rangeValue = 209;

		var isSpeedInRange = speed <= rangeValue;

		if (from === 'kilometers') { // to miles
			
			speedNum = speed * 0.621371192;

		} else if (from === 'miles') { // to kilometers

			speedNum = speed * 1.609344;

		}

		$('#numbers').html(Math.round(speedNum));
		speed = speedNum * 2 - 31;
		speed = speed < rangeValue ? speed : rangeValue;

		return speed;
	}
};