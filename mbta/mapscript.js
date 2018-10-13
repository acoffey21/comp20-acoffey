var map;
	function drawMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        	center: {lat: 42.39674, lng: -71.121815},
        	zoom: 8
        });
      }

src="https://maps.googleapis.com/maps/api/js?key=?------&callback=initMap" async defer>