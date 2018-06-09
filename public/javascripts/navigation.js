var Navigation = {
	determineLatLong: function (location) {
		var latitude = location.coords.latitude;
		var longitude = location.coords.longitude;
		$('.location-sharing-blocked').addClass('hide');
		Navigation.drawMap(latitude, longitude);
	},
	drawMap: function (latitude, longitude) {
		var _self = this;
		var myOptions = {
			zoom: 15,
			mapTypeId: google.maps.MapTypeId['ROAD_MAP']
		};

		var myLatLng = {lat: latitude, lng: longitude};
		var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
		
		map.setCenter(new google.maps.LatLng(latitude, longitude));

		window.map = map;

		var currentPositionImageURL = $('#current-position-pin-image').val();

		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: 'Current position',
			icon: currentPositionImageURL
		});

		// set click event listener on the map
		google.maps.event.addListener(map, 'click', function(event) {
		    mapZoom = map.getZoom();
		});

		window.currentPosition = {};
		window.currentPosition = marker.position;
		window.centralMarker = marker;

		//directionsDisplay = new google.maps.DirectionsRenderer();
		//directionsDisplay.setMap(window.map);
		//directionsDisplay.setOptions({suppressMarkers: true});
		//window.directionsService = {};
		//window.directionsService = new google.maps.DirectionsService();
	},
	getUserGeoLocation: function () {
		var _self = this;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(_self.determineLatLong, function (error) {
				if (error.code === 1/*permission dennied*/) {
					$('.location-sharing-blocked').removeClass('hide');
				}
			});
		}
	},
	initializeNavigationEvents: function () {
		var _self = this;
		$(document).ready(function () {

			setTimeout(function () {
				$('#nav-loader').hide();
				_self.getUserGeoLocation();
			}, 2000);
			
		});
	},
	init: function () {
		this.initializeNavigationEvents();
	}
};