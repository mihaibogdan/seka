var generateElement = function(props, parentNode) {
	var args = {
		type: props.type || null,
		attributes: props.attributes || {},
		events: props.events || {}
	};

	if (props.content) {
		if (Array.isArray(props.content)) {
			args.content = props.content;
		} else {
			args.content = [props.content];
		}
	} else {
		args.content = [];
	}

	var domElem = document.createElement(args.type);

	for(var i in args.attributes) {
		domElem.setAttribute(i, args.attributes[i]);
	}
	
	var container = document.createDocumentFragment();
	for (var i = 0, n = args.content.length; i < n; i += 1) {
		if (args.content[i]) {
			if (['string', 'number'].indexOf(typeof args.content[i]) > -1) {
				var child = document.createElement('span');
				child.innerHTML = args.content[i];
			} else {
				child = args.content[i];
			}
			container.appendChild(child);
		}
	}
	domElem.appendChild(container);

	if (parentNode) {
		parentNode.appendChild(domElem);
	}

	return domElem;
};

