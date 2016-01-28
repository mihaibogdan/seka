window.onload = function() {
	Main.completeSearch(window.location.hash.substr(1));
}

var Main = (function () {
	var main = {};
	main.search = function(engine, searchType, keyword, callback) {
		switch (engine){
			case 'google':
				googleSearch(searchType, keyword, callback);
				break;
			case 'duckduckgo':
				duckduckgoSearch(searchType, keyword, callback);
				break;
			case 'facebook':
				facebookSearch(searchType, keyword, callback);
				break;
			default:

		}
	}

	main.completeSearch = function (keyword) {
		var bigResult = document.querySelector('.big-result');
		var news = document.querySelector('.news');
		var image = document.querySelector('.image');
		var video = document.querySelector('.video');

		googleSearch.search('web', keyword, function(results) {
			bigResult.querySelector('.title').innerHTML = results.responseData.results[0].titleNoFormatting;
			bigResult.querySelector('.title').href = results.responseData.results[0].url;
			bigResult.querySelector('.text').innerHTML = results.responseData.results[0].content;
		})
		document.getElementById('map').src = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyAUCCoyp1Af_oTqlIPlR394c1IxX2Da_LU&q=' + keyword;
		googleSearch.search('news', keyword, function(results) {
			console.log(results);
			news.querySelector('.news-title').innerHTML = results.responseData.results[0].titleNoFormatting;
			news.querySelector('.news-title').href = results.responseData.results[0].unescapedUrl;
			news.style.backgroundImage = 'url(' + results.responseData.results[0].image.url;
		})

		facebookSearch.search('images', keyword, function(results) {
			image.querySelector('img').src = 'https://graph.facebook.com/' + results[0].id + '/picture'; 
			image.querySelector('a').href = 'https://graph.facebook.com/' + results[0].id + '/picture'; 
			facebookSearch.search('videos', keyword, function(results) {
				video.querySelector('iframe').src = 'https://www.facebook.com/video/embed?video_id=' + results[0].id;
				video.querySelector('a').href = 'https://www.facebook.com/video/embed?video_id=' + results[0].id;
			})
		})

		
	}
	return main;
}());