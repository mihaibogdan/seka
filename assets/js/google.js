var googleSearch = (function () {
	var gSearch = {};
	var cb, url;
	var config = {
		url: 'http://ajax.googleapis.com/ajax/services/search/',
		version: 'v=1.0',
		searchType: 'web'
	};

	var search = function(type, query, callback) {
		cb = callback;
		config.searchType = type;
		url = config.url + config.searchType + '?' + config.version + '&q=' + escape(query);
		Utils.jsonp(url, callback)
	};

	gSearch = {
		search: search
	};
	return gSearch;
}());