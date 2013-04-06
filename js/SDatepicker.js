function SDatepicker(selector) {
	this.selector = selector;
	this.initialize();
}


SDatepicker.prototype = {
	initialize: function() {
		var dateObj = $(this.selector);
		dateObj.datepicker().on('changeDate', function(ev){
			sMap.populate();
			dateObj.datepicker('hide');
		});
		dateObj.datepicker('place');
	},
	getDate: function() {
		return $(this.selector).val();
	},
	clearButton: function(selector) {
		var dateObj = this;
		$(selector).click(function () {
			if($(dateObj.selector).val()) {
				$(dateObj.selector).val("");
				sMap.populate();
			}
		});
	},
	today: function() {
		var dateObj = $(this.selector);
		dateObj.datepicker('setValue', new Date());
	}
}
