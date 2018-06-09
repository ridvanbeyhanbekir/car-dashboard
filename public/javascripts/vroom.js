var $selectedDisplayMode;
var $selectedTemperatureUnit;

function displayDate () {
	var currentDate = new Date();
	var minutes = currentDate.getMinutes();
	var minutesString = minutes.toString().length === 1 ? '0' + minutes : minutes;
	$('#time').text(currentDate.getHours() + ':' + minutesString);
}

// Calculator for converting Miles to Kilometers
$(document).ready(function() {
	$selectedDisplayMode = Speedometer.getDisplayMode();
	$selectedTemperatureUnit = MiniDisplayManager.getSelectedTemperatureUnit();

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
	*	Show and update speedometer display mode.
	*/
	Speedometer.showDisplayMode();

	$('input[name="display-mode-radio"]').on('click', function () {
		Speedometer.showDisplayMode();
		Speedometer.updateMileageRotation($selectedDisplayMode.val());

		$selectedDisplayMode = $(this);
	});

	/*
	*	Show and update temperature display mode.
	*/
	MiniDisplayManager.updateTemperatureUnit();

	$('input[name="temp-unit-radio"]').on('click', function () {
		MiniDisplayManager.updateTemperatureUnit();
		MiniDisplayManager.updateTemperature($selectedTemperatureUnit.val());

		$selectedTemperatureUnit =  $(this);
	});

	/*
	*	Handle mileage rotation
	*/
	$('#miles, #kilometers').on('keyup', function () {
		var $this = $(this); 
		var inputUnit = $this.attr('name');
		var inputValue = $this.val();

		Speedometer.handleMileageRotation(inputValue, inputUnit);
	});

	/*
	*	Handle rpm rotation
	*/
	$('#rpm').on('keyup', function () {
		var $this = $(this); 
		var inputValue = $this.val();

		Tachometer.handleTachometerRotation(inputValue);
	});
});