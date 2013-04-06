function Settings() {
	this.navigate;
	this.today;
	this.type;
	this.street;
	this.zoom;
	this.initialize();
	this.bindEvents();
	this.settingsUpdated = false;
}

Settings.prototype = {
	initialize: function() {
		this.navigate = localStorage.getItem('navigate');
		this.today = localStorage.getItem('today');
		this.type = localStorage.getItem('type');
		this.street = localStorage.getItem('street');
		this.zoom = localStorage.getItem('zoom');
		if(this.navigate == null)
			localStorage.setItem('navigate', false);
		if(this.today == null)
			localStorage.setItem('today', false);
		if(this.type == null)
			localStorage.setItem('type', false);
		if(this.street == null)
			localStorage.setItem('street', false);
		if(this.zoom == null)
			localStorage.setItem('zoom', false);
	},
	get: function(name) {
		return localStorage.getItem(name)=="true";
	},
	set: function(name, value) {
		localStorage.setItem(name, value);
	},
	bindEvents: function() {
		$("#navigate").change(this.changeEvent);
		$("#today").change(this.changeEvent);
		$("#type").change(this.changeEvent);
		$("#street").change(this.changeEvent);
		$("#zoom").change(this.changeEvent);
	},
	changeEvent: function() {
		settings.settingsUpdated = true;
		settings.set(this.id, this.checked);
	},
	updateSettings: function() {
		$("#navigate").attr('checked', this.get('navigate'));
		$("#today").attr('checked', this.get('today'));
		$("#type").attr('checked', this.get('type'));
		$("#street").attr('checked', this.get('street'));
		$("#zoom").attr('checked', this.get('zoom'));
	}
}