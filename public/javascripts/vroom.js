var $selectedDisplayMode;

function getDisplayMode () {
	return $('#display-mode').find('input[type="radio"]:checked');
}

function showDisplayMode () {
	var $checkedDisplayMode = getDisplayMode();

	if ($checkedDisplayMode.length > 0) {
		$('#mi-km').html($checkedDisplayMode.val());
	}
}

function convertSpeed(speed, from, to) {
	var speedNum = speed;
	var rangeValue = 215;

	if (from !== '') {
		rangeValue = to === 'kilometers' ? 75 : 195;
	}

	var isSpeedInRange = speed <= rangeValue;

	if (from === 'kilometers') { // to miles
		
		speedNum = speed * 0.621371192;

	} else if (from === 'miles') { // to kilometers

		speedNum = speed * 1.609344;

	}

	$('#numbers').html(Math.round(speedNum));
	speed = isSpeedInRange ? speedNum * 2 - 31 : 215;

	return speed;
}

function handleMileageRotation (value, unit) {
	value = value || 0;
	var speed = parseInt(value);
	var $checkedDisplayMode = getDisplayMode();
	var checkedDisplayModeValue = $checkedDisplayMode.val().toLowerCase();

	if (!isNaN(speed) && unit) {

		var unitToConvertFrom = checkedDisplayModeValue !== unit ? unit : '';
		speed = convertSpeed(speed, unitToConvertFrom, checkedDisplayModeValue);
		
		var needle = $("#needle");    
		TweenLite.to(needle, 2, {rotation:speed,  transformOrigin:"bottom right"});

	} else { 
   		$('#miles').val('');
   		$('#kilometers').val('');
   		$('#numbers').html('');	
   		$("#errmsg").html("Wrong parameters").show().fadeOut(1600);
   }
}

function updateMileageRotation (unit) {
	var currentSpeed = $('#numbers').text();
	unit = unit.toLowerCase();

	if (currentSpeed) {
		handleMileageRotation(currentSpeed, unit);
	}
}

function displayDate () {
	var currentDate = new Date();
	var minutes = currentDate.getMinutes();
	var minutesString = minutes.toString().length === 1 ? '0' + minutes : minutes;
	$('#time').text(currentDate.getHours() + ':' + minutesString);
}

// Calculator for converting Miles to Kilometers
$(document).ready(function() {
	$selectedDisplayMode = getDisplayMode();

	var needle = $("#needle");
	TweenLite.to(needle, 2, {rotation:-31,  transformOrigin:"bottom right"});

	var needleTachometer = $("#needle-tachometer");
	TweenLite.to(needleTachometer, 2, {rotation: -1,  transformOrigin:"bottom right"});

	// Initialize the clock
	displayDate();
	setInterval(function () {
		displayDate();
	}, 1000);

 	// select current content in input boxes on click
	$("input[type='text']").on("click", function () {
	   $(this).select();
	});

	//clear kilometers value when miles is selected
	$("#miles").focus(function(){
		$("#kilometers").val('');
	});

	//clear miles value when kilometers is selected
	$("#kilometers").focus(function(){
		$("#miles").val('');
	});

	/*
	*	Show and update display mode.
	*/
	showDisplayMode();

	$('input[name="display-mode-radio"]').on('click', function () {
		showDisplayMode();
		updateMileageRotation($selectedDisplayMode.val());

		$selectedDisplayMode = $(this);
	});

	/*
	*	Handle mileage rotation
	*/
	$('#miles, #kilometers').on('keyup', function () {
		var $this = $(this); 
		var inputUnit = $this.attr('name');
		var inputValue = $this.val();

		handleMileageRotation(inputValue, inputUnit);
	});
});