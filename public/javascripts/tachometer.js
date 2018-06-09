var Tachometer = {
	handleTachometerRotation : function (value) {
		value = value || 0;
		var rpm = parseInt(value);

		if (!isNaN(rpm) && rpm > -1) {
			console.log('RPM: ' + rpm);
			rpm = this.convertRPM(rpm);
			var needleTachometer = $("#needle-tachometer");
			TweenLite.to(needleTachometer, 2, {rotation: rpm,  transformOrigin:"bottom right"});
		}
	},
	convertRPM : function (rpm) {
		var rpmNum = rpm / 100;
		var rangeValue = 209;

		rpm = rpmNum * 2.74 - 31;
		rpm = rpm < rangeValue ? rpm : rangeValue;

		return rpm;
	}
};