function Search(selector) {
	this.selector = selector;
	this.data = [];
	this.initialize(selector);
	this.current = "";
}


Search.prototype = {
	initialize: function(selector) {
		var searchObj = this;
		$(selector).typeahead({
			source:function(query, process) {
				var allData = searchObj.data;
				var uniqueData = [];
				$.each(allData, function(i, el){
				    if($.inArray(el, uniqueData) === -1) uniqueData.push(el);
				});
				process(uniqueData);
			},
			updater:function(item) {
				searchObj.current = item;
				if(settings.get('navigate'))
					sMap.showCity(searchObj.getCity());
				sMap.populate();
				return item;
			}
		});
		$(selector).keyup(function(){
			if(!$(selector).val()) {
				searchObj.current = "";
				sMap.populate();
			}
		});
	},
	getValue: function(){
		return this.current;
	},
	getCity: function() {
		var currentArray = this.current.split(',');
		if(!currentArray[0]) 
			return "";
		if(currentArray[0])
			return currentArray[0];
	},
	getCountry: function() {
		var currentArray = this.current.split(',');
		if(!currentArray[0]) 
			return "";
		if(!currentArray[2]) {
			if(currentArray[1])
				if(currentArray[1].charAt(0) == " ")
					return currentArray[1].substr(1);
				else 
					return currentArray[1];
		}
		else {
			if(currentArray[3])
				currentArray[2] = currentArray[3];
			if(currentArray[2].charAt(0) == " ")
				return currentArray[2].substr(1);
			else {
				return currentArray[2];
			}
		}
	},
	clearButton: function(selector) {
		var searchObj = this;
		$(selector).click(function () {
			if($(searchObj.selector).val()) {
				$(searchObj.selector).val("");
				searchObj.current = "";
				sMap.populate();
			}
		});
	}
}
