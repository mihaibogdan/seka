var RenderingEngine = (function () {
	var render = {};
	
	render.web = function(title, content, url) {
		return '' +
			'<div class="left-result">' + 
	        	'<div class="big-result">' + 
	        		'<a class="title" target="_blank" href="' + url + '">' + title + '</a>' + 
	        		'<div class="clear"></div>' +
	                '<span class="details">2 hours ago - mobile friendly</span>' + 
	        		'<p class="text">' + content + '</p>' + 
	        	'</div>' + 
	        '</div>';
	}

	render.news = function(title, imageUrl, url) {
		return '' + 
			'<div class="small-result news" style="background-image:url(' + imageUrl + ')">' +
        		'<div class="overlay"></div>' +
        		'<a class="news-title" target="_blank" href="' + url + '">' + title + '</a>' +
        	'</div>';
	}

	render.video = function(embed_html, url) {
		return '' + 
			'<div class="small-result smaller video">' +
				'<iframe src="'+ embed_html + '" width="100%" height="100%" frameborder="0"></iframe>' +
        		'<div class="overlay"></div>' +
        		'<a href="' + url + '" target="_blank">' +
                    '<img src="assets/images/play_icon.png" class="play-video">' +
                '</a>' +
        	'</div>';
	}

	render.image = function(url) {
		return '' + 
			'<div class="small-result smaller image">' + 
                '<a href="' + url + '" target="_blank">' + 
                    '<img src="' + url + '" width="100%" height="100%">' + 
                '</a>' +    
            '</div>';
	}

	render.map = function(location) {
		return '<div class="map-result">' + 
			'<iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?key=AIzaSyAUCCoyp1Af_oTqlIPlR394c1IxX2Da_LU&q=' + location + '" id="map">' +
			'</iframe></div>'
	}

	return render;
}());