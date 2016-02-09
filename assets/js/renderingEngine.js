var RenderingEngine = (function () {
	var render = {};
	
	render.web = function(title, content, url, parent) {
		generateElement({
			'type': 'div',
			'attributes': {
				'class': 'left-result'
			},
			'content': generateElement({
				'type': 'div',
				'attributes': {
					'class': 'big-result'
				},
				'content': [
						generateElement({
							'type': 'a',
							'attributes': {
								'class': 'title',
								'target': '_blank', 
								'href': url
							},
							'content': title
						}),
						generateElement({
							'type': 'div',
							'attributes': {
								'class': 'clear'
							}
						}),
						generateElement({
							'type': 'span',
							'attributes': {
								'class': 'details'
							},
							'content': '2 hours ago - mobile friendly'
						}),
						generateElement({
							'type': 'p',
							'attributes': {
								'class': 'text'
							},
							'content': content
						}),
						generateElement({
							'type': 'a',
							'attributes': {
								'data-pocket-label': 'pocket',
								'data-pocket-count': 'none',
								'class': 'pocket-btn',
								'data-save-url': url,
								'data-lang': 'en'
							},
							'content': 'Pocket'
						})
					]
			})
		}, parent);
	}

	render.news = function(title, imageUrl, url, parent) {
		generateElement({
			'type': 'div',
			'attributes': {
				'class': 'small-result news',
				'style': 'background-image: url("' + imageUrl + '")'
			},
			'content': [
					generateElement({
						'type': 'div',
						'attributes': {
							'class': 'overlay'
						}
					}),
					generateElement({
						'type': 'a',
						'attributes': {
							'class': 'news-title',
							'target': '_blank', 
							'href': url
						},
						'content': title
					})
				]
		}, parent);
	}

	render.video = function(embed_html, url, parent) {
		generateElement({
			'type': 'div',
			'attributes': {
				'class': 'small-result smaller video'
			},
			'content': [
					generateElement({
						'type': 'iframe',
						'attributes': {
							'src': embed_html, 
							'width': '100%',
							'height': '100%',
							'frameborder': '0'
						}
					}),
					generateElement({
						'type': 'div',
						'attributes': {
							'class': 'overlay'
						}
					}),
					generateElement({
						'type': 'a',
						'attributes': {
							'target': '_blank', 
							'href': url
						},
						'content': generateElement({
							'type': 'img',
							'attributes': {
								'class': 'play-video', 
								'src': 'assets/images/play_icon.png'
							},
						})
					})
				]
		}, parent);
	}

	render.image = function(url, parent) {
		generateElement({
			'type': 'div',
			'attributes': {
				'class': 'small-result smaller image'
			},
			'content': 
					generateElement({
						'type': 'a',
						'attributes': {
							'target': '_blank', 
							'href': url
						},
						'content': generateElement({
							'type': 'img',
							'attributes': {
								'width': '100%', 
								'src': url
							},
						})
					})
		}, parent);
	}

	render.map = function(location, parent) {
		generateElement({
			'type': 'div',
			'attributes': {
				'class': 'map-result'
			},
			'content': 
					generateElement({
						'type': 'iframe',
						'attributes': {
							'id': 'map',
							'src': 'https://www.google.com/maps/embed/v1/search?key=AIzaSyAUCCoyp1Af_oTqlIPlR394c1IxX2Da_LU&q=' + location, 
							'width': '100%',
							'height': '100%',
							'frameborder': '0'
						}
					})
		}, parent);
	}

	return render;
}());