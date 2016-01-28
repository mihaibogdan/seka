var duckduckgoSearch = (function () {
	var ddgSearch = {};
	var cb, url;
	var config = {
		url: 'https://api.duckduckgo.com?format=json&',
		searchType: 'web'
	};

	var search = function(type, query, callback) {
		cb = callback;
		config.searchType = type;
		url = config.url + 'ia=' + config.searchType + '&q=' + escape(query);
		Utils.jsonp(url, callback)
	};

	ddgSearch = {
		search: search
	};
	return ddgSearch;
}());