var facebookSearch = (function () {
	var fbSearch = {};
	var fbResults = [];
	var cb, url, index=0, totalResults, fields, property;

	var config = {
		url: 'https://graph.facebook.com/search?access_token=229942714009817|45qonyQoFY0tYAbwJfTfGXmIhcE',
		access_token: '229942714009817|45qonyQoFY0tYAbwJfTfGXmIhcE'
	};

	var search = function(type, query, callback) {
		switch(type){
			case 'web':
				fields = 'about';
				property = 'about';
				break;
			case 'images':
				fields = 'photos';
				property = 'photos';
				break;
			case 'videos':
				fields = 'videos{embed_html,icon}';
				property = 'videos';
				break;
			default:
				break;
		}
		cb = callback;

		url = config.url + '&type=page' + '&q=' + escape(query);
		Utils.jsonp(url, getResults)
	};
	var getResults = function(results){
		index = 0;
		if(results.data.length)
			totalResults = results.data.length;
		fbResults = [];
		for(i in results.data){
			url = 'https://graph.facebook.com/' + results.data[i].id + '/?fields=' + fields + '&access_token=' + config.access_token; 
			Utils.jsonp(url, getResult);
		}
	}
	var getResult = function(result){
		index++;
		if(result[property] && property !== 'about')
			fbResults[fbResults.length] = result[property].data[0];
		else
			if(result[property] && property === 'about')
				fbResults[fbResults.length] = result;
		if(index == totalResults)
			cb(fbResults);
	}
	fbSearch = {
		search: search
	};
	return fbSearch;
}());