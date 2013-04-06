function Upcoming(selector, limit) {
	this.selector = selector;
	this.limit = limit;
	this.isUpcoming = false;
}

Upcoming.prototype = {
	populate: function() {
		var data = events.allEvents;
		var limitCounter = 0;
		for (var i=0; i < data.length; i++) {
			var myStartdate = new Date();
  			var currentEventDate = new Date(data[i].start_date);
  			//myStartdate.setDate(myStartdate.getDate() - 1);
			if(myStartdate>currentEventDate) {
				continue;
			}
			this.isUpcoming = true;
			limitCounter++;
			$(this.selector).append('<li id="'+i+'"><a href="#">'+data[i].start_date.substring(5, 10)+" "+data[i].city+'</a></li>');
			$("#"+i).click(this.upEventClick);
			if(limitCounter>=this.limit)
				return;
		}
		if(!this.isUpcoming) {
			$("#upcomingHead").html("No upcoming events");
		}
	},
	upEventClick: function() {
		var data = events.allEvents[this.id];
		var myLatlng = new google.maps.LatLng(data.location.lat,data.location.lng);
		var marker = new google.maps.Marker({
			    position: myLatlng,
			    title:data.city
		});
		marker.set("id", this.id);
		if(sMap.markers[this.id]) {
			marker = sMap.markers[this.id];
		} else {
			sMap.markers.push(marker);
			marker.setMap(sMap.map);
		}
		sMap.generateInfo(marker, data).open(sMap.map, marker);
	}
}