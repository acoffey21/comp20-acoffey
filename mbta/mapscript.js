function init() {
	// south station
	var southstation = new google.maps.LatLng(42.352271, -71.05524200000001);
	var andrew = new google.maps.LatLng(42.330154, -71.057655);
	var portersq = new google.maps.LatLng(42.3884, -71.11914899999999);
	var harvardsq = new google.maps.LatLng(42.373362, -71.118956);
	var jfkumass = new google.maps.LatLng(42.320685, -71.052391);
	var savinhill = new google.maps.LatLng(42.31129, -71.053331);
	var parkst = new google.maps.LatLng(42.35639457, -71.0624242);
	var broadway = new google.maps.LatLng(42.342622, -71.056967);
	var northquincy = new google.maps.LatLng(42.275275, -71.029583);
	var shawmut = new google.maps.LatLng(42.29312583, -71.06573769000001);
	var davis = new google.maps.LatLng(42.39674, -71.121815);
	var alewife = new google.maps.LatLng(42.395428, -71.142483);
	var kendallmit = new google.maps.LatLng(42.36249079, -71.08617653);
	var charlesmgh = new google.maps.LatLng(42.361166, -71.070628);
	var downtownxing = new google.maps.LatLng(42.355518, -71.060225);
	var quincyctr = new google.maps.LatLng(42.251809, -71.005409);
	var quincyadams = new google.maps.LatLng(42.233391, -71.007153);
	var ashmont = new google.maps.LatLng(42.284652, -71.06448899999999);
	var wollaston = new google.maps.LatLng(42.2665139, -71.0203369);
	var fieldscnr = new google.maps.LatLng(42.300093, -71.061667);
	var cntrlsq = new google.maps.LatLng(42.365486, -71.103802);
	var braintree = new google.maps.LatLng(42.2078543, -71.0011385);


	// set up map
	var theOptions = { 
			zoom : 13,
			center: southstation,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

	// create map
	var map = new google.maps.Map(document.getElementById("map_outline"), theOptions);


	//create a list of locations
	var stations = [ 
			{"position": alewife,
	    		"title": "Alewife",
	    		"url": "place-alfcl"},
	    	{"position": davis,
	    		"title": "Davis",
	    		"url": "place-davis"},
	    	{"position": portersq,
	    		"title": "Porter Square",
	    		"url": "place-portr"},
	    	{"position": harvardsq,
	    		"title": "Harvard Square",
	    		"url": "place-harsq"},
	    	{"position": cntrlsq,
	    		"title": "Central Square",
	    		"url": "place-cntsq"},
	    	{"position": kendallmit,
	    		"title": "Kendall/MIT",
	    		"url": "place-knncl"},
	    	{"position": charlesmgh,
	    		"title": "Charles/MGH",
	    		"url": "place-chmnl"},
	    	{"position": parkst,
	    		"title": "Park Street",
	    		"url": "place-pktrm"},
	    	{"position": downtownxing,
	    		"title": "Downtown Crossing",
	    		"url": "place-dwnxg"},
			{"position": southstation,
	     		"title": "South Station",
	     		"url": "place-sstat"},
	     	{"position": broadway,
	    		"title": "Broadway",
	    		"url": "place-brdwy"},
	    	{"position": andrew,
	    		"title": "Andrew",
	    		"url": "place-andrw"},
	    	{"position": jfkumass,
	    		"title": "JFK/UMass",
	    		"url": "place-jfk"},
	    	{"position": northquincy,
	    		"title": "North Quincy",
	    		"url": "place-nqncy"},
	    	{"position": wollaston,
	    		"title": "Wollaston",
	    		"url": "place-wlsta"},
	    	{"position": quincyctr,
	    		"title": "Quincy Center",
	    		"url": "place-qnctr"},
	    	{"position": quincyadams,
	    		"title": "Quincy Adams",
	    		"url": "place-qamnl"},
	    	{"position": braintree,
	    		"title": "Braintree",
	    		"url": "place-brntn"},
	    	{"position": savinhill,
	    		"title": "Savin Hill",
	    		"url": "place-shmnl"},
	    	{"position": fieldscnr,
	    		"title": "Fields Corner",
	    		"url": "place-fldcr"},
	    	{"position": shawmut,
	    		"title": "Shawmut",
	    		"url": "place-smmnl"},
	    	{"position": ashmont,
	    		"title": "Ashmont",
	    		"url": "place-asmnl"}
	    ]

	//initialize lists and objects and info window
	data = {};
	position_array = [];
	title_array = [];
	returnArray = [];

	var infowindow = new google.maps.InfoWindow();

	//create markers for each stop
	for (var i = 0, length = stations.length; i < length; i++){
		/*position_array.push(stations[i].position);
		title_array.push(stations[i].title);

		data["position"] = position_array;
		data["title"] = title_array; */

		//customize icon
		var icon = "train_icon.png"

		//create marker
		var marker = new google.maps.Marker({ ///// marker is overwritting itself, so only thinks its ashmont
			position: stations[i].position,
			map: map,
			title: stations[i].title,
			id: stations[i].url,
			icon: icon
		    	})
		marker.setMap(map);
	//}
//get json data and parse and then add after event click
	google.maps.event.addListener(marker, 'click', function() {
		request = new XMLHttpRequest();
		request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id="+ this.id , true); 
		var copyOfMarker = this;
		request.onreadystatechange = function(){
			if (request.readyState == 4 && request.status == 200){
				var arrivalData = request.responseText;
				var arrival = JSON.parse(arrivalData);
				stopTimes = [];
				stopDir = [];
				for( var z = 0, length = arrival.data.length; z < length; z++){
					if (arrival.data[z].attributes.arrival_time == null) {
						stopTimes.push("error getting times")
					}
					else {
						string = arrival.data[z].attributes.arrival_time
						pulledTime = string.slice(11,18)
						stopTimes.push(pulledTime);
					}

					if (arrival.data[z].attributes.direction_id == 1){
						stopDir.push("Northbound to Alewife");
					}
					else if (arrival.data[z].attributes.direction_id == 0){
						stopDir.push("Southbound to Ashmont/Braintree");
					}
					else {
						stopDir.push("error getting direction");
					}
				}

				var window_content = "<h3> Arrival Schedule: </h3>"  + stopTimes + " <br> " + stopDir;
				infowindow.setContent("<h2>" + copyOfMarker.title + "</h2>" + window_content); 
				infowindow.open(map, copyOfMarker); 

			}
		}
		request.send();

		
	});
}

///////////////////////////////////////////////////////////////////////
//initialize branches of the line to be displayed
	
	trunkarray = []
	for (var l = 0, length = 13; l < length; l++){
		trunkarray.push(stations[l].position)
	}

	branch1 = []
	for (var w = 12, length = 18; w < length; w++){
		branch1.push(stations[w].position)
	}


	branch2 = [stations[12].position]
		for (var x = 18, length = 22; x < length; x++){
		branch2.push(stations[x].position)
	}

//draw lines between stops and branches
var trackPath = new google.maps.Polyline({
    	path: trunkarray,
    	geodesic: true,
   		strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 2
  	});

	trackPath.setMap(map);

var branch1Path = new google.maps.Polyline({
    	path: branch1,
    	geodesic: true,
   		strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 2
  	});

	branch1Path.setMap(map);

var branch2Path = new google.maps.Polyline({
    	path: branch2,
    	geodesic: true,
   		strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 2
  	});

	branch2Path.setMap(map);

///////////////////////////////////////////////////

	var myLat = 0;
	var myLng = 0;
	

	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {

			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			var me = new google.maps.LatLng(myLat, myLng);

			// Update map and go there...
			map.panTo(me);

			var latLngA = me;
			var distance = [];

			for (var k = 0, length = 22; k < length; k++){
				distance.push(google.maps.geometry.spherical.computeDistanceBetween(latLngA, stations[k].position))
			}

			var shortest = distance[0];
			var track = 0;

			for (var j = 0, length = distance.length; j < length; j++) {
				if (distance[j] < shortest){
					shortest = distance[j];
					track++;
				}
			}

			var distance_miles = shortest*0.000621371192;

			var shortestArray = [me, stations[track].position];

			var shortestPath = new google.maps.Polyline({
		    	path: shortestArray,
		    	geodesic: true,
		   		strokeColor: '#6495ED',
		    	strokeOpacity: 1.0,
		    	strokeWeight: 2
		  	});
	
			shortestPath.setMap(map); 

			// Create a marker
			var me_marker = new google.maps.Marker({
				position: me,
				title: "Your closest stop is "+ stations[track].title + " which is " + distance_miles + " miles away!"
				});
			me_marker.setMap(map);
							
			var me_infowindow = new google.maps.InfoWindow();

			// Open info window on click of marker
			google.maps.event.addListener(me_marker, 'click', function() {
				me_infowindow.setContent(me_marker.title);
				me_infowindow.open(map, me_marker);
				});
		});
			
	}
	else {
		alert("Geolocation is not supported by your web browser :(");
	}

}
