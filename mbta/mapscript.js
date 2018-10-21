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

	//getMyLocation(map);


	//create a list of locations
	var stations = [ 
			{"position": alewife,
	    		"title": "Alewife"},
	    	{"position": davis,
	    		"title": "Davis"},
	    	{"position": portersq,
	    		"title": "Porter Square"},
	    	{"position": harvardsq,
	    		"title": "Harvard Square"},
	    	{"position": cntrlsq,
	    		"title": "Central Square"},
	    	{"position": kendallmit,
	    		"title": "Kendall/MIT"},
	    	{"position": charlesmgh,
	    		"title": "Charles/MGH"},
	    	{"position": parkst,
	    		"title": "Park Street"},
	    	{"position": downtownxing,
	    		"title": "Downtown Crossing"},
			{"position": southstation,
	     		"title": "South Station"},
	     	{"position": broadway,
	    		"title": "Broadway"},
	    	{"position": andrew,
	    		"title": "Andrew"},
	    	{"position": jfkumass,
	    		"title": "JFK/UMass"},
	    	{"position": northquincy,
	    		"title": "North Quincy"},
	    	{"position": wollaston,
	    		"title": "Wollaston"},
	    	{"position": quincyctr,
	    		"title": "Quincy Center"},
	    	{"position": quincyadams,
	    		"title": "Quincy Adams"},
	    	{"position": braintree,
	    		"title": "Braintree"},
	    	{"position": savinhill,
	    		"title": "Savin Hill"},
	    	{"position": fieldscnr,
	    		"title": "Fields Corner"},
	    	{"position": shawmut,
	    		"title": "Shawmut"},
	    	{"position": ashmont,
	    		"title": "Ashmont"}
	    ]
	/* var split1 = [
	 		{"position": jfkumass,
	    		"title": "JFK/UMass"},
	    	{"position": northquincy,
	    		"title": "North Quincy"},
	    	{"position": wollaston,
	    		"title": "Wollaston"},
	    	{"position": quincyctr,
	    		"title": "Quincy Center"},
	    	{"position": quincyadams,
	    		"title": "Quincy Adams"},
	    	{"position": braintree,
	    		"title": "Braintree"}
	    ]
	var split2 = [
			{"position": jfkumass,
	    		"title": "JFK/UMass"},
	    		{"position": savinhill,
	    		"title": "Savin Hill"},
	    	{"position": fieldscnr,
	    		"title": "Fields Corner"},
	    	{"position": shawmut,
	    		"title": "Shawmut"},
	    	{"position": ashmont,
	    		"title": "Ashmont"}
	]
	*/
	//initialize lists and objects
	data = {};
	position_array = [];
	title_array = [];

	for (var i = 0, length = stations.length; i < length; i++){
		position_array.push(stations[i].position);
		title_array.push(stations[i].title);

		data["position"] = position_array;
		data["title"] = title_array;

		//customize icon
		var icon = "train_icon.png"

		//create marker
		var marker = new google.maps.Marker({
			position: data.position[i],
			map: map,
			title: data.title[i],
			icon: icon
		    	});

		marker.setMap(map);
	}

//////////////////////////////////////////////////
	//create line connecting stations
	var trackPath = new google.maps.Polyline({
    	path: data.position,
    	geodesic: true,
   		strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 2
  	});

	trackPath.setMap(map);


////////////////////////////////////////////////////
//get json data and parse and then add after event click
	request = new XMLHttpRequest();
	console.log("check1");
	request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=place-davis", true);
	console.log("check2")
	request.onreadystatechange = function(){
		console.log("check3")
		if (request.readyState == 4 && request.status == 200){
			console.log("Got the data back!");
			var arrivalData = request.responseText;
			var arrivalTimes = JSON.parse(arrivalData);
			console.log(arrivalTimes.data);
			var returnHTML = "<ul>"
			for (m = 0, length = arrivalTimes.data.length; m < length; m++){
				returnHTML += "<li>" + arrivalTimes.data[m] + "<li>"
			}
			returnHTML += "</ul>"
		}

	}
	request.send();

///////////////////////////////////////////////////

	//global info window ***
	var infowindow = new google.maps.InfoWindow();

	// open info window on click
	google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(data.title); /////how to pull out correct station title???
	       	infowindow.open(map,marker);
	    });


////////////////////////////////////////////////

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
				distance.push(google.maps.geometry.spherical.computeDistanceBetween(latLngA, data.position[k]))
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
			console.log(distance_miles);

			var shortestArray = [me, data.position[track]];

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
				title: "Your closest stop is "+ data.title[track] + " which is " + distance_miles + " miles away!"
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
//////////////////////////////////////////////////


}
