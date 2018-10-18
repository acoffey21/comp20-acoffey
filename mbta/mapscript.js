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
	/*split1data = {};
	split2data = {}; */
	position_array = [];
	title_array = [];
	/*split1_array =[];
	split2_array = []; */

	for (var i = 0, length = stations.length; i < length; i++){
	position_array.push(stations[i].position);
	title_array.push(stations[i].title);
	/*split1_array.push(split1[i].position);
	split2_array.push(split2[i].position);

	split1data["position"] = split1_array;
	split2data["position"] = split2_array; */

	data["position"] = position_array;
	data["title"] = title_array;
	//customize icon
	var icon = "train_icon.png"



	//create marker
	//for (var j = 0, length = data.length; j < length; j++){
	var marker = new google.maps.Marker({
		position: data.position[i],
		map: map,
		title: data.title[i],
		icon: icon
	    	});

	marker.setMap(map);
}
	console.log(data.title)
	console.log(data.position)

	//create line connecting stations
	var trackPath = new google.maps.Polyline({
    	path: data.position,
    	geodesic: true,
   		strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 2
  });
	/*var trackSplit1 = new google.maps.Polyline({
    	path: split1,
    	geodesic: true,
   		strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 2
  }); */
	trackPath.setMap(map);

	//global info window ***
	var infowindow = new google.maps.InfoWindow();

	// open info window on click
	google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(data.title); /////how to pull out correct station title???
	       	infowindow.open(map,marker);
	    });
}