function OptView() {
	this.current = "";
	this.eventBinding();
	this.showMap();
}


OptView.prototype = {
	showMap: function() {
		// Show map
		if(settings.settingsUpdated) {
			location.reload();
		}
		$("#settingsLnk").removeClass("selected");
		$("#aboutLnk").removeClass("selected");
		$("#mapLnk").addClass("selected");
		
		$("#settings").hide();
		$("#about").hide();
		$("#map").show();
	},
	showSettings: function() {
		// Show Settings
		$("#mapLnk").removeClass("selected");
		$("#aboutLnk").removeClass("selected");
		$("#settingsLnk").addClass("selected");
		
		$("#map").hide();
		$("#about").hide();
		$("#settings").show();
		settings.updateSettings();
	},
	showAbout: function() {
		// Show About
		$("#mapLnk").removeClass("selected");
		$("#settingsLnk").removeClass("selected");
		$("#aboutLnk").addClass("selected");
		
		$("#map").hide();
		$("#settings").hide();
		$("#about").show();
	},
	eventBinding: function () {
		$("#mapLnk").click(this.showMap);
		$("#settingsLnk").click(this.showSettings);
		$("#aboutLnk").click(this.showAbout);
	}
}