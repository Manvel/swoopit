function SMap() {
	this.markers = [];
	this.map = "";
	this.lastInfoWindow;
}

SMap.prototype = {
	initialize: function() {
		var mapOptions = {
	      center: new google.maps.LatLng(34.397, 20.644),
	      zoom: 2,
		  mapTypeControl: settings.get('type'),
		  streetViewControl: settings.get('street'),
  		  zoomControl: settings.get('zoom'),
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	},
	populate: function() {
		// clear all markers
		this.clearMarkers();
		//clear search array
		var searchCity = search.getCity();
		var searchCountry =  search.getCountry();
		var data = events.allEvents;
		var populateSearch = false;
		search.data = [];
		/*
		if(search.data.length < 1){
			populateSearch = true;
		}
		*/
		for (var i=0; i < data.length; i++) {
			/*
			if(populateSearch){
				//add item to search array
				var state = data[i].state?", "+data[i].state:"";
				search.data.push(data[i].city+state+", "+data[i].country);
			}
			*/
			//Compare start date
			if(startDate.getDate()) {
  				var myStartdate = new Date(startDate.getDate());
  				var currentEventDate = new Date(data[i].start_date);
  				if(myStartdate>currentEventDate) {
  					continue;
  				}
  			}
  			//compare end date
  			if(endDate.getDate()) {
  				var myEndDate = new Date(endDate.getDate());
  				var currentEventDate = new Date(data[i].start_date);
  				currentEventDate.setDate(currentEventDate.getDate() - 1);
  				if(myEndDate<currentEventDate) {
  					continue;
  				}
  			}
  			var changeMarker = false;
  			if(searchCity&&searchCountry) {
  				if(searchCity == data[i].city)
  					changeMarker = true;
  				if(searchCountry != data[i].country)
  					continue;
  			}
  			// check whether we are searching smth
  			var myLatlng = new google.maps.LatLng(data[i].location.lat,data[i].location.lng);
  			var marker = new google.maps.Marker({
			    position: myLatlng,
			    title:data[i].city
			});
			if(changeMarker)
				marker.setIcon("img/blue-dot.png");
				
			marker.set("id", i);
			this.markers.push(marker);
			this.generateInfo(marker, data[i]);
			marker.setMap(this.map);
			
			//add item to search array
			var state = data[i].state?", "+data[i].state:"";
			search.data.push(data[i].city+state+", "+data[i].country);
		};
		
		/*
		if(searchCity) {
			geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': searchCity}, function(results, status) {
				 if (status == google.maps.GeocoderStatus.OK) {
				 	sMap.map.setZoom(8);
				 	sMap.map.setCenter(results[0].geometry.location);
				 }
			});
		}
		*/
	},
	clearMarkers: function() {
		for (var i = 0; i < this.markers.length; i++ ) {
		    this.markers[i].setMap(null);
		}
		this.markers = [];
	},
	generateInfo: function(marker, currentData) {
		var thisObj = this;
		var contentString = "<span>place: "+currentData.city+"</span>";
		if(currentData.state)
			contentString += "<span>, "+currentData.state+"</span>";
		if(currentData.country)
			contentString += "<span>, "+currentData.country+"</span><br>";
		if(currentData.start_date)
			contentString += "<span>start_date: "+currentData.start_date.substring(0, 10)+"</span><br>";
		if(currentData.website)
			contentString += "<span>website: <a href='http://www."+currentData.website+"' target='_blank'>"+currentData.website+"</a></span><br>";
		if(currentData.twitter_hashtag)
			contentString += "<span>twitter_hashtag: <a href='http://twitter.com/home?status=%23"+currentData.twitter_hashtag.substring(1)+"%20was awesome!' target='_blank'>"+currentData.twitter_hashtag+"</a></span><br>";
		
		contentString += "<span>add to: <a href='http://www.google.com/calendar/event?action=TEMPLATE&text=Startup%20Weekend&dates="+currentData.start_date.substring(0, 10).replace(/-/g, '')+"/"+currentData.start_date.substring(0, 10).replace(/-/g, '')+"&details=Startup%20Weekend%20in%20"+currentData.city+"&location="+currentData.city+"&trp=false&sprop=&sprop=name:http%3A%2F%2F"+currentData.website+"' target='_blank'>calendar</a></span><br>";
		contentString += "<span>Search in: <a href='https://maps.google.com/maps?q="+currentData.location.lat+",+"+currentData.location.lng+"+(Startup+weekend)&iwloc=A&hl=en' target='_blank'>Google maps</a></span><br>";
		
		var infowindow = new google.maps.InfoWindow({
		    content: contentString
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			if(thisObj.lastInfoWindow) 
				thisObj.lastInfoWindow.close();
				
		  infowindow.open(this.map,marker);
		  thisObj.lastInfoWindow = infowindow;
		});
		return infowindow;
	},
	showCity: function(city) {
		geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': city}, function(results, status) {
			 if (status == google.maps.GeocoderStatus.OK) {
			 	sMap.map.setZoom(8);
			 	sMap.map.setCenter(results[0].geometry.location);
			 }
		});
	}
}
