window.onload = function() {
	Main.init();
	if(window.location.hash)
		Main.completeSearch(window.location.hash.substr(1));
	
}

var Main = (function () {
	var main = {};
	var type;
	var resultsDiv = document.querySelector('.results');

	main.completeSearch = function (keyword) {
		var bigResult = document.querySelector('.big-result');
		var news = document.querySelector('.news');
		var image = document.querySelector('.image');
		var video = document.querySelector('.video');

		googleSearch.search('web', keyword, function(results) {
			bigResult.querySelector('.title').innerHTML = results.responseData.results[0].titleNoFormatting;
			bigResult.querySelector('.title').href = results.responseData.results[0].url;
			bigResult.querySelector('.text').innerHTML = results.responseData.results[0].content;
			document.querySelector('.results').style.display = "block";
		})
		document.getElementById('map').src = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyAUCCoyp1Af_oTqlIPlR394c1IxX2Da_LU&q=' + keyword;
		googleSearch.search('news', keyword, function(results) {
			var i;
			for(i=0; i< results.responseData.results.length; i++) {
				if(results.responseData.results[i].image)
					break;
			}
			news.querySelector('.news-title').innerHTML = results.responseData.results[i].titleNoFormatting;
			news.querySelector('.news-title').href = results.responseData.results[i].unescapedUrl;
			news.style.backgroundImage = 'url(' + results.responseData.results[i].image.url;
			document.querySelector('.results').style.display = "block";
		})

		facebookSearch.search('images', keyword, function(results) {
			image.querySelector('img').src = 'https://graph.facebook.com/' + results[0].id + '/picture'; 
			image.querySelector('a').href = 'https://graph.facebook.com/' + results[0].id + '/picture'; 
			facebookSearch.search('videos', keyword, function(results) {
				video.querySelector('iframe').src = 'https://www.facebook.com/video/embed?video_id=' + results[0].id;
				video.querySelector('a').href = 'https://www.facebook.com/video/embed?video_id=' + results[0].id;
				document.querySelector('.results').style.display = "block";
			})
		})

		
	}
	main.init = function(){
		var ttips = document.querySelectorAll('.tooltips img');
		document.querySelector('.search-icon').addEventListener('click', this.search);
		document.getElementById("search_keyword").addEventListener('keypress', prepareForSearch);
		for (var i=0; i<ttips.length; i++) {
			ttips[i].addEventListener('click', function(e){
				opened = document.querySelector('.open');
				
				if(this.parentNode.classList.contains('open'))
					this.parentNode.classList.remove('open');
				else
					this.parentNode.classList.add('open');
				if(opened != this && opened)
					opened.classList.remove('open');
			})
		}
	}

	var prepareForSearch = function(e) {
		if (e.keyCode == 13) {
	        main.search();
	    }
	}

	var tooltipClick = function(e){
		e.stopPropagation();
		e.preventDefault();
		e.target.parentNode.classList.remove('open');
		e.target.removeEventListener('click', tooltipClick);
	}

	main.search = function(){
		document.querySelector('.results').style.display = "block";
		if(document.querySelector('.tooltips.open'))
			document.querySelector('.tooltips.open').classList.remove('open');
		var ifGoogle = document.getElementById("google").checked;
		var ifFb = document.getElementById("facebook").checked;
		var ifDuck = document.getElementById("duckduckgo").checked;

		
		var keyword = document.getElementById("search_keyword").value;

		if(!document.querySelector('.category input:checked'))
		{
			this.completeSearch(keyword);
			return ;
		}
		type = document.querySelector('.category input:checked').value;

		if(keyword) {
			resultsDiv.innerHTML  = "";
			if(ifGoogle) {
				if(type == 'maps')
					resultsDiv.innerHTML += RenderingEngine.map(keyword);
				else
					googleSearch.search(type, keyword, renderGoogleResults);
			}
			if(ifFb)
				facebookSearch.search(type, keyword, renderFacebookResults);
			if(ifDuck)
				duckduckgoSearch.search(type, keyword, renderDuckDuckGoResults);
		}
	}

	var renderGoogleResults = function(results) {
		var resultsString = '';
		var imgUrl;
		if(results.responseData)
		for(i  in results.responseData.results) {
			switch (type) {
				case 'web':
					resultsString += RenderingEngine.web(results.responseData.results[i].titleNoFormatting, results.responseData.results[i].content, results.responseData.results[i].url);
					break;
				case 'news':
					if(results.responseData.results[i].image)
						imgUrl = results.responseData.results[i].image.url;
					else
						imgUrl = '';
					resultsString += RenderingEngine.news(results.responseData.results[i].titleNoFormatting, imgUrl, results.responseData.results[i].unescapedUrl);
					break;
				case 'map':

			}
			
		}
		resultsDiv.innerHTML += resultsString;
	}

	var renderDuckDuckGoResults = function(results) {
		var resultsString = '';
		for(i  in results.RelatedTopics) {
			switch (type) {
				case 'web':
					if(!results.RelatedTopics[i].Text)
						results.RelatedTopics[i] = results.RelatedTopics[i].Topics[0];
					resultsString += RenderingEngine.web(results.Heading, results.RelatedTopics[i].Text, results.RelatedTopics[i].FirstURL);
					break;
				case 'images':
				if(!results.RelatedTopics[i].Text)
						results.RelatedTopics[i] = results.RelatedTopics[i].Topics[0];
					resultsString += RenderingEngine.image(results.RelatedTopics[i].Icon.URL);
					break;
			}
		}
		resultsDiv.innerHTML += resultsString;
	}

	var renderFacebookResults = function(results) {
		var resultsString = '';
		for(i  in results) {
			if(i<10){
				switch (type) {
					case 'videos':
						resultsString += RenderingEngine.video('https://www.facebook.com/video/embed?video_id=' + results[i].id, 'https://www.facebook.com/video/embed?video_id=' + results[0].id);
						break;
					case 'images':
						resultsString += RenderingEngine.image('https://graph.facebook.com/' + results[i].id + '/picture');
						break;
				}
			}
			
		}
		resultsDiv.innerHTML += resultsString;
	}

	return main;
}());