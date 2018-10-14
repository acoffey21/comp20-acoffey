	function init() {
		// south station
		var southstation = new google.maps.LatLng(42.352271, -71.05524200000001);

		// set up map
		var options = { 
			zoom : 13,
			center: southstation,
			mapTypeId: google.maps.mapTypeId.ROADMAP
		};

		// create map
        var map = new google.maps.Map(document.getElementById('map'), options);

        //create marker
        var marker = new google.maps.Marker({
        	position: landmark,
        	title: "South Station"
        	//add image
        	//add schedule info
        });
        marker.setMap(map);

        //global info window ***
        var infowindow = new google.maps.InfoWindow();

        // open info window on click
        google.maps.event.addListener(marker, 'click', function () {
        	infowindow.setContent(marker.-----);
        	infowindow.open(map,marker);
        });
}