/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/className.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/assets/js/className.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports["default"] = className;
var namespace = null;

function className(classes) {
	if (!namespace) {
		var site = document.getElementById('site');

		if (site && site.hasAttribute('data-namespace')) {
			namespace = site.getAttribute('data-namespace');
		} else {
			namespace = '';
		}
	}

	return classes.split(' ').map(function (cls) {
		return '' + namespace + cls;
	}).join(' ');
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/conditional.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/assets/js/conditional.js ***!
  \***********************************************************************************/
/***/ (() => {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var selectStore = {};

function effectChain(element, value) {
	var options = element.querySelectorAll('option[data-if-chain]');
	var oldValue = element.value;

	if (!(element.name in selectStore)) {
		// First time, cache options
		selectStore[element.name] = [];

		[].forEach.call(options, function (el) {
			selectStore[element.name].push(el.cloneNode(true));
		});
	}

	[].forEach.call(options, function (el) {
		if (element.value === el.value) {
			element.value = '';
		}

		element.removeChild(el);
	});

	if (!value) {
		return;
	}

	var cached = selectStore[element.name];

	if (!cached.length) {
		return;
	}

	var newOptions = cached.filter(function (el) {
		return el.getAttribute('data-if-chain') === value;
	});

	if (newOptions.length) {
		newOptions.forEach(function (el) {
			return element.appendChild(el.cloneNode(true));
		});
	}

	if (newOptions.length === 1) {
		element.value = newOptions[0].value;
	}

	if (oldValue !== element.value) {
		element.dispatchEvent(new Event('change', { bubbles: true }));
	}
}

function effectDisable(element, disable, value) {
	element.disabled = disable;

	if (!disable && element.tagName.toLowerCase() === 'select') {
		effectChain(element, value);
	}
}

function effectToggle(element, show) {
	element.style.display = show ? null : 'none';
}

function effectText(element, value) {
	if (!element.hasAttribute('data-if-default')) {
		element.setAttribute('data-if-default', element.innerText);
	}

	var values = element.getAttribute('data-if-values').split('|');
	var text = values.map(function (item) {
		return item.split(':');
	}).find(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 1),
		    m = _ref2[0];

		return m === value;
	});

	element.innerText = text ? text[1] : element.getAttribute('data-if-default');
}

function update(element, value) {
	var effect = element.getAttribute('data-if-effect') || 'toggle';
	var values = element.getAttribute('data-if').split('|').map(function (match) {
		return match.split(':')[1];
	}).filter(function (v) {
		return v;
	});
	var matches = values.some(function (match) {
		return match === value || match.indexOf('!') === 0 && match.substring(1) !== value;
	});
	var conditionMet = !values.length && !!value || matches;

	if (effect === 'disable') {
		effectDisable(element, !conditionMet, value);
	} else if (effect === 'toggle') {
		effectToggle(element, conditionMet);
	} else if (effect === 'text') {
		effectText(element, value);
	}
}

function init() {
	var elements = document.querySelectorAll('[data-if]');

	[].forEach.call(elements, function (element) {
		var _element$getAttribute = element.getAttribute('data-if').split(':'),
		    _element$getAttribute2 = _slicedToArray(_element$getAttribute, 1),
		    name = _element$getAttribute2[0];

		var form = element.closest('form');

		if (!form) {
			console.warn('Conditionals must be inside a form to avoid conflicts');
			return;
		}

		var related = form.querySelector('[name="' + name + '"]');

		if (related) {
			var value = related.value;


			if (['checkbox', 'radio'].includes(related.getAttribute('type'))) {
				value = related.checked ? related.value : null;
			}

			update(element, value);
		}
	});
}

function delegate(_ref3) {
	var target = _ref3.target;
	var name = target.name;


	if (!name) {
		return;
	}

	var elements = document.querySelectorAll('[data-if^="' + name + '"]');

	if (!elements.length) {
		return;
	}

	var value = target.value;


	if (['checkbox', 'radio'].includes(target.getAttribute('type'))) {
		value = target.checked ? target.value : null;
	}

	[].forEach.call(elements, function (element) {
		return update(element, value);
	});
}

init();
document.body.addEventListener('change', delegate);

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/debounce.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/assets/js/debounce.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
var debounce = function debounce(func) {
	var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var inDebounce = void 0;

	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		var context = undefined;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(function () {
			return func.apply(context, args);
		}, delay);
	};
};

exports["default"] = function (func, delay) {
	return debounce(func, delay);
};

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/nodeAdded.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/assets/js/nodeAdded.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports["default"] = nodeAdded;
var callbacks = {};

function dispatch(node, cbs) {
	cbs.forEach(function (cb) {
		return cb(node);
	});
}

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		mutation.addedNodes.forEach(function (node) {
			if (node.nodeType === Node.ELEMENT_NODE) {
				Object.entries(callbacks).forEach(function (_ref) {
					var _ref2 = _slicedToArray(_ref, 2),
					    selector = _ref2[0],
					    selectorCallbacks = _ref2[1];

					if (node.matches(selector)) {
						dispatch(node, selectorCallbacks);
					} else if (node.id === 'siteMain') {
						var child = node.querySelector(selector);

						if (child) {
							dispatch(child, selectorCallbacks);
						}
					}
				});
			}
		});
	});
});

observer.observe(document.body, {
	childList: true,
	subtree: true
});

function nodeAdded(selector, callback) {
	if (!(selector in callbacks)) {
		callbacks[selector] = [];
	}

	callbacks[selector].push(callback);

	return function unsubscribe() {
		var index = callbacks[selector].indexOf(callback);

		if (index > -1) {
			callbacks[selector].splice(index, 1);
		}
	};
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/offset.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/assets/js/offset.js ***!
  \******************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
	// Get top of element relative to window
	offsetTop: function offsetTop(el) {
		var rect = el.getBoundingClientRect();
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return rect.top + scrollTop;
	},


	// Get bottom of element relative to window
	offsetBottom: function offsetBottom(el) {
		var rect = el.getBoundingClientRect();
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return rect.bottom + scrollTop;
	},


	// Get left of element relative to window
	offsetLeft: function offsetLeft(el) {
		var rect = el.getBoundingClientRect();
		var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		return rect.left + scrollLeft;
	}
};

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/parallax.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/assets/js/parallax.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.cache = cache;
function isInView(el) {
	var box = el.getBoundingClientRect();
	return box.top < window.innerHeight && box.bottom >= 0;
}

var parallaxes = [];

// eslint-disable-next-line import/prefer-default-export
function cache() {
	parallaxes = document.querySelectorAll('.js-parallax');
}

cache();

window.addEventListener('scroll', function () {
	[].forEach.call(parallaxes, function (parallax) {
		if (parallax.classList.contains('animate')) {
			return;
		}

		var visible = isInView(parallax);
		if (visible) {
			parallax.classList.add('animate');
		}
	});
});

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/responsivePosition.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/assets/js/responsivePosition.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = __webpack_require__(/*! lodash.throttle */ "./node_modules/lodash.throttle/index.js");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var breakpoints = {
	xs: 0,
	smxs: 469,
	sm: 576,
	md: 769,
	lg: 961,
	xl: 1200,
	xxl: 1400
};

var matchedBreakpoints = [];

function repositionElement(element) {
	var positions = element.getAttribute('data-responsive').split(',');
	var position = null;

	positions.forEach(function (item) {
		var _item$split = item.split(':'),
		    _item$split2 = _slicedToArray(_item$split, 2),
		    bp = _item$split2[0],
		    id = _item$split2[1];

		if (matchedBreakpoints.includes(bp)) {
			position = id;
		}
	});

	if (position === null) {
		return;
	}

	var newParent = document.getElementById(position);

	if (!newParent || element.parentNode === newParent) {
		return;
	}

	newParent.appendChild(element);
}

function dispatch() {
	var elements = document.querySelectorAll('[data-responsive]');

	if (!elements.length) {
		return;
	}

	var width = window.innerWidth;

	matchedBreakpoints = Object.entries(breakpoints).filter(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    min = _ref2[1];

		return width >= min;
	}).map(function (_ref3) {
		var _ref4 = _slicedToArray(_ref3, 1),
		    bp = _ref4[0];

		return bp;
	});

	if (matchedBreakpoints.length) {
		[].forEach.call(elements, repositionElement);
	}
}

var onResize = (0, _lodash2.default)(dispatch, 100);

window.addEventListener('resize', onResize);
dispatch();

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/youtube.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/assets/js/youtube.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.destroyPlayer = destroyPlayer;
exports.setupPlayers = setupPlayers;
function loadYoutubeAPI() {
	var id = 'iisYoutubeAPI';

	if (document.getElementById(id)) {
		return;
	}

	var tag = document.createElement('script');
	var firstScript = document.getElementsByTagName('script')[0];

	tag.id = id;
	tag.src = 'https://www.youtube.com/iframe_api';

	firstScript.parentNode.insertBefore(tag, firstScript);
}

function onPlayerStateChange(el, e) {
	if (e.data === YT.PlayerState.PLAYING) {
		el.getElementsByTagName('img')[0].style.zIndex = '-1';
		el.getElementsByTagName('button')[0].style.display = 'none';
	} else if (e.data === YT.PlayerState.UNSTARTED) {
		el.getElementsByTagName('img')[0].style.zIndex = null;
		el.getElementsByTagName('button')[0].style.display = null;
	}
}

function createCover(el) {
	if (el.getElementsByTagName('img').length) {
		return;
	}

	var id = el.getAttribute('data-youtube');
	var url = 'https://i3.ytimg.com/vi/' + id + '/maxresdefault.jpg';
	var img = document.createElement('img');

	el.appendChild(img);

	img.loading = 'lazy';
	img.src = url;
}

function setupYoutubePlayer(el) {
	if (el.youtube) {
		return;
	}

	var id = el.getAttribute('data-youtube');
	var playerEl = document.createElement('div');

	playerEl.setAttribute('data-youtube-container', true);
	el.appendChild(playerEl);

	el.youtube = new YT.Player(playerEl, {
		height: '100%',
		width: '100%',
		videoId: id,
		playerVars: {
			// https://developers.google.com/youtube/player_parameters#Parameters
			playsinline: 1,
			autoplay: true,
			rel: 0
		},
		events: {
			onStateChange: function onStateChange(e) {
				return onPlayerStateChange(el, e);
			}
		}
	});

	el.getElementsByTagName('img')[0].style.zIndex = '-1';
	el.getElementsByTagName('button')[0].style.display = 'none';
}

function delegateClick(e) {
	var el = e.target.closest('[data-youtube]');

	if (!el) {
		return;
	}

	if (!el.youtube) {
		setupYoutubePlayer(el);

		return;
	}

	el.youtube.playVideo();
}

function destroyPlayer(el) {
	if (el.youtube) {
		var playerEl = el.querySelector('[data-youtube-container]');

		playerEl.parentNode.removeChild(playerEl);
		el.youtube.destroy();
		el.youtube = null;
	}

	el.getElementsByTagName('img')[0].style.zIndex = null;
	el.getElementsByTagName('button')[0].style.display = null;
}

function setupPlayers(container) {
	var players = container.querySelectorAll('[data-youtube]');

	if (!players.length) {
		return;
	}

	[].forEach.call(players, createCover);
}

window.onYouTubeIframeAPIReady = function () {
	setupPlayers(document);
	document.body.addEventListener('click', delegateClick);
};

loadYoutubeAPI();

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/file/file.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/atoms/file/file.js ***!
  \*****************************************************************************/
/***/ (() => {

"use strict";


var inputs = document.querySelectorAll('[type="file"]:not(.wpcf7-file)');

Array.prototype.forEach.call(inputs, function (input) {
	var label = input.nextElementSibling;
	var labelText = label.firstElementChild;
	var labelVal = labelText.innerHTML;
	var removebutton = label.nextElementSibling;

	function handleFileName(e) {
		var fileName = '';
		if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);else fileName = e.target.value.split('\\').pop();

		if (fileName) labelText.innerHTML = fileName;else labelText.innerHTML = labelVal;

		removebutton.classList.remove('is-hidden');
	}

	input.addEventListener('change', handleFileName);

	removebutton.addEventListener('click', function () {
		var fileName = '';
		if (fileName) labelText.innerHTML = fileName;else labelText.innerHTML = labelVal;
		removebutton.classList.add('is-hidden');
		input.value = '';
		input.focus();
	});
});

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/file/filePreview.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/atoms/file/filePreview.js ***!
  \************************************************************************************/
/***/ (() => {

"use strict";


var fileInputs = document.querySelectorAll('input[data-id=fileInput]');

Array.prototype.forEach.call(fileInputs, function (fileInput) {
	var filePreview = fileInput.previousElementSibling.firstElementChild;
	var label = fileInput.nextElementSibling;
	var removebutton = label.nextElementSibling;

	var validImgFormats = ['image/jpeg', 'image/png', 'image/gif'];

	function handleFileUpload(inputEvent) {
		var inputFile = inputEvent.target;
		var reader = new FileReader();

		if (validImgFormats.indexOf(inputFile.files[0].type) === -1) {
			console.warning('Välj en bildfil i något av följande filformat: .png, .jpg, and .gif.');
		}

		reader.readAsDataURL(inputFile.files[0]);
		reader.onload = function (readerEvent) {
			filePreview.src = readerEvent.target.result;
		};

		removebutton.addEventListener('click', function () {
			filePreview.src = '';
		});
	}

	fileInput.addEventListener('change', handleFileUpload, false);
});

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/height-limiter/height-limiter.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/atoms/height-limiter/height-limiter.js ***!
  \*************************************************************************************************/
/***/ (() => {

"use strict";


var elements = document.querySelectorAll('.js-height-limit');

function update(innerContainer, button, height) {
	if (button.classList.contains('is-clicked')) {
		return;
	}

	if (innerContainer.offsetHeight >= height) {
		innerContainer.setAttribute('style', 'max-height:' + height + 'px;');
		innerContainer.classList.add('is-limited');
		button.classList.remove('is-hidden');
	} else {
		innerContainer.removeAttribute('style');
		innerContainer.classList.remove('is-limited');
		button.classList.add('is-hidden');
	}
}

function setup(element) {
	var height = element.getAttribute('data-height');
	var innerContainer = element.querySelector('[class*="inner"]');
	var button = element.querySelector('.js-toggle-height');
	var buttonTextElement = button.querySelector('span');
	var buttonText = buttonTextElement.innerText;
	var toggleText = element.getAttribute('data-toggle-text');

	update(innerContainer, button, height);

	button.addEventListener('click', function () {
		innerContainer.classList.toggle('is-limited');
		innerContainer.setAttribute('style', innerContainer.style.maxHeight === height + 'px' ? 'max-height:none' : 'max-height:' + height + 'px');
		buttonTextElement.innerText = buttonTextElement.innerText === buttonText ? toggleText : buttonText;
		button.classList.toggle('is-clicked');

		setTimeout(function () {
			return update(innerContainer, button, height);
		}, 1);
	});

	window.addEventListener('resize', function () {
		return update(innerContainer, button, height);
	});
}

if (elements) {
	[].forEach.call(elements, setup);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/password-toggle/password-toggle.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/atoms/password-toggle/password-toggle.js ***!
  \***************************************************************************************************/
/***/ (() => {

"use strict";


var elements = document.querySelectorAll('.js-toggle-input-type');

if (elements) {
	[].forEach.call(elements, function (element) {
		element.addEventListener('click', function () {
			var input = element.previousElementSibling;
			input.type = input.type === 'password' ? 'text' : 'password';
		});
	});
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/toggle-high-contrast/toggle-high-contrast.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/atoms/toggle-high-contrast/toggle-high-contrast.js ***!
  \*************************************************************************************************************/
/***/ (() => {

"use strict";


var element = document.querySelector('.js-toggle-high-contrast');

function classToggle() {
	var body = document.querySelector('body');
	body.classList.toggle('high-contrast');
}

if (element) {
	element.addEventListener('click', classToggle);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/tooltip/tooltip.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/atoms/tooltip/tooltip.js ***!
  \***********************************************************************************/
/***/ (() => {

"use strict";


var toolTip = document.querySelector('[role="tooltip"]');
var toolTipText = document.querySelector('[data-tooltip]');

function isInViewport(elem) {
	var distance = elem.getBoundingClientRect();
	return distance.top >= 30 && distance.left >= 30 && distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) && distance.right <= (window.innerWidth || document.documentElement.clientWidth);
}

function positionToolTip() {
	if (isInViewport(toolTip)) {
		toolTipText.classList.remove('down');
	} else {
		toolTipText.classList.add('down');
	}
}

if (toolTip) {
	positionToolTip();
	window.addEventListener('scroll', positionToolTip);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/components.js":
/*!************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/components.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./atoms/password-toggle/password-toggle */ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/password-toggle/password-toggle.js");

__webpack_require__(/*! ./utilities/tab-highlighting/tab-highlighting */ "./node_modules/@internetstiftelsen/styleguide/dist/utilities/tab-highlighting/tab-highlighting.js");

__webpack_require__(/*! ./molecules/system-error/system-error */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/system-error/system-error.js");

__webpack_require__(/*! a11y-toggle */ "./node_modules/a11y-toggle/a11y-toggle.js");

__webpack_require__(/*! ./molecules/cookie-disclaimer/cookie-disclaimer */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/cookie-disclaimer/cookie-disclaimer.js");

__webpack_require__(/*! ./organisms/accordion/accordion */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/accordion/accordion.js");

__webpack_require__(/*! ./organisms/tabs/tabs */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/tabs/tabs.js");

__webpack_require__(/*! ./organisms/mailchimp/mailchimp */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/mailchimp/mailchimp.js");

__webpack_require__(/*! ./organisms/mega-menu/mega-menu */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/mega-menu/mega-menu.js");

__webpack_require__(/*! ./molecules/share/share */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/share/share.js");

__webpack_require__(/*! ./molecules/natural-language-form/natural-language-form */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/natural-language-form/natural-language-form.js");

__webpack_require__(/*! ./atoms/tooltip/tooltip */ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/tooltip/tooltip.js");

__webpack_require__(/*! ./atoms/toggle-high-contrast/toggle-high-contrast */ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/toggle-high-contrast/toggle-high-contrast.js");

__webpack_require__(/*! ./focusTrap */ "./node_modules/@internetstiftelsen/styleguide/dist/focusTrap.js");

__webpack_require__(/*! ./atoms/height-limiter/height-limiter */ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/height-limiter/height-limiter.js");

__webpack_require__(/*! ./assets/js/conditional */ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/conditional.js");

__webpack_require__(/*! ./atoms/file/file */ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/file/file.js");

__webpack_require__(/*! ./atoms/file/filePreview */ "./node_modules/@internetstiftelsen/styleguide/dist/atoms/file/filePreview.js");

__webpack_require__(/*! ./organisms/podcast/podcast */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/podcast/podcast.js");

__webpack_require__(/*! ./assets/js/responsivePosition */ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/responsivePosition.js");

__webpack_require__(/*! ./assets/js/youtube */ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/youtube.js");

__webpack_require__(/*! ./molecules/glider/glider */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/glider/glider.js");

__webpack_require__(/*! ./molecules/glider/glider-course */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/glider/glider-course.js");

__webpack_require__(/*! ./molecules/glider/glider-hero */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/glider/glider-hero.js");

__webpack_require__(/*! ./molecules/context-menu/context-menu */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/context-menu/context-menu.js");

__webpack_require__(/*! ./molecules/alert/alert */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/alert/alert.js");

__webpack_require__(/*! ./molecules/continue-video-guide/continue-video-guide */ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/continue-video-guide/continue-video-guide.js");

__webpack_require__(/*! ./organisms/video-guide/video-guide */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/video-guide.js");

__webpack_require__(/*! ./organisms/timeline/timeline */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/timeline/timeline.js");

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/focusTrap.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/focusTrap.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports["default"] = focusTrap;

var _focusTrap = __webpack_require__(/*! focus-trap */ "./node_modules/focus-trap/dist/focus-trap.esm.js");

function getContainer(element) {
	return document.getElementById(element.getAttribute('data-a11y-toggle'));
}

function focusTrap(container) {
	if (container && container.getAttribute('data-focus-trap') !== 'false' && !container.focusTrap) {
		container.focusTrap = (0, _focusTrap.createFocusTrap)('#' + container.id, { clickOutsideDeactivates: true });
		container.setAttribute('data-focus-trap', 'true');
	}
}

var buttons = document.querySelectorAll('[data-a11y-toggle]');

[].forEach.call(buttons, function (button) {
	var container = getContainer(button);

	if (!container) {
		return;
	}

	container.setAttribute('data-container', 'true');

	if (!container.focusTrap) {
		focusTrap(container);
	}
});

function delegate(handler, e) {
	var target = e.target.closest('[data-a11y-toggle]');

	if (!target) {
		return;
	}

	handler(e, target);
}

function handleKeyDown(e, element) {
	if (element.getAttribute('aria-expanded') === 'true') {
		return;
	}

	if (e.keyCode === 9) {
		var container = getContainer(element);

		if (container) {
			container.tabIndex = -1;
		}
	}
}

function handleFocusTrap(e, element) {
	var container = getContainer(element);

	if (!container) {
		return;
	}

	focusTrap(container);

	// Run on next tick
	setTimeout(function () {
		if (container.getAttribute('aria-hidden') === 'false') {
			container.tabIndex = 0;

			if (container.focusTrap) {
				container.focusTrap.activate();
			}
		} else {
			if (container.focusTrap) {
				container.focusTrap.deactivate();
			}

			container.addEventListener('transitionend', function () {
				container.tabIndex = -1;
			}, { once: true });
		}
	}, 0);
}

document.addEventListener('click', delegate.bind(null, handleFocusTrap));
document.addEventListener('keydown', delegate.bind(null, handleKeyDown), { once: true });

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/alert/alert.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/alert/alert.js ***!
  \***********************************************************************************/
/***/ (() => {

"use strict";


var alerts = document.querySelectorAll('.js-dismiss-alert');

function dismiss(alert) {
	var target = alert.querySelector('[data-a11y-toggle]');
	var id = target.closest('[role]').getAttribute('id');
	var idElement = document.getElementById(id);

	if (sessionStorage.getItem(id) !== 'is-dismissed') {
		window.addEventListener('DOMContentLoaded', function () {
			idElement.setAttribute('aria-hidden', 'false');
		});

		target.addEventListener('click', function () {
			sessionStorage.setItem(id, 'is-dismissed');
		});
	}
}

if (alerts) {
	[].forEach.call(alerts, dismiss);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/context-menu/context-menu.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/context-menu/context-menu.js ***!
  \*************************************************************************************************/
/***/ (() => {

"use strict";


var elements = document.querySelectorAll('[data-close-on-outside-click]');

function closeElement(element) {
	document.addEventListener('mouseup', function (e) {
		var childElement = element.nextElementSibling;

		/* Close menu on all clicks except the trigger button,
   the menu and it's child elements and if the menu is actually open. */
		if (!element.contains(e.target) && !childElement.contains(e.target) && element.getAttribute('aria-expanded') === 'true') {
			element.click();
		}
	});
}

if (elements) {
	[].forEach.call(elements, closeElement);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/continue-video-guide/continue-video-guide.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/continue-video-guide/continue-video-guide.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _className = __webpack_require__(/*! ../../assets/js/className */ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/className.js");

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
	return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);

var ProgressRing = function (_CustomElement2) {
	_inherits(ProgressRing, _CustomElement2);

	function ProgressRing() {
		_classCallCheck(this, ProgressRing);

		var _this = _possibleConstructorReturn(this, (ProgressRing.__proto__ || Object.getPrototypeOf(ProgressRing)).call(this));

		var stroke = _this.getAttribute('stroke');
		var radius = _this.getAttribute('radius');
		var normalizedRadius = radius - stroke * 2;
		_this.circumference = normalizedRadius * 2 * Math.PI;

		_this.root = _this.attachShadow({ mode: 'open' });
		_this.root.innerHTML = '\n\t\t<svg\n\t\theight="' + radius * 2 + '"\n\t\twidth="' + radius * 2 + '"\n\t\t>\n\t\t<circle\n\t\tstroke="white"\n\t\tstroke-dasharray="' + _this.circumference + ' ' + _this.circumference + '"\n\t\tstyle="stroke-dashoffset:' + _this.circumference + '"\n\t\tstroke-width="' + stroke + '"\n\t\tfill="transparent"\n\t\tr="' + normalizedRadius + '"\n\t\tcx="' + radius + '"\n\t\tcy="' + radius + '"\n\t\t/>\n\t\t</svg>\n\n\t\t<style>\n\t\tcircle {\n\t\t\ttransition: stroke-dashoffset 0.35s;\n\t\t\ttransform: rotate(-90deg);\n\t\t\ttransform-origin: 50% 50%;\n\t\t}\n\t\t</style>\n\t\t';
		return _this;
	}

	_createClass(ProgressRing, [{
		key: 'setProgress',
		value: function setProgress(percent) {
			var offset = this.circumference - percent / 100 * this.circumference;
			var circle = this.root.querySelector('circle');
			circle.style.strokeDashoffset = offset;
		}
	}, {
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(name, oldValue, newValue) {
			if (name === 'progress') {
				this.setProgress(newValue);
			}
		}
	}], [{
		key: 'observedAttributes',
		get: function get() {
			return ['progress'];
		}
	}]);

	return ProgressRing;
}(_CustomElement);

window.customElements.define('progress-ring', ProgressRing);
var continueElement = document.querySelector('.js-guide-continue');

// Get value from sessionStorage if present
if (sessionStorage.getItem('InmsCurrentTime')) {
	var videoCurrentTime = sessionStorage.getItem('InmsCurrentTime');
	var videoDuration = sessionStorage.getItem('InmsDuration');
	var progressRing = document.querySelector('progress-ring');
	var continueLink = document.querySelector('.js-guide-continue-link');
	var guideURL = sessionStorage.getItem('InmsCurrentGuideURL');
	var guideImage = sessionStorage.getItem('InmsCurrentGuideImage');

	if (videoCurrentTime > 0 && progressRing && continueElement && guideImage && continueLink) {
		var alternativeText = continueLink.dataset.altText;
		var currentProgress = videoCurrentTime / videoDuration;
		var currentGuideImage = document.querySelector('.js-guide-continue-image');

		continueElement.classList.add((0, _className2.default)('m-continue-video-guide--has-progress'));
		continueLink.setAttribute('href', guideURL);
		currentGuideImage.src = guideImage;
		continueLink.querySelector('span').innerText = alternativeText;
		// Calculate percentage played
		progressRing.setAttribute('progress', Math.floor(currentProgress * 100));
	}
}

// Close Continue Component
var closeButton = document.querySelector('.js-guide-close');

if (closeButton) {
	closeButton.addEventListener('click', function () {
		sessionStorage.setItem('InmsGuideClosed', true);
		continueElement.classList.remove('is-visible');
	});

	if (!sessionStorage.getItem('InmsGuideClosed')) {
		continueElement.classList.add('is-visible');
	}

	if (document.querySelector('.js-video-guide')) {
		continueElement.classList.remove('is-visible');
	}
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/cookie-disclaimer/cookie-disclaimer.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/cookie-disclaimer/cookie-disclaimer.js ***!
  \***********************************************************************************************************/
/***/ (() => {

"use strict";


var cookieBar = document.querySelector('.js-cookie-disclaimer');
var visibleClass = 'is-visible';
var cookieName = 'internetstiftelsen-cookie-consent';
// const testCookieSupport = 'Cookies are enabled';
var acceptButton = document.getElementById('js-accept-cookies');
var currentProtocol = document.location.protocol;
// const { cookieEnabled } = navigator.cookieEnabled;

// Cookies are disabled
// function showCookieFail() {
// 	console.warn('Cookies are disabled.');
// }

// Check for cookie support
// (function checkCookieSupport() {
// 	if (!cookieEnabled) {
// 		if (currentProtocol === 'https:') {
// 			document.cookie = `${testCookieSupport}=Yes;path=/;SameSite=Strict;Secure;`;
// 		} else {
// 			document.cookie = `${testCookieSupport}=Yes;path=/;SameSite=Strict;`;
// 		}
//
// 		cookieEnabled = document.cookie.indexOf(testCookieSupport) !== -1;
// 	}
// 	return cookieEnabled || showCookieFail();
// }());

// Set cookie
function setCookie(name, value, days) {
	var d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

	if (currentProtocol === 'https:') {
		document.cookie = name + '=' + value + ';path=/;SameSite=Strict;Secure;expires=' + d.toGMTString();
	} else {
		document.cookie = name + '=' + value + ';path=/;SameSite=Strict;expires=' + d.toGMTString();
	}
}

// Get cookie
function getCookie(name) {
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

// No cookie set? Show cookie disclaimer bar
// if (!getCookie(cookieName) && cookieEnabled) {
if (!getCookie(cookieName)) {
	if (cookieBar) {
		cookieBar.classList.add(visibleClass);
	}
}

// Cookies accepted
function acceptCookies() {
	setCookie(cookieName, 'YES', 365);
	if (cookieBar) {
		cookieBar.classList.remove(visibleClass);
	}
}

// Button click
if (acceptButton) {
	acceptButton.addEventListener('click', acceptCookies);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/glider/glider-course.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/glider/glider-course.js ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _gliderJs = __webpack_require__(/*! glider-js */ "./node_modules/glider-js/glider.js");

var _gliderJs2 = _interopRequireDefault(_gliderJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gliderElementCourse = document.querySelector('.js-glider-course');

if (gliderElementCourse) {
	var GliderCourse = new _gliderJs2.default(gliderElementCourse, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	var nextBtns = document.querySelectorAll('.js-glider-next');
	var prevBtns = document.querySelectorAll('.js-glider-prev');
	var siteMain = document.querySelector('#siteMain');
	var zoomImages = document.querySelectorAll('.js-zoom.zoom');
	var slideIndex = GliderCourse.getCurrentSlide();
	var bounding = 0;

	var scrollTop = function scrollTop() {
		siteMain.scrollIntoView();
	};

	if (nextBtns) {
		[].forEach.call(nextBtns, function (nextBtn) {
			nextBtn.addEventListener('click', function () {
				GliderCourse.scrollItem(slideIndex += 1, true);

				if (siteMain) {
					bounding = siteMain.getBoundingClientRect();
					if (bounding.top < 0) {
						scrollTop();
					}
				}
			});
		});
	}

	if (prevBtns) {
		[].forEach.call(prevBtns, function (prevBtn) {
			prevBtn.addEventListener('click', function () {
				GliderCourse.scrollItem(slideIndex -= 1, true);

				if (siteMain) {
					bounding = siteMain.getBoundingClientRect();
					if (bounding.top < 0) {
						scrollTop();
					}
				}
			});
		});
	}

	if (zoomImages) {
		[].forEach.call(zoomImages, function (zoomImage) {
			zoomImage.addEventListener('click', function () {
				zoomImage.classList.toggle('is-zoomed');
			});
		});
	}

	module.exports = GliderCourse;
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/glider/glider-hero.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/glider/glider-hero.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.initHeroGlider = initHeroGlider;

var _gliderJs = __webpack_require__(/*! glider-js */ "./node_modules/glider-js/glider.js");

var _gliderJs2 = _interopRequireDefault(_gliderJs);

var _nodeAdded = __webpack_require__(/*! ../../assets/js/nodeAdded */ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/nodeAdded.js");

var _nodeAdded2 = _interopRequireDefault(_nodeAdded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/prefer-default-export
function initHeroGlider(node) {
	if (node.hasAttribute('data-glider-initialized')) {
		return;
	}

	var dataLayer = window.dataLayer || [];
	var gliderLinks = document.querySelectorAll('.glider-slide a');

	var GliderHero = new _gliderJs2.default(node, {
		scrollLock: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		rewind: true,
		arrows: {
			prev: '.js-glider-prev',
			next: '.js-glider-next'
		}
	});

	node.setAttribute('data-glider-initialized', 'true');

	var autoplayDelay = node.dataset.timeout;

	if (autoplayDelay) {
		var autoplay = setInterval(function () {
			GliderHero.scrollItem('next');
		}, parseInt(autoplayDelay, 10));

		node.addEventListener('mouseover', function () {
			if (autoplay !== null) {
				clearInterval(autoplay);
				autoplay = null;
			}
		}, 0);

		node.addEventListener('mouseout', function () {
			if (autoplay === null) {
				autoplay = setInterval(function () {
					GliderHero.scrollItem('next');
				}, parseInt(autoplayDelay, 10));
			}
		}, 0);
	}

	document.querySelector('.js-glider-prev').addEventListener('click', function () {
		dataLayer.push({
			event: 'carousel',
			eventInfo: {
				category: 'carousel',
				action: 'click',
				label: 'arrow_left'
			}
		});
	});

	document.querySelector('.js-glider-next').addEventListener('click', function () {
		dataLayer.push({
			event: 'carousel',
			eventInfo: {
				category: 'carousel',
				action: 'click',
				label: 'arrow_right'
			}
		});
	});

	[].forEach.call(gliderLinks, function (gliderLink) {
		gliderLink.addEventListener('click', function () {
			var linkTarget = gliderLink.href;
			console.log(linkTarget);
			dataLayer.push({
				event: 'carousel',
				eventInfo: {
					category: 'carousel',
					action: 'click',
					label: linkTarget
				}
			});
		});
	});
}

(0, _nodeAdded2.default)('.js-glider-hero', initHeroGlider);

var gliderElementHero = document.querySelector('.js-glider-hero');

if (gliderElementHero) {
	initHeroGlider(gliderElementHero);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/glider/glider.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/glider/glider.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _gliderJs = __webpack_require__(/*! glider-js */ "./node_modules/glider-js/glider.js");

var _gliderJs2 = _interopRequireDefault(_gliderJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gliderWrappers = document.querySelectorAll('.glider-contain');

if (gliderWrappers) {
	[].forEach.call(gliderWrappers, function (gliderWrapper) {
		var gliderElement = gliderWrapper.querySelector('.js-glider');
		var dots = gliderWrapper.classList.toString();
		var glider = new _gliderJs2.default(gliderElement, {
			scrollLock: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: '.' + dots + '+.glider-dots',
			arrows: {
				prev: gliderWrapper.querySelector('.js-glider-prev'),
				next: gliderWrapper.querySelector('.js-glider-next')
			},
			responsive: [{
				breakpoint: 961,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}, {
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 469,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
		module.exports = glider;
	});
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/natural-language-form/natural-language-form.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/natural-language-form/natural-language-form.js ***!
  \*******************************************************************************************************************/
/***/ (() => {

"use strict";


var selects = document.querySelectorAll('.js-natural-language-select');
var inputs = document.querySelectorAll('.js-natural-language-input');

function sync(el, option) {
	var color = option.dataset.color;


	el.dataset.color = color;
	el.innerText = option.innerText;
}

function setupSelect(select) {
	var parent = select.parentNode;
	var text = parent.querySelector('label');

	select.addEventListener('change', function () {
		sync(text, select.options[select.selectedIndex]);
	});

	// Next tick
	setTimeout(function () {
		sync(text, select.options[select.selectedIndex]);
	}, 0);
}

if (selects) {
	[].forEach.call(selects, setupSelect);
}

function syncInput(el, input, value) {
	el.innerText = value;

	setTimeout(function () {
		var selectWidth = el.getBoundingClientRect().width;
		input.style.width = selectWidth + 'px';
	}, 0);
}

if (inputs) {
	[].forEach.call(inputs, function (input) {
		var text = input.nextElementSibling;

		syncInput(text, input, input.value);

		input.addEventListener('input', function (e) {
			syncInput(text, input, e.target.value);
		});

		input.addEventListener('change', function (e) {
			syncInput(text, input, e.target.value);
		});
	});
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/share/share.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/share/share.js ***!
  \***********************************************************************************/
/***/ (() => {

"use strict";


function openPopup(e) {
	e.preventDefault();

	var width = 500;
	var height = 550;
	var left = window.innerWidth / 2 - width / 2;
	var top = window.innerHeight / 2 - height / 2;
	var url = this.href;
	var opts = '' + ('status=1' + ',width=') + width + ',height=' + height + ',top=' + top + ',left=' + left;
	window.open(url, 'socialMedia', opts);

	return false;
}

var popupButtons = Array.prototype.slice.call(document.querySelectorAll('.js-share-popup'));

if (popupButtons) {
	popupButtons.forEach(function (popup) {
		popup.addEventListener('click', openPopup);
	});
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/molecules/system-error/system-error.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/molecules/system-error/system-error.js ***!
  \*************************************************************************************************/
/***/ (() => {

"use strict";


var element = document.querySelector('.js-history');

function goBack(e) {
	e.preventDefault();
	window.history.go(-1);
}

if (element) {
	element.addEventListener('click', goBack);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/accordion/accordion.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/accordion/accordion.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _debounce = __webpack_require__(/*! ../../assets/js/debounce */ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/debounce.js");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! van11y-accessible-accordion-aria */ "./node_modules/van11y-accessible-accordion-aria/dist/van11y-accessible-accordion-aria.min.js");

var className = 'o-accordion';
var accordionElement = document.querySelector('.js-' + className);
var oAccordion = null;

function attachAccordion() {
	if (!oAccordion) {
		var namespace = getComputedStyle(accordionElement, ':before').content.replace(/["']/g, '');

		oAccordion = window.van11yAccessibleAccordionAria({
			ACCORDION_PREFIX_IDS: className,
			ACCORDION_JS: 'js-' + className,
			ACCORDION_STYLE: '' + namespace + className,
			ACCORDION_TITLE_STYLE: '' + namespace + className + '__title',
			ACCORDION_HEADER_STYLE: '' + namespace + className + '__header',
			ACCORDION_PANEL_STYLE: '' + namespace + className + '__panel'
		});
	}

	oAccordion.attach();
}

if (accordionElement) {
	attachAccordion();
}

var checkElements = (0, _debounce2.default)(function () {
	var accordionElementFresh = document.querySelector('.js-' + className);

	if (accordionElementFresh) {
		attachAccordion();
	}
}, 50);

var observeHandler = function observeHandler(mutationsList) {
	mutationsList.forEach(function (mutation) {
		if (mutation.type !== 'childList') {
			return;
		}

		checkElements();
	});
};

var observer = new MutationObserver(observeHandler);

observer.observe(document.body, { childList: true, subtree: true });

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/mailchimp/mailchimp.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/mailchimp/mailchimp.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _debounce = __webpack_require__(/*! ../../assets/js/debounce */ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/debounce.js");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slidingForm = document.querySelector('[class*="--sliding"]');
var staticForm = document.querySelector('[class*="--static"]');
var closeButton = document.querySelector('[class*="--sliding"] .js-close-mailchimp-popup');
var timeout = void 0;
var timer = void 0;
var throttle = 66; // Trigger event every 66ms
var visibleClass = 'is-visible';
var cookieName = 'internetstiftelsen-mailchimp-form-closed';
var currentProtocol = document.location.protocol;
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var noForm = urlParams.get('noForm');

// Set cookie
function setCookie(name, value, days) {
	var d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

	if (currentProtocol === 'https:') {
		document.cookie = name + '=' + value + ';path=/;SameSite=Strict;Secure;expires=' + d.toGMTString();
	} else {
		document.cookie = name + '=' + value + ';path=/;SameSite=Strict;expires=' + d.toGMTString();
	}
}

// Get cookie
function getCookie(name) {
	var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

// User is sent from email campaign with URL parameter ?noForm=true,
// set cookie and don't show slide-in form
if (noForm) {
	setCookie(cookieName, 'YES', 7);
}

if (slidingForm) {
	timeout = slidingForm.getAttribute('data-slider-delay');

	// Add hidden attribute on page load
	slidingForm.setAttribute('aria-hidden', 'true');
}

function isInViewport(element) {
	var top = element.offsetTop;
	var height = element.offsetHeight;

	while (element.offsetParent) {
		element = element.offsetParent; // eslint-disable-line
		top += element.offsetTop;
	}

	return top < window.pageYOffset + window.innerHeight && top + height > window.pageYOffset;
}

function slideForm() {
	if (!getCookie(cookieName)) {
		var inViewport = isInViewport(staticForm);
		clearTimeout(timer);

		if (!inViewport) {
			// The static form is not in the viewport, start timeout to show the sliding form
			timer = setTimeout(function () {
				slidingForm.classList.add(visibleClass);
				slidingForm.setAttribute('aria-hidden', 'false');
			}, timeout);
		} else {
			slidingForm.classList.remove(visibleClass);
			slidingForm.setAttribute('aria-hidden', 'true');
		}
	}
}

var elementIsInViewport = (0, _debounce2.default)(function () {
	if (slidingForm) {
		slideForm();
	}
}, throttle);

window.addEventListener('scroll', function () {
	elementIsInViewport();
});
function closeForm() {
	setCookie(cookieName, 'YES', 7);
	slidingForm.classList.remove(visibleClass);
	slidingForm.setAttribute('aria-hidden', 'true');
}

if (closeButton) {
	closeButton.addEventListener('click', function () {
		closeForm();
	});
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/mega-menu/mega-menu.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/mega-menu/mega-menu.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _focusTrap = __webpack_require__(/*! focus-trap */ "./node_modules/focus-trap/dist/focus-trap.esm.js");

/**
 * Collect the needed elements.
 */
var html = document.querySelector('html');
var megaMenuButton = document.querySelector('.js-toggle-mega-menu');
var megaMenu = document.getElementById('megaMenu');
var content = document.getElementById('siteMain');
var header = document.getElementById('siteHeader');
var footer = document.getElementById('siteFooter');
var alert = document.querySelector('.js-dismiss-alert');
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var focusTrap = null;

if (megaMenu) {
	focusTrap = (0, _focusTrap.createFocusTrap)(megaMenu);
}

/**
 * Check if the element is in the viewport
 *
 * @param {Element} element
 * @returns {boolean}
 */
function isInViewport(element) {
	var rect = element.getBoundingClientRect();

	// Very simple since we only use it for the footer atm
	return rect.top <= window.innerHeight;
}

/**
 * Before the animations start we need to change how certain elements
 * are placed. The visual result should be exactly the same as before these changes.
 */
function prepareAnimation() {
	var scrollTop = window.scrollY || document.body.scrollTop;
	var contentRect = content.getBoundingClientRect();
	var inViewport = isInViewport(footer);

	header.style.flex = '1 0 auto';

	if (!isIE11) {
		var initialFooterTop = footer.getBoundingClientRect().top;
		megaMenu.style.cssText = 'display: block; flex: 1';

		content.style.cssText = '\n\t        position: absolute;\n\t        top: ' + (scrollTop + contentRect.top) + 'px;\n\t        left: 0;\n\t        right: 0;\n\t        bottom: 0;\n\t        overflow: hidden;\n\t    ';

		if (!inViewport) {
			footer.style.transform = 'translateY(100%)';
		} else {
			requestAnimationFrame(function () {
				var newFooterTop = footer.getBoundingClientRect().top;

				if (newFooterTop > initialFooterTop) {
					footer.style.transform = 'translateY(-' + (newFooterTop - initialFooterTop) + 'px)';
				}
			});
		}
	}
}

/**
 * Removes all changes to all elements that took part in the animations.
 */
function removeAnimationPreparations() {
	content.removeAttribute('style');
	footer.removeAttribute('style');
	header.removeAttribute('style');
	megaMenu.removeAttribute('style');
}

/**
 * Animate the mega menu and footer into the view
 */
function animateIn() {
	megaMenuButton.setAttribute('aria-expanded', 'true');
	megaMenu.setAttribute('aria-hidden', 'false');
	if (!isIE11) {
		footer.style.cssText = 'transform: translateY(0); transition: transform 0.25s ease-in-out;';
		footer.classList.add('is-animated');
	}
}

/**
 * Preparations before the hide animation starts.
 * The visual result should be exactly the same as before these changes.
 */
function prepareOutAnimation() {
	var headerRect = megaMenu.getBoundingClientRect();
	var initialFooterTop = footer.getBoundingClientRect().top;

	/* Take into account it the site has an alert message at the top */
	var alertHeight = void 0;

	if (alert) {
		alertHeight = alert.offsetHeight;
	} else {
		alertHeight = 0;
	}

	megaMenu.style.cssText = '\n        position: absolute;\n        top: ' + (headerRect.top - alertHeight) + 'px;\n        left: 0;\n        right: 0;\n        display: block;\n\t';

	content.removeAttribute('style');
	header.removeAttribute('style');

	if (!isIE11) {
		requestAnimationFrame(function () {
			var newFooterTop = footer.getBoundingClientRect().top;

			footer.style.transition = 'none';

			if (initialFooterTop > newFooterTop) {
				footer.style.transform = 'translateY(' + (initialFooterTop - newFooterTop) + 'px)';
			} else if (newFooterTop > initialFooterTop) {
				footer.style.transform = 'translateY(-' + (newFooterTop - initialFooterTop) + 'px)';
			}
		});
	}
}

/**
 * Start the animation that hides the mega menu and footer.
 */
function animateOut() {
	megaMenuButton.setAttribute('aria-expanded', 'false');
	megaMenu.setAttribute('aria-hidden', 'true');

	if (!isIE11) {
		footer.addEventListener('transitionend', removeAnimationPreparations, { once: true });
		footer.style.transition = '0.25s ease-in-out';
		footer.classList.remove('is-animated');

		setTimeout(function () {
			if (!isInViewport(footer)) {
				footer.style.transform = 'translateY(100%)';
			} else {
				footer.style.transform = 'translateY(0)';
			}
		}, 4);
	}
}

/**
 * Hide the mega menu (and footer)
 */
function hideMegaMenu() {
	if (megaMenu) {
		if (megaMenu.getAttribute('aria-hidden') === 'true') {
			return;
		}

		prepareOutAnimation();

		setTimeout(function () {
			requestAnimationFrame(animateOut);
			if (html.classList.contains('tab-highlight')) {
				focusTrap.deactivate();
			}
		}, 50);
	}
}

/**
 * Show the mega menu (and footer)
 */
function showMegaMenu() {
	if (megaMenu.getAttribute('aria-hidden') === 'false') {
		return;
	}

	prepareAnimation();

	setTimeout(function () {
		requestAnimationFrame(animateIn);
		if (html.classList.contains('tab-highlight')) {
			focusTrap.activate();
		}
	}, 50);
}

/**
 * Toggle the mega menu
 * @param {MouseEvent} e
 */
function toggleMegaMenu(e) {
	e.preventDefault();

	if (megaMenu.getAttribute('aria-hidden') === 'false') {
		hideMegaMenu();
	} else {
		showMegaMenu();
	}
}

function handleMouseUp(e) {
	var button = e.target.closest('.js-toggle-domain-search');

	if (button && megaMenu.getAttribute('aria-hidden') === 'false') {
		hideMegaMenu();
	}
}

if (megaMenuButton && megaMenu) {
	megaMenuButton.addEventListener('click', toggleMegaMenu);
	document.addEventListener('mouseup', handleMouseUp);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/podcast/podcast.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/podcast/podcast.js ***!
  \***************************************************************************************/
/***/ (() => {

"use strict";


var namespace = void 0;
var namespaceElement = document.querySelector('#site');
var podCast = document.querySelector('.js-podcast');
var audio = document.getElementById('podcastPlayer');
var jsTrackList = document.querySelector('.js-track-list');
var title = document.querySelector('.js-title');
var description = document.querySelector('.js-description');
var image = document.querySelector('.js-image');
var progress = document.querySelector('.js-progress');
var durationElement = document.querySelector('.js-duration');
var timeleftElement = document.querySelector('.js-timeleft');
var stepForward = document.querySelector('.js-step-forward');
var stepBackward = document.querySelector('.js-step-backward');
var playButton = document.querySelector('.js-play-button');
var playIcon = document.querySelector('.js-play-icon');
var pauseIcon = document.querySelector('.js-pause-icon');
var closeButton = document.querySelector('.js-close-player');
var rssURL = '';

if (podCast) {
	rssURL = podCast.dataset.rss;
}

if (!namespaceElement) {
	namespace = '';
} else {
	namespace = namespaceElement.dataset.namespace;
}

function timeupdate() {
	audio.addEventListener('timeupdate', function () {
		var duration = parseInt(audio.duration, 10);
		var currentTime = parseInt(audio.currentTime, 10);
		var timeLeft = duration - currentTime;
		var s = void 0;var m = void 0;

		s = timeLeft % 60;
		m = Math.floor(timeLeft / 60) % 60;

		s = s < 10 ? '0' + s : s;
		m = m < 10 ? '0' + m : m;

		if (timeLeft > 0) {
			timeleftElement.classList.remove('u-visibility-hidden');
			timeleftElement.innerHTML = m + ':' + s;
		}
	}, false);
}

var html = '';

function getItems(el) {
	html += '\n\t<li>\n\t\t<button\n\t\t\tclass="' + namespace + 'o-podcast-player__button display-flex js-play-episode"\n\t\t\tdata-src="' + el.querySelector('enclosure').getAttribute('url') + '"\n\t\t\tdata-title="' + el.querySelector('title').innerHTML + '"\n\t\t\tdata-description="' + el.querySelector('description').innerHTML.replace(/(<([^>]+)>)/gi, '').replace('<![CDATA[', '').replace(']]>', '') + '"\n\t\t\tdata-image="' + el.querySelector('image').getAttribute('href') + '"\n\t\t\tdata-duration="' + el.querySelector('duration').innerHTML + '"\n\t\t\ttype="button"><svg class="icon ' + namespace + 'o-podcast-player__play-icon u-m-r-2"><use xlink:href="#icon-play"></use></svg></div><div class="u-visuallyhidden">Spela avsnittet ' + el.querySelector('title').innerHTML + '</div></button>\n\t\t<div class="' + namespace + 'o-podcast-player__show-info">\n\t\t\t<div class="' + namespace + 'o-podcast-player__title">' + el.querySelector('title').innerHTML + '</div>\n\t\t\t<div class="' + namespace + 'o-podcast-player__description js-description">' + el.querySelector('description').innerHTML + '</div>\n\t\t</div>\n\t</li>\n';

	if (jsTrackList) {
		jsTrackList.innerHTML = html;
	}
}

if (rssURL) {
	fetch(rssURL).then(function (response) {
		return response.text();
	}).then(function (str) {
		return new window.DOMParser().parseFromString(str, 'text/xml');
	}).then(function (data) {
		var items = data.querySelectorAll('item');

		items.forEach(getItems);
	});
}

function playEpisode(playBtn) {
	audio.src = playBtn.dataset.src;
	durationElement.innerHTML = playBtn.dataset.duration;
	title.innerHTML = playBtn.dataset.title;
	description.innerHTML = playBtn.dataset.description;
	image.src = playBtn.dataset.image;
	podCast.classList.remove(namespace + 'o-podcast-player--hidden');
	timeleftElement.classList.add('u-visibility-hidden');

	if (audio.play) {
		audio.pause();
		pauseIcon.classList.remove('is-hidden');
		playIcon.classList.add('is-hidden');

		audio.currentTime = 0;
	}

	audio.play();
	timeupdate();

	setTimeout(function () {
		timeleftElement.classList.remove('u-visibility-hidden');
	}, 1000);
}

document.body.addEventListener('click', function (e) {
	var playBtn = e.target.closest('.js-play-episode');
	if (playBtn) {
		e.preventDefault();

		// Clear old episodedata
		audio.currentTime = 0;
		timeupdate();
		audio.pause();
		sessionStorage.removeItem('episodeData');

		// Play new episode
		playEpisode(playBtn);
	}
});

if (playButton) {
	playButton.addEventListener('click', function () {
		if (audio.paused) {
			audio.muted = false;
			audio.play();
			pauseIcon.classList.remove('is-hidden');
			playIcon.classList.add('is-hidden');
			timeleftElement.classList.add('u-visibility-hidden');
			timeupdate();
			timeleftElement.classList.remove('u-visibility-hidden');
		} else {
			audio.pause();
			pauseIcon.classList.add('is-hidden');
			playIcon.classList.remove('is-hidden');
		}
	});
}

if (audio) {
	audio.onended = function () {
		pauseIcon.classList.add('is-hidden');
		playIcon.classList.remove('is-hidden');
		timeleftElement.classList.add('u-visibility-hidden');
	};

	audio.ontimeupdate = function () {
		var timer = audio.currentTime / audio.duration * 100 + '%';
		progress.style.width = timer;
	};
}

if (stepForward) {
	stepForward.addEventListener('click', function () {
		audio.currentTime += 60;
		timeupdate();
	});
}

if (stepBackward) {
	stepBackward.addEventListener('click', function () {
		audio.currentTime -= 15;
		timeupdate();
	});
}

function saveState() {
	var podcastData = {
		podCastTitle: title.innerHTML,
		episodeDescription: description.innerHTML,
		episodeSrc: audio.src,
		episodeCurrentTime: audio.currentTime,
		episodeDuration: durationElement.innerHTML,
		episodeImage: image.src
	};

	sessionStorage.setItem('episodeData', JSON.stringify(podcastData));

	if (!audio.paused) {
		var existing = sessionStorage.getItem('episodeData');
		existing = existing ? JSON.parse(existing) : {};
		existing.podcastWasPlaying = true;
		sessionStorage.setItem('episodeData', JSON.stringify(existing));
	} else {
		var _existing = sessionStorage.getItem('episodeData');
		_existing = _existing ? JSON.parse(_existing) : {};
		_existing.podcastWasPlaying = false;
		sessionStorage.setItem('episodeData', JSON.stringify(_existing));
	}
}

// Handle continous play when user leaves the page
if (podCast) {
	window.addEventListener('visibilitychange', saveState);
	window.addEventListener('beforeunload', saveState);
}

if (sessionStorage.getItem('episodeData') && podCast) {
	var arr = JSON.parse(sessionStorage.getItem('episodeData'));

	if (arr.episodeCurrentTime) {
		podCast.classList.remove(namespace + 'o-podcast-player--hidden');
		audio.src = arr.episodeSrc;
		image.src = arr.episodeImage;
		title.innerHTML = arr.podCastTitle;
		description.innerHTML = arr.episodeDescription;
		durationElement.innerHTML = arr.episodeDuration;

		if (arr.podcastWasPlaying === true) {
			var playPromise = audio.play();

			if (playPromise !== undefined) {
				playPromise.then(function () {
					// Continue playing audio on reload
					audio.currentTime = arr.episodeCurrentTime;
					timeupdate();
					audio.play();
					pauseIcon.classList.remove('is-hidden');
					playIcon.classList.add('is-hidden');
				}).catch(function () {
					// User reloaded page manually. Cannot play audio
					audio.addEventListener('loadedmetadata', function () {
						audio.currentTime = arr.episodeCurrentTime;
						timeupdate();
					});

					pauseIcon.classList.add('is-hidden');
					playIcon.classList.remove('is-hidden');
					audio.pause();
				});
			}
		} else {
			audio.addEventListener('loadedmetadata', function () {
				audio.currentTime = arr.episodeCurrentTime;
				timeupdate();
			});
			pauseIcon.classList.add('is-hidden');
			playIcon.classList.remove('is-hidden');
			audio.pause();
		}
	}
}

if (closeButton) {
	closeButton.addEventListener('click', function () {
		audio.currentTime = 0;
		timeupdate();
		audio.pause();
		sessionStorage.removeItem('episodeData');
		podCast.classList.add(namespace + 'o-podcast-player--hidden');
	});
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/tabs/tabs.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/tabs/tabs.js ***!
  \*********************************************************************************/
/***/ (() => {

"use strict";


window.a11yTabs = function tabsComponentIIFE(global, document) {
	var tabInstances = new WeakMap();

	/**
 * Instantiates the component
 * @constructor
 * @param {DOM Node} element
 */
	var TabComponent = function TabComponent(element, options) {
		if (!element || !element.nodeType) {
			return;
		}

		var className = 'o-tab-list';
		var tablistElement = document.querySelector('.js-' + className);
		var namespace = getComputedStyle(tablistElement, ':before').content.replace(/["']/g, '');

		var defaults = {
			tabList: '.' + namespace + className,
			tabItem: '.' + namespace + className + '__item',
			tabLink: '.' + namespace + className + '__link',
			tabPanel: '.' + namespace + 'o-tab-panel'
		};

		this.options = Object.assign(defaults, options);

		this.element = element;
		this.tabList = element.querySelector(this.options.tabList);
		this.tabItems = [].slice.call(this.tabList.querySelectorAll(this.options.tabItem));
		this.tabLinks = [].slice.call(this.tabList.querySelectorAll(this.options.tabLink));
		this.tabPanels = [].slice.call(element.querySelectorAll(this.options.tabPanel));

		this.currentIndex = 0;

		this.tabList.setAttribute('role', 'tablist');

		this.tabItems.forEach(function (item, index) {
			item.setAttribute('role', 'presentation');

			if (index === 0) {
				item.setAttribute('data-tab-active', '');
			}
		});

		this.tabLinks.forEach(function (item, index) {
			item.setAttribute('role', 'tab');
			item.setAttribute('id', 'tab' + index);

			if (index > 0) {
				item.setAttribute('tabindex', '-1');
			} else {
				item.setAttribute('aria-selected', 'true');
			}
		});

		this.tabPanels.forEach(function (item, index) {
			item.setAttribute('role', 'tabpanel');
			item.setAttribute('aria-labelledby', 'tab' + index);
			item.setAttribute('tabindex', '-1');

			if (index > 0) {
				item.setAttribute('hidden', '');
			}
		});

		this.eventCallback = handleEvents.bind(this); // eslint-disable-line
		this.tabList.addEventListener('click', this.eventCallback, false);
		this.tabList.addEventListener('keydown', this.eventCallback, false);

		tabInstances.set(this.element, this);
	};

	TabComponent.prototype = {
		/**
  * Event handler for all tab interactions
  * @param {number} index - Index of the tab being activiated
  * @param {string} direction -
  */
		handleTabInteraction: function handleTabInteraction(index, direction) {
			var currentIndex = this.currentIndex;

			var newIndex = index;

			// The click event does not pass in a direction. This is for keyboard support
			if (direction) {
				if (direction === 37) {
					newIndex = index - 1;
				} else {
					newIndex = index + 1;
				}
			}

			// Supports continuous tabbing when reaching beginning or end of tab list
			if (newIndex < 0) {
				newIndex = this.tabLinks.length - 1;
			} else if (newIndex === this.tabLinks.length) {
				newIndex = 0;
			}

			// update tabs
			this.tabLinks[currentIndex].setAttribute('tabindex', '-1');
			this.tabLinks[currentIndex].removeAttribute('aria-selected');
			this.tabItems[currentIndex].removeAttribute('data-tab-active');

			this.tabLinks[newIndex].setAttribute('aria-selected', 'true');
			this.tabItems[newIndex].setAttribute('data-tab-active', '');
			this.tabLinks[newIndex].removeAttribute('tabindex');
			this.tabLinks[newIndex].focus();

			// update tab panels
			this.tabPanels[currentIndex].setAttribute('hidden', '');
			this.tabPanels[newIndex].removeAttribute('hidden');

			this.currentIndex = newIndex;

			return this;
		},

		/**
  * Set tab panel focus
  * @param {number} index - Tab panel index to receive focus
  */
		handleTabpanelFocus: function handleTabPanelFocus(index) {
			this.tabPanels[index].focus();

			return this;
		}
	};

	/**
 * Creates or returns existing component
 * @param {string} selector
 */
	function createTabComponent(selector, options) {
		var elements = document.querySelectorAll(selector);
		[].forEach.call(elements, function (element) {
			return tabInstances.get(element) || new TabComponent(element, options);
		});
	}

	/**
 * Destroys an existing component
 * @param {DOM Node} element
 */
	function destroyTabComponent(element) {
		if (!element || !element.nodeType) {
			return;
		}

		var component = tabInstances.get(element);
		component.tabList.removeAttribute('role', 'tablist');

		component.tabItems.forEach(function (item, index) {
			item.removeAttribute('role', 'presentation');

			if (index === 0) {
				item.removeAttribute('data-tab-active');
			}
		});

		component.tabLinks.forEach(function (item, index) {
			item.removeAttribute('role', 'tab');
			item.removeAttribute('id', 'tab' + index);

			if (index > 0) {
				item.removeAttribute('tabindex', '-1');
			} else {
				item.removeAttribute('aria-selected', 'true');
			}
		});

		component.tabPanels.forEach(function (item, index) {
			item.removeAttribute('role', 'tabpanel');
			item.removeAttribute('aria-labelledby', 'tab' + index);
			item.removeAttribute('tabindex', '-1');

			if (index > 0) {
				item.removeAttribute('hidden');
			}
		});

		component.tabList.removeEventListener('click', component.eventCallback);
		component.tabList.removeEventListener('keydown', component.eventCallback);
		tabInstances.delete(component.element);
	}

	/**
 * Handles all event listener callbacks
 * @param {event} event
 */
	function handleEvents(event) {
		if (event.type === 'click') {
			event.preventDefault();
			TabComponent.prototype.handleTabInteraction.call(this, this.tabLinks.indexOf(event.target));
		}

		if (event.type === 'keydown') {
			var index = this.tabLinks.indexOf(event.target);

			// Left and right arrows
			if (event.which === 37 || event.which === 39) {
				event.preventDefault();
				TabComponent.prototype.handleTabInteraction.call(this, index, event.which);
			}

			// Down arrow
			if (event.which === 40) {
				event.preventDefault();
				TabComponent.prototype.handleTabpanelFocus.call(this, index);
			}
		}
	}

	return {
		create: createTabComponent,
		destroy: destroyTabComponent
	};
}(window, document);

var tabComponent = a11yTabs.create('[data-tab-component]'); // eslint-disable-line

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/timeline/timeline.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/timeline/timeline.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ../../assets/js/parallax */ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/parallax.js");

var _require = __webpack_require__(/*! ../../assets/js/offset */ "./node_modules/@internetstiftelsen/styleguide/dist/assets/js/offset.js"),
    offsetTop = _require.offsetTop,
    offsetBottom = _require.offsetBottom,
    offsetLeft = _require.offsetLeft;

var dataLayer = window.dataLayer || [];
var progressBar = document.querySelector('.js-progress-bar');
var decadeContainer = document.querySelector('.js-decade-container');
var decadeSections = document.querySelectorAll('.js-timeline-decade');
var firstDecade = document.querySelector('h2.godzilla');
var decades = document.querySelectorAll('h2.godzilla');
var triggerPoint = 0;

// Create decade links in timeline
function buildTimelineNavigation() {
	[].forEach.call(decades, function (decade) {
		var decadeLink = document.createElement('a');
		var textContent = decade.textContent;

		decadeLink.setAttribute('href', '#' + textContent);
		decadeLink.innerText = textContent;
		decadeContainer.appendChild(decadeLink);
	});
}

/* Set trigger point (vertical position in viewport)
for when a new decade should start being "active" */
function setTriggerPoint() {
	triggerPoint = window.innerHeight * 0.5;
}

// Animate progress bar when user is scolling within the timeline
function animateProgressBar() {
	var currentSection = 0;
	var sectionIndex = 0;
	var currentPosition = document.documentElement.scrollTop + triggerPoint;
	var decadeLinks = document.querySelectorAll('.js-decade-container a');
	var progressBarWidth = 0;

	// Check if we are above the first section
	if (currentPosition < offsetTop(firstDecade)) {
		currentSection = 0;
		progressBarWidth = 0;
		progressBar.style.width = '0';

		[].forEach.call(decadeLinks, function (decadeLink) {
			decadeLink.classList.remove('is-reading');
		});
	} else {
		// Otherwise add 1 to sectionIndex while scrolling;
		[].forEach.call(decades, function (decade) {
			var sectionTop = offsetTop(decade);

			if (currentPosition >= sectionTop) {
				currentSection = sectionIndex;

				[].forEach.call(decadeLinks, function (decadeLink) {
					decadeLink.classList.remove('is-reading');
				});

				decadeLinks[sectionIndex].classList.add('is-reading');
			}

			sectionIndex += 1;
		});
	}

	// Calculate speed of the progressBar width while scrolling based on section height
	var startPoint = decadeLinks[currentSection];
	var startPointX = offsetLeft(startPoint);
	var startPointWidth = startPoint.offsetWidth;
	var startSection = decadeSections[currentSection];
	var startSectionY = offsetTop(startSection);
	var endSectionY = offsetBottom(startSection);
	var sectionLength = endSectionY - startSectionY;
	var scrollY = currentPosition - startSectionY;
	var sectionProgress = scrollY / sectionLength;
	progressBarWidth = startPointX + startPointWidth * sectionProgress;

	// Use result to animate progressbar
	progressBar.style.width = progressBarWidth + 'px';
}

function isInViewport(element) {
	var top = element.offsetTop;
	var height = element.offsetHeight;

	while (element.offsetParent) {
		element = element.offsetParent; // eslint-disable-line
		top += element.offsetTop;
	}

	return top < window.scrollY + window.innerHeight && top + height / 4 > window.scrollY;
}

function decadeIsVisible() {
	[].forEach.call(decadeSections, function (decadeSection) {
		// Don't trigger Decade Visible too fast to prevent dataLayer.push
		// to trigger while user is scrolled past a decade.
		var timeOut = 1000;
		var viewTimeout = setTimeout(function () {
			if (isInViewport(decadeSection) && !decadeSection.classList.contains('is-in-view')) {
				decadeSection.classList.add('is-in-view');
				var decadeId = decadeSection.id;

				dataLayer.push({
					event: 'timeline',
					eventInfo: {
						category: 'timeline',
						action: 'active_year',
						label: decadeId
					}
				});
			} else if (!isInViewport(decadeSection)) {
				decadeSection.classList.remove('is-in-view');
				clearTimeout(viewTimeout);
			}
		}, timeOut);
	});
}

// Run functions on page load
if (progressBar) {
	buildTimelineNavigation();
	setTriggerPoint();
	animateProgressBar();

	// Re-run functions on window events
	window.addEventListener('resize', function () {
		setTriggerPoint();
		animateProgressBar();
	});
	window.addEventListener('scroll', function () {
		animateProgressBar();
		decadeIsVisible();
	});
}

// DUMMY TIMELINE ITEM OPEN/CLOSE
// function wrap(el, wrapper) {
// 	el.parentNode.insertBefore(wrapper, el);
// 	wrapper.classList.add('wrapper');
// 	wrapper.appendChild(el);
// }
//
// const timeLineItems = document.querySelectorAll('.js-timeline-item');
// let timeLineItemScrollPosition = 0;
//
// [].forEach.call(timeLineItems, (timeLineItem) => {
// 	const timeLineItemLink = timeLineItem.querySelector('a');
// 	const timeLineItemClose = timeLineItem.querySelector('.js-timeline-item-close');
// 	const timeLineItemBottomClose = timeLineItem.querySelector('.js-timeline-item-bottom-close');
//
// 	timeLineItemLink.addEventListener('click', () => {
// 		timeLineItemScrollPosition = window.pageYOffset;
// 		sessionStorage.setItem('scroll-position', timeLineItemScrollPosition);
//
// 		if (!timeLineItem.classList.contains('is-open')) {
// 			timeLineItem.classList.add('is-open');
// 			timeLineItem.closest('.row').classList.add('row-has-open-child');
//
// 			// Wrap open timeline item
// 			wrap(timeLineItem.querySelector('.wp-block-iis-timeline-post'),
//			document.createElement('div'));
// 		}
// 	});
//
// 	timeLineItemClose.addEventListener('click', () => {
// 		timeLineItem.classList.remove('is-open');
// 		timeLineItem.closest('.row').classList.remove('row-has-open-child');
//
// 		// Destroy generated wrapper
// 		const wrapper = timeLineItemClose.nextElementSibling;
// 		wrapper.replaceWith(...wrapper.childNodes);
//
// 		const top = sessionStorage.getItem('scroll-position');
// 		if (top !== null) {
// 			window.scrollTo(0, parseInt(top, 10));
// 		}
// 		sessionStorage.removeItem('scroll-position');
//
// 		// Trigger scroll event to reveal timeline items not yet parallaxed into view
// 		window.dispatchEvent(new CustomEvent('scroll'));
// 	});
//
// 	timeLineItemBottomClose.addEventListener('click', () => {
// 		timeLineItemClose.click();
// 	});
// });

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/VideoGuidePlayback.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/VideoGuidePlayback.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getCurrentCueIndex = __webpack_require__(/*! ./getCurrentCueIndex */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/getCurrentCueIndex.js");

var _getCurrentCueIndex2 = _interopRequireDefault(_getCurrentCueIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoGuidePlayback = function () {
	function VideoGuidePlayback(element, video) {
		var _this = this;

		_classCallCheck(this, VideoGuidePlayback);

		this.saveState = function () {
			if (_this.video.currentTime > 0) {
				var _sessionKeys = _this.sessionKeys,
				    currentTime = _sessionKeys.currentTime,
				    duration = _sessionKeys.duration,
				    currentGuideURL = _sessionKeys.currentGuideURL,
				    currentGuideImage = _sessionKeys.currentGuideImage;

				var guideURL = window.location.href;
				var guideImage = _this.video.dataset.featuredImage;

				sessionStorage.setItem(currentTime, _this.video.currentTime);
				sessionStorage.setItem(duration, _this.video.duration);
				sessionStorage.setItem(currentGuideURL, guideURL);
				sessionStorage.setItem(currentGuideImage, guideImage);
			}
		};

		this.clearState = function () {
			Object.values(_this.sessionKeys).forEach(function (key) {
				sessionStorage.removeItem(key);
			});
		};

		this.onPlay = function () {
			_this.setPlayActive();
		};

		this.onPause = function () {
			_this.setPauseActive();
		};

		this.onEnded = function () {
			_this.setPlayActive();
			_this.clearState();
			_this.setBackwardState(false);
			_this.setForwardState(false);

			_this.video.currentTime = 0;

			_this.dataLayer.push({
				event: 'guided_tour',
				eventInfo: {
					category: 'guided_tour',
					action: 'guide_completed',
					label: window.location.href
				}
			});
		};

		this.onAbort = function () {
			_this.video.pause();
			_this.onEnded();
		};

		this.onTimeUpdate = function () {
			var timeLeft = Math.floor(_this.duration - _this.video.currentTime);

			// Time update fires every 250ms, so we only want to update the DOM when the time left changes
			if (timeLeft === _this.timeLeft) {
				return;
			}

			_this.timeLeft = timeLeft;

			var minutes = Math.floor(timeLeft / 60);
			var seconds = Math.floor(timeLeft % 60);
			var formattedTimeLeft = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

			_this.countDownElement.innerText = formattedTimeLeft;
		};

		this.onCueChange = function () {
			_this.updateChapterState();
		};

		this.togglePlay = function () {
			if (_this.video.paused) {
				_this.video.play();
			} else {
				_this.video.pause();
			}
		};

		this.nextChapter = function () {
			var cues = _this.chapters.cues;

			var activeCueIndex = (0, _getCurrentCueIndex2.default)(_this.chapters);

			if (activeCueIndex < cues.length - 1) {
				_this.video.currentTime = cues[activeCueIndex + 1].startTime + 0.01;
				_this.updateChapterState();

				_this.dataLayer.push({
					event: 'guided_tour',
					eventInfo: {
						category: 'guided_tour',
						action: 'player_click',
						label: 'Forward'
					}
				});
			}
		};

		this.previousChapter = function () {
			var cues = _this.chapters.cues;

			var activeCueIndex = (0, _getCurrentCueIndex2.default)(_this.chapters);

			if (activeCueIndex > 0) {
				_this.video.currentTime = Math.max(0, cues[activeCueIndex - 1].startTime + 0.01);
				_this.updateChapterState();

				_this.dataLayer.push({
					event: 'guided_tour',
					eventInfo: {
						category: 'guided_tour',
						action: 'player_click',
						label: 'Backward'
					}
				});
			}
		};

		this.dataLayer = window.dataLayer || [];
		this.video = video;
		this.playBtn = element.querySelector('.js-play-btn');
		this.playIcon = element.querySelector('.js-play-icon');
		this.pauseIcon = element.querySelector('.js-pause-icon');
		this.forwardsButton = element.querySelector('.js-next-chapter');
		this.backwardsButton = element.querySelector('.js-previous-chapter');
		this.totaltimeElement = element.querySelector('.js-totaltime');
		this.countDownElement = element.querySelector('.js-countdown');
		this.chapterElements = Array.from(element.querySelectorAll('.js-chapters li'));
		this.sessionKeys = {
			currentTime: 'InmsCurrentTime',
			duration: 'InmsDuration',
			currentGuideURL: 'InmsCurrentGuideURL',
			currentGuideImage: 'InmsCurrentGuideImage'
		};

		this.duration = null;
		this.timeLeft = null;

		this.init();
		this.attach();
	}

	_createClass(VideoGuidePlayback, [{
		key: 'init',
		value: function init() {
			var _this2 = this;

			this.duration = this.video.duration;
			this.chapters = this.video.textTracks.getTrackById('video-chapters');

			if (this.chapters) {
				this.chapters.addEventListener('cuechange', this.onCueChange);
				this.setForwardState(true);
			}

			// Run on next tick to ensure that the video has loaded and event listeners are attached
			setTimeout(function () {
				_this2.sync();
			}, 0);

			// Format duration to minutes and seconds
			var minutes = Math.floor(this.duration / 60);
			var seconds = Math.floor(this.duration % 60);
			var formattedDuration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

			this.totaltimeElement.innerText = formattedDuration;
		}
	}, {
		key: 'sync',
		value: function sync() {
			var key = this.sessionKeys.currentTime;
			var guideURL = window.location.href;

			// If the current guide URL is not the same as the one in session storage, do not sync
			if (sessionStorage.getItem(this.sessionKeys.currentGuideURL) !== guideURL) {
				return;
			}

			if (sessionStorage.getItem(key)) {
				var videoCurrentTime = sessionStorage.getItem(key);

				if (videoCurrentTime > 0) {
					this.video.currentTime = videoCurrentTime;
				}
			}
		}
	}, {
		key: 'attach',
		value: function attach() {
			this.playBtn.addEventListener('click', this.togglePlay);
			this.forwardsButton.addEventListener('click', this.nextChapter);
			this.backwardsButton.addEventListener('click', this.previousChapter);

			window.addEventListener('visibilitychange', this.saveState);
			window.addEventListener('beforeunload', this.saveState);
		}
	}, {
		key: 'setPlayActive',
		value: function setPlayActive() {
			this.pauseIcon.classList.remove('is-hidden');
			this.playIcon.classList.add('is-hidden');

			this.dataLayer.push({
				event: 'guided_tour',
				eventInfo: {
					category: 'guided_tour',
					action: 'player_click',
					label: 'Play'
				}
			});
		}
	}, {
		key: 'setPauseActive',
		value: function setPauseActive() {
			this.pauseIcon.classList.add('is-hidden');
			this.playIcon.classList.remove('is-hidden');

			this.dataLayer.push({
				event: 'guided_tour',
				eventInfo: {
					category: 'guided_tour',
					action: 'player_click',
					label: 'Pause'
				}
			});
		}
	}, {
		key: 'setForwardState',
		value: function setForwardState(active) {
			if (active) {
				this.forwardsButton.disabled = false;
			} else {
				this.forwardsButton.disabled = true;
			}
		}
	}, {
		key: 'setBackwardState',
		value: function setBackwardState(active) {
			if (active) {
				this.backwardsButton.disabled = false;
			} else {
				this.backwardsButton.disabled = true;
			}
		}
	}, {
		key: 'updateChapterState',
		value: function updateChapterState() {
			var cues = this.chapters.cues;

			var activeCueIndex = (0, _getCurrentCueIndex2.default)(this.chapters);

			this.setBackwardState(activeCueIndex > 0);
			this.setForwardState(activeCueIndex < cues.length - 1);

			this.chapterElements.forEach(function (chapter, i) {
				if (i === activeCueIndex) {
					chapter.classList.add('is-current-item');
				} else {
					chapter.classList.remove('is-current-item');
				}
			});
		}
	}]);

	return VideoGuidePlayback;
}();

exports["default"] = VideoGuidePlayback;

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/VideoGuideSubtitles.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/VideoGuideSubtitles.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoGuideSubtitles = function () {
	function VideoGuideSubtitles(element, video) {
		var _this = this;

		_classCallCheck(this, VideoGuideSubtitles);

		this.onEnded = function () {
			_this.clearSubtitles();
		};

		this.onCueChange = function () {
			var activeCues = _this.subtitles.activeCues;


			if (activeCues.length > 0) {
				_this.subtitlesContainer.innerHTML = '<span>' + activeCues[0].text + '</span>';
			} else {
				_this.clearSubtitles();
			}
		};

		this.toggleSubtitles = function () {
			_this.subtitlesBtn.classList.toggle('is-active');
			_this.subtitlesContainer.classList.toggle('is-visible');

			_this.dataLayer.push({
				event: 'guided_tour',
				eventInfo: {
					category: 'guided_tour',
					action: 'player_click',
					label: 'Subtitles'
				}
			});

			console.log(_this.dataLayer);
		};

		this.dataLayer = window.dataLayer || [];
		this.element = element;
		this.video = video;
		this.subtitlesBtn = element.querySelector('.js-subtitles-btn');
		this.subtitlesContainer = element.querySelector('.js-subtitles-container');

		this.init();
		this.attach();
	}

	_createClass(VideoGuideSubtitles, [{
		key: 'init',
		value: function init() {
			this.subtitles = this.video.textTracks.getTrackById('video-subtitles');
		}
	}, {
		key: 'attach',
		value: function attach() {
			this.subtitlesBtn.addEventListener('click', this.toggleSubtitles);
			this.subtitles.addEventListener('cuechange', this.onCueChange);
		}
	}, {
		key: 'clearSubtitles',
		value: function clearSubtitles() {
			this.subtitlesContainer.innerHTML = '';
		}
	}]);

	return VideoGuideSubtitles;
}();

exports["default"] = VideoGuideSubtitles;

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/VideoGuideTimeline.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/VideoGuideTimeline.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoGuideTimeline = function () {
	function VideoGuideTimeline(element, video) {
		var _this = this;

		_classCallCheck(this, VideoGuideTimeline);

		this.togglePosts = function () {
			_this.toggleBtn.classList.toggle('is-toggeled');
			_this.container.classList.toggle('is-visible');
		};

		this.onCueChange = function () {
			var activeCues = _this.meta.activeCues;


			if (activeCues.length > 0) {
				var activeCue = activeCues[0];
				var activePost = _this.posts.find(function (post) {
					return post.dataset.id === activeCue.text;
				});

				if (activePost) {
					_this.posts.forEach(function (post) {
						post.classList.remove('is-current');
					});

					activePost.classList.add('is-current');
				}

				_this.images.forEach(function (post) {
					if (post.dataset.id === activeCue.text) {
						post.classList.add('is-current');

						_this.createImageHeadline(activeCue, post);
					} else {
						post.classList.remove('is-current');
					}
				});
			}
		};

		this.element = element;
		this.video = video;
		this.container = element.querySelector('.js-timeline-posts');
		this.posts = Array.from(element.querySelectorAll('.js-timeline-post:not(.js-timeline-image)'));
		this.images = Array.from(element.querySelectorAll('.js-timeline-image'));
		this.toggleBtn = element.querySelector('.js-show-timelineposts');
		this.headlineTpl = element.querySelector('[data-video-headline-tpl]');
		this.headlineCache = {};

		this.init();
		this.attach();
	}

	_createClass(VideoGuideTimeline, [{
		key: 'init',
		value: function init() {
			this.meta = this.video.textTracks.getTrackById('video-metadata');
		}
	}, {
		key: 'attach',
		value: function attach() {
			this.meta.addEventListener('cuechange', this.onCueChange);

			if (this.toggleBtn) {
				this.toggleBtn.addEventListener('click', this.togglePosts);
			}
		}
	}, {
		key: 'createImageHeadline',
		value: function createImageHeadline(activeCue, post) {
			if (activeCue.text in this.headlineCache) {
				return;
			}

			var element = post.querySelector('[data-video-headline-tpl]');

			if (post.querySelector('[data-video-headline-tpl]')) {
				this.headlineCache[activeCue.text] = element;
				return;
			}

			element = this.headlineTpl.cloneNode(true);
			var prevHeadline = element.querySelector('h1');
			var headline = document.createElement('h2');

			headline.className = prevHeadline.className;
			headline.innerHTML = activeCue.id;

			prevHeadline.parentNode.replaceChild(headline, prevHeadline);
			post.appendChild(element);

			this.headlineCache[activeCue.text] = element;
		}
	}]);

	return VideoGuideTimeline;
}();

exports["default"] = VideoGuideTimeline;

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/getCurrentCueIndex.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/getCurrentCueIndex.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports["default"] = getCurrentCueIndex;
function getCurrentCueIndex(target) {
	var activeCue = target.activeCues[0];
	var cues = target.cues;


	return Math.max(Array.prototype.indexOf.call(cues, activeCue), 0);
}

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/video-guide.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/video-guide.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VideoGuideSubtitles = __webpack_require__(/*! ./VideoGuideSubtitles */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/VideoGuideSubtitles.js");

var _VideoGuideSubtitles2 = _interopRequireDefault(_VideoGuideSubtitles);

var _VideoGuideTimeline = __webpack_require__(/*! ./VideoGuideTimeline */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/VideoGuideTimeline.js");

var _VideoGuideTimeline2 = _interopRequireDefault(_VideoGuideTimeline);

var _VideoGuidePlayback = __webpack_require__(/*! ./VideoGuidePlayback */ "./node_modules/@internetstiftelsen/styleguide/dist/organisms/video-guide/VideoGuidePlayback.js");

var _VideoGuidePlayback2 = _interopRequireDefault(_VideoGuidePlayback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoGuide = function () {
	function VideoGuide(element) {
		var _this = this;

		_classCallCheck(this, VideoGuide);

		this.onLoadedMetadata = function () {
			_this.playback = new _VideoGuidePlayback2.default(_this.element, _this.video);
			_this.subtitles = new _VideoGuideSubtitles2.default(_this.element, _this.video);
			_this.timeline = new _VideoGuideTimeline2.default(_this.element, _this.video);

			_this.video.classList.remove('is-loading');
		};

		this.dispatchEvent = function (eventName) {
			[_this.playback, _this.subtitles, _this.timeline].forEach(function (instance) {
				if (instance && eventName in instance) {
					instance[eventName]();
				}
			});
		};

		this.onPlay = function () {
			return _this.dispatchEvent('onPlay');
		};

		this.onPause = function () {
			return _this.dispatchEvent('onPause');
		};

		this.onEnded = function () {
			return _this.dispatchEvent('onEnded');
		};

		this.onTimeUpdate = function () {
			return _this.dispatchEvent('onTimeUpdate');
		};

		this.onAbort = function () {
			_this.dispatchEvent('onAbort');
			window.location.href = _this.abortBtn.href;
		};

		this.element = element;
		this.video = element.querySelector('.js-video-guide');
		this.abortBtn = element.querySelector('.js-abort-guide');
		this.playback = null;
		this.subtitles = null;
		this.timeline = null;

		// Set all track elements to hidden mode to allow scripting
		[].forEach.call(this.video.textTracks, function (txtTrack) {
			txtTrack.mode = 'hidden';
		});

		this.attach();

		// loadedmetadata might not be fired if the video is already loaded
		if (this.video.readyState >= 1) {
			this.onLoadedMetadata();
		}
	}

	_createClass(VideoGuide, [{
		key: 'attach',
		value: function attach() {
			this.video.addEventListener('loadedmetadata', this.onLoadedMetadata);
			this.video.addEventListener('play', this.onPlay);
			this.video.addEventListener('pause', this.onPause);
			this.video.addEventListener('ended', this.onEnded);
			this.video.addEventListener('timeupdate', this.onTimeUpdate);
			this.abortBtn.addEventListener('click', this.onAbort);
		}
	}]);

	return VideoGuide;
}();

var elements = document.querySelectorAll('[data-video-guide]');

elements.forEach(function (element) {
	return new VideoGuide(element);
});

/***/ }),

/***/ "./node_modules/@internetstiftelsen/styleguide/dist/utilities/tab-highlighting/tab-highlighting.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@internetstiftelsen/styleguide/dist/utilities/tab-highlighting/tab-highlighting.js ***!
  \*********************************************************************************************************/
/***/ (() => {

"use strict";


// Add class to html-element on tab click

var element = document.getElementsByTagName('html')[0];
var highLightClass = 'tab-highlight';

function onKeyDown(e) {
	var event = e;
	if (!event) {
		window.event = event;
	}

	var keyCode = event.keyCode || event.which;
	var tabKey = 9;

	if (keyCode === tabKey) {
		this.classList.add(highLightClass);
	}
}

// Remove class on mouse click
function onMouseDown() {
	this.classList.remove(highLightClass);
}

// Run on events

element.addEventListener('keydown', onKeyDown);
element.addEventListener('mousedown', onMouseDown);

/***/ }),

/***/ "./node_modules/a11y-toggle/a11y-toggle.js":
/*!*************************************************!*\
  !*** ./node_modules/a11y-toggle/a11y-toggle.js ***!
  \*************************************************/
/***/ (() => {

(function () {
  'use strict';

  var internalId = 0;
  var togglesMap = {};
  var targetsMap = {};

  function $ (selector, context) {
    return Array.prototype.slice.call(
      (context || document).querySelectorAll(selector)
    );
  }

  function getClosestToggle (element) {
    if (element.closest) {
      return element.closest('[data-a11y-toggle]');
    }

    while (element) {
      if (element.nodeType === 1 && element.hasAttribute('data-a11y-toggle')) {
        return element;
      }

      element = element.parentNode;
    }

    return null;
  }

  function handleToggle (toggle) {
    var target = toggle && targetsMap[toggle.getAttribute('aria-controls')];

    if (!target) {
      return false;
    }

    var toggles = togglesMap['#' + target.id];
    var isExpanded = target.getAttribute('aria-hidden') === 'false';

    target.setAttribute('aria-hidden', isExpanded);
    toggles.forEach(function (toggle) {
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  var initA11yToggle = function (context) {
    togglesMap = $('[data-a11y-toggle]', context).reduce(function (acc, toggle) {
      var selector = '#' + toggle.getAttribute('data-a11y-toggle');
      acc[selector] = acc[selector] || [];
      acc[selector].push(toggle);
      return acc;
    }, togglesMap);

    var targets = Object.keys(togglesMap);
    targets.length && $(targets).forEach(function (target) {
      var toggles = togglesMap['#' + target.id];
      var isExpanded = target.hasAttribute('data-a11y-toggle-open');
      var labelledby = [];

      toggles.forEach(function (toggle) {
        toggle.id || toggle.setAttribute('id', 'a11y-toggle-' + internalId++);
        toggle.setAttribute('aria-controls', target.id);
        toggle.setAttribute('aria-expanded', isExpanded);
        labelledby.push(toggle.id);
      });

      target.setAttribute('aria-hidden', !isExpanded);
      target.hasAttribute('aria-labelledby') || target.setAttribute('aria-labelledby', labelledby.join(' '));

      targetsMap[target.id] = target;
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    initA11yToggle();
  });

  document.addEventListener('click', function (event) {
    var toggle = getClosestToggle(event.target);
    handleToggle(toggle);
  });

  document.addEventListener('keyup', function (event) {
    if (event.which === 13 || event.which === 32) {
      var toggle = getClosestToggle(event.target);
      if (toggle && toggle.getAttribute('role') === 'button') {
        handleToggle(toggle);
      }
    }
  });

  window && (window.a11yToggle = initA11yToggle);
})();


/***/ }),

/***/ "./assets/js/site.js":
/*!***************************!*\
  !*** ./assets/js/site.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internetstiftelsen_styleguide_dist_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @internetstiftelsen/styleguide/dist/components */ "./node_modules/@internetstiftelsen/styleguide/dist/components.js");
/* harmony import */ var _internetstiftelsen_styleguide_dist_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_internetstiftelsen_styleguide_dist_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tab_highlighting_tab_highlighting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab-highlighting/tab-highlighting */ "./assets/js/tab-highlighting/tab-highlighting.js");
/* harmony import */ var _tab_highlighting_tab_highlighting__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tab_highlighting_tab_highlighting__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Main entry point for the javascript bundle.
 */


console.log('🎉 Zonemaster is up and running');

/***/ }),

/***/ "./assets/js/tab-highlighting/tab-highlighting.js":
/*!********************************************************!*\
  !*** ./assets/js/tab-highlighting/tab-highlighting.js ***!
  \********************************************************/
/***/ (() => {

// Add class to html-element on tab click
console.log('foo');
var element = document.getElementsByTagName('html')[0];
var highLightClass = 'tab-highlight';
function onKeyDown(e) {
  var event = e;
  if (!event) {
    window.event = event;
  }
  var keyCode = event.keyCode || event.which;
  var tabKey = 9;
  if (keyCode === tabKey) {
    this.classList.add(highLightClass);
  }
}

// Remove class on mouse click
function onMouseDown() {
  this.classList.remove(highLightClass);
}

// Run on events

element.addEventListener('keydown', onKeyDown);
element.addEventListener('mousedown', onMouseDown);

/***/ }),

/***/ "./node_modules/focus-trap/dist/focus-trap.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/focus-trap/dist/focus-trap.esm.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFocusTrap": () => (/* binding */ createFocusTrap)
/* harmony export */ });
/* harmony import */ var tabbable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tabbable */ "./node_modules/tabbable/dist/index.esm.js");
/*!
* focus-trap 6.9.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

var isEscapeEvent = function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

var isTabEvent = function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

var delay = function delay(fn) {
  return setTimeout(fn, 0);
}; // Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs


var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });
  return idx;
};
/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */


var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(void 0, params) : value;
};

var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

var createFocusTrap = function createFocusTrap(elements, userOptions) {
  // SSR: a live trap shouldn't be created in this type of environment so this
  //  should be safe code to execute if the `document` option isn't specified
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);

  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  /**
   * Gets a configuration option value.
   * @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
   *  value will be taken from this object. Otherwise, value will be taken from base configuration.
   * @param {string} optionName Name of the option whose value is sought.
   * @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
   *  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
   */

  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  /**
   * Finds the index of the container that contains the element.
   * @param {HTMLElement} element
   * @returns {number} Index of the container in either `state.containers` or
   *  `state.containerGroups` (the order/length of these lists are the same); -1
   *  if the element isn't found.
   */


  var findContainerIndex = function findContainerIndex(element) {
    // NOTE: search `containerGroups` because it's possible a group contains no tabbable
    //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
    //  and we still need to find the element in there
    return state.containerGroups.findIndex(function (_ref) {
      var container = _ref.container,
          tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      tabbableNodes.find(function (node) {
        return node === element;
      });
    });
  };
  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */


  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];

    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      optionValue = optionValue.apply(void 0, params);
    }

    if (optionValue === true) {
      optionValue = undefined; // use default value
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      } // else, empty string (invalid), null (invalid), 0 (invalid)


      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }

    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails

      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }

    return node;
  };

  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus'); // false explicitly indicates we want no initialFocus at all

    if (node === false) {
      return false;
    }

    if (node === undefined) {
      // option not specified: use fallback options
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode; // NOTE: `fallbackFocus` option function cannot return `false` (not supported)

        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  };

  var updateTabbableNodes = function updateTabbableNodes() {
    state.containerGroups = state.containers.map(function (container) {
      var tabbableNodes = (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.tabbable)(container, config.tabbableOptions); // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
      //  are a superset of tabbable nodes

      var focusableNodes = (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.focusable)(container, config.tabbableOptions);
      return {
        container: container,
        tabbableNodes: tabbableNodes,
        focusableNodes: focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,

        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          // NOTE: If tabindex is positive (in order to manipulate the tab order separate
          //  from the DOM order), this __will not work__ because the list of focusableNodes,
          //  while it contains tabbable nodes, does not sort its nodes in any order other
          //  than DOM order, because it can't: Where would you place focusable (but not
          //  tabbable) nodes in that order? They have no order, because they aren't tabbale...
          // Support for positive tabindex is already broken and hard to manage (possibly
          //  not supportable, TBD), so this isn't going to make things worse than they
          //  already are, and at least makes things better for the majority of cases where
          //  tabindex is either 0/unset or negative.
          // FYI, positive tabindex issue: https://github.com/focus-trap/focus-trap/issues/375
          var nodeIdx = focusableNodes.findIndex(function (n) {
            return n === node;
          });

          if (nodeIdx < 0) {
            return undefined;
          }

          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find(function (n) {
              return (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(n, config.tabbableOptions);
            });
          }

          return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
            return (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(n, config.tabbableOptions);
          });
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function (group) {
      return group.tabbableNodes.length > 0;
    }); // throw if no groups have tabbable nodes and we don't have a fallback focus node either

    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
  };

  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }

    if (node === doc.activeElement) {
      return;
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  }; // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      // allow the click since it ocurred inside the trap
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(target, config.tabbableOptions)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    } // otherwise, prevent the click


    e.preventDefault();
  }; // In case focus escapes the trap for some strange reason, pull it back in.


  var checkFocusIn = function checkFocusIn(e) {
    var target = getActualTarget(e);
    var targetContained = findContainerIndex(target) >= 0; // In Firefox when you Tab out of an iframe the Document is briefly focused.

    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  }; // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  var checkTab = function checkTab(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's focusable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findContainerIndex(target);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });

        if (startOfGroupIndex < 0 && (containerGroup.container === target || (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(target, config.tabbableOptions) && !(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          // an exception case where the target is either the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }

        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });

        if (lastOfGroupIndex < 0 && (containerGroup.container === target || (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(target, config.tabbableOptions) && !(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          // an exception case where the target is the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }

        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;

          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    } // else, let the browser take care of [shift+]tab and move the focus

  };

  var checkKey = function checkKey(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  var checkClick = function checkClick(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }

    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }; //
  // EVENT LISTENERS
  //


  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    } // There can be only one listening focus trap at a time


    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };

  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }; //
  // TRAP DEFINITION
  //


  trap = {
    get active() {
      return state.active;
    },

    get paused() {
      return state.paused;
    },

    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }

      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');

      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      if (onActivate) {
        onActivate();
      }

      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }

        addListeners();

        if (onPostActivate) {
          onPostActivate();
        }
      };

      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }

      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);

      clearTimeout(state.delayInitialFocusTimer); // noop if undefined

      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(options, 'onDeactivate');
      var onPostDeactivate = getOption(options, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
      var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');

      if (onDeactivate) {
        onDeactivate();
      }

      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }

          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };

      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }

      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    }
  }; // initialize container elements

  trap.updateContainerElements(elements);
  return trap;
};


//# sourceMappingURL=focus-trap.esm.js.map


/***/ }),

/***/ "./node_modules/glider-js/glider.js":
/*!******************************************!*\
  !*** ./node_modules/glider-js/glider.js ***!
  \******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/

/* global define */

(function (factory) {
   true
    ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    : 0
})(function () {
  ('use strict') // eslint-disable-line no-unused-expressions

  /* globals window:true */
  var _window = typeof window !== 'undefined' ? window : this

  var Glider = (_window.Glider = function (element, settings) {
    var _ = this

    if (element._glider) return element._glider

    _.ele = element
    _.ele.classList.add('glider')

    // expose glider object to its DOM element
    _.ele._glider = _

    // merge user setting with defaults
    _.opt = Object.assign(
      {},
      {
        slidesToScroll: 1,
        slidesToShow: 1,
        resizeLock: true,
        duration: 0.5,
        // easeInQuad
        easing: function (x, t, b, c, d) {
          return c * (t /= d) * t + b
        }
      },
      settings
    )

    // set defaults
    _.animate_id = _.page = _.slide = 0
    _.arrows = {}

    // preserve original options to
    // extend breakpoint settings
    _._opt = _.opt

    if (_.opt.skipTrack) {
      // first and only child is the track
      _.track = _.ele.children[0]
    } else {
      // create track and wrap slides
      _.track = document.createElement('div')
      _.ele.appendChild(_.track)
      while (_.ele.children.length !== 1) {
        _.track.appendChild(_.ele.children[0])
      }
    }

    _.track.classList.add('glider-track')

    // start glider
    _.init()

    // set events
    _.resize = _.init.bind(_, true)
    _.event(_.ele, 'add', {
      scroll: _.updateControls.bind(_)
    })
    _.event(_window, 'add', {
      resize: _.resize
    })
  })

  var gliderPrototype = Glider.prototype
  gliderPrototype.init = function (refresh, paging) {
    var _ = this

    var width = 0

    var height = 0

    _.slides = _.track.children;

    [].forEach.call(_.slides, function (_, i) {
      _.classList.add('glider-slide')
      _.setAttribute('data-gslide', i)
    })

    _.containerWidth = _.ele.clientWidth

    var breakpointChanged = _.settingsBreakpoint()
    if (!paging) paging = breakpointChanged

    if (
      _.opt.slidesToShow === 'auto' ||
      typeof _.opt._autoSlide !== 'undefined'
    ) {
      var slideCount = _.containerWidth / _.opt.itemWidth

      _.opt._autoSlide = _.opt.slidesToShow = _.opt.exactWidth
        ? slideCount
        : Math.max(1, Math.floor(slideCount))
    }
    if (_.opt.slidesToScroll === 'auto') {
      _.opt.slidesToScroll = Math.floor(_.opt.slidesToShow)
    }

    _.itemWidth = _.opt.exactWidth
      ? _.opt.itemWidth
      : _.containerWidth / _.opt.slidesToShow;

    // set slide dimensions
    [].forEach.call(_.slides, function (__) {
      __.style.height = 'auto'
      __.style.width = _.itemWidth + 'px'
      width += _.itemWidth
      height = Math.max(__.offsetHeight, height)
    })

    _.track.style.width = width + 'px'
    _.trackWidth = width
    _.isDrag = false
    _.preventClick = false
    _.move = false

    _.opt.resizeLock && _.scrollTo(_.slide * _.itemWidth, 0)

    if (breakpointChanged || paging) {
      _.bindArrows()
      _.buildDots()
      _.bindDrag()
    }

    _.updateControls()

    _.emit(refresh ? 'refresh' : 'loaded')
  }

  gliderPrototype.bindDrag = function () {
    var _ = this
    _.mouse = _.mouse || _.handleMouse.bind(_)

    var mouseup = function () {
      _.mouseDown = undefined
      _.ele.classList.remove('drag')
      if (_.isDrag) {
        _.preventClick = true
      }
      _.isDrag = false
    }

    const move = function () {
      _.move = true
    }

    var events = {
      mouseup: mouseup,
      mouseleave: mouseup,
      mousedown: function (e) {
        e.preventDefault()
        e.stopPropagation()
        _.mouseDown = e.clientX
        _.ele.classList.add('drag')
        _.move = false
        setTimeout(move, 300)
      },
      touchstart: function (e) {
        _.ele.classList.add('drag')
        _.move = false
        setTimeout(move, 300)
      },
      mousemove: _.mouse,
      click: function (e) {
        if (_.preventClick && _.move) {
          e.preventDefault()
          e.stopPropagation()
        }
        _.preventClick = false
        _.move = false
      }
    }

    _.ele.classList.toggle('draggable', _.opt.draggable === true)
    _.event(_.ele, 'remove', events)
    if (_.opt.draggable) _.event(_.ele, 'add', events)
  }

  gliderPrototype.buildDots = function () {
    var _ = this

    if (!_.opt.dots) {
      if (_.dots) _.dots.innerHTML = ''
      return
    }

    if (typeof _.opt.dots === 'string') {
      _.dots = document.querySelector(_.opt.dots)
    } else _.dots = _.opt.dots
    if (!_.dots) return

    _.dots.innerHTML = ''
    _.dots.setAttribute('role', 'tablist')
    _.dots.classList.add('glider-dots')

    for (var i = 0; i < Math.ceil(_.slides.length / _.opt.slidesToShow); ++i) {
      var dot = document.createElement('button')
      dot.dataset.index = i
      dot.setAttribute('aria-label', 'Page ' + (i + 1))
      dot.setAttribute('role', 'tab')
      dot.className = 'glider-dot ' + (i ? '' : 'active')
      _.event(dot, 'add', {
        click: _.scrollItem.bind(_, i, true)
      })
      _.dots.appendChild(dot)
    }
  }

  gliderPrototype.bindArrows = function () {
    var _ = this
    if (!_.opt.arrows) {
      Object.keys(_.arrows).forEach(function (direction) {
        var element = _.arrows[direction]
        _.event(element, 'remove', { click: element._func })
      })
      return
    }
    ['prev', 'next'].forEach(function (direction) {
      var arrow = _.opt.arrows[direction]
      if (arrow) {
        if (typeof arrow === 'string') arrow = document.querySelector(arrow)
        if (arrow) {
          arrow._func = arrow._func || _.scrollItem.bind(_, direction)
          _.event(arrow, 'remove', {
            click: arrow._func
          })
          _.event(arrow, 'add', {
            click: arrow._func
          })
          _.arrows[direction] = arrow
        }
      }
    })
  }

  gliderPrototype.updateControls = function (event) {
    var _ = this

    if (event && !_.opt.scrollPropagate) {
      event.stopPropagation()
    }

    var disableArrows = _.containerWidth >= _.trackWidth

    if (!_.opt.rewind) {
      if (_.arrows.prev) {
        _.arrows.prev.classList.toggle(
          'disabled',
          _.ele.scrollLeft <= 0 || disableArrows
        )

        _.arrows.prev.setAttribute(
          'aria-disabled',
          _.arrows.prev.classList.contains('disabled')
        )
      }
      if (_.arrows.next) {
        _.arrows.next.classList.toggle(
          'disabled',
          Math.ceil(_.ele.scrollLeft + _.containerWidth) >=
            Math.floor(_.trackWidth) || disableArrows
        )

        _.arrows.next.setAttribute(
          'aria-disabled',
          _.arrows.next.classList.contains('disabled')
        )
      }
    }

    _.slide = Math.round(_.ele.scrollLeft / _.itemWidth)
    _.page = Math.round(_.ele.scrollLeft / _.containerWidth)

    var middle = _.slide + Math.floor(Math.floor(_.opt.slidesToShow) / 2)

    var extraMiddle = Math.floor(_.opt.slidesToShow) % 2 ? 0 : middle + 1
    if (Math.floor(_.opt.slidesToShow) === 1) {
      extraMiddle = 0
    }

    // the last page may be less than one half of a normal page width so
    // the page is rounded down. when at the end, force the page to turn
    if (_.ele.scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)) {
      _.page = _.dots ? _.dots.children.length - 1 : 0
    }

    [].forEach.call(_.slides, function (slide, index) {
      var slideClasses = slide.classList

      var wasVisible = slideClasses.contains('visible')

      var start = _.ele.scrollLeft

      var end = _.ele.scrollLeft + _.containerWidth

      var itemStart = _.itemWidth * index

      var itemEnd = itemStart + _.itemWidth;

      [].forEach.call(slideClasses, function (className) {
        /^left|right/.test(className) && slideClasses.remove(className)
      })
      slideClasses.toggle('active', _.slide === index)
      if (middle === index || (extraMiddle && extraMiddle === index)) {
        slideClasses.add('center')
      } else {
        slideClasses.remove('center')
        slideClasses.add(
          [
            index < middle ? 'left' : 'right',
            Math.abs(index - (index < middle ? middle : extraMiddle || middle))
          ].join('-')
        )
      }

      var isVisible =
        Math.ceil(itemStart) >= Math.floor(start) &&
        Math.floor(itemEnd) <= Math.ceil(end)
      slideClasses.toggle('visible', isVisible)
      if (isVisible !== wasVisible) {
        _.emit('slide-' + (isVisible ? 'visible' : 'hidden'), {
          slide: index
        })
      }
    })
    if (_.dots) {
      [].forEach.call(_.dots.children, function (dot, index) {
        dot.classList.toggle('active', _.page === index)
      })
    }

    if (event && _.opt.scrollLock) {
      clearTimeout(_.scrollLock)
      _.scrollLock = setTimeout(function () {
        clearTimeout(_.scrollLock)
        // dont attempt to scroll less than a pixel fraction - causes looping
        if (Math.abs(_.ele.scrollLeft / _.itemWidth - _.slide) > 0.02) {
          if (!_.mouseDown) {
            // Only scroll if not at the end (#94)
            if (_.trackWidth > _.containerWidth + _.ele.scrollLeft) {
              _.scrollItem(_.getCurrentSlide())
            }
          }
        }
      }, _.opt.scrollLockDelay || 250)
    }
  }

  gliderPrototype.getCurrentSlide = function () {
    var _ = this
    return _.round(_.ele.scrollLeft / _.itemWidth)
  }

  gliderPrototype.scrollItem = function (slide, dot, e) {
    if (e) e.preventDefault()

    var _ = this

    var originalSlide = slide
    ++_.animate_id

    var prevSlide = _.slide
    var position

    if (dot === true) {
      slide = Math.round((slide * _.containerWidth) / _.itemWidth)
      position = slide * _.itemWidth
    } else {
      if (typeof slide === 'string') {
        var backwards = slide === 'prev'

        // use precise location if fractional slides are on
        if (_.opt.slidesToScroll % 1 || _.opt.slidesToShow % 1) {
          slide = _.getCurrentSlide()
        } else {
          slide = _.slide
        }

        if (backwards) slide -= _.opt.slidesToScroll
        else slide += _.opt.slidesToScroll

        if (_.opt.rewind) {
          var scrollLeft = _.ele.scrollLeft
          slide =
            backwards && !scrollLeft
              ? _.slides.length
              : !backwards &&
                scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)
                ? 0
                : slide
        }
      }

      slide = Math.max(Math.min(slide, _.slides.length), 0)

      _.slide = slide
      position = _.itemWidth * slide
    }

    _.emit('scroll-item', { prevSlide, slide })

    _.scrollTo(
      position,
      _.opt.duration * Math.abs(_.ele.scrollLeft - position),
      function () {
        _.updateControls()
        _.emit('animated', {
          value: originalSlide,
          type:
            typeof originalSlide === 'string' ? 'arrow' : dot ? 'dot' : 'slide'
        })
      }
    )

    return false
  }

  gliderPrototype.settingsBreakpoint = function () {
    var _ = this

    var resp = _._opt.responsive

    if (resp) {
      // Sort the breakpoints in mobile first order
      resp.sort(function (a, b) {
        return b.breakpoint - a.breakpoint
      })

      for (var i = 0; i < resp.length; ++i) {
        var size = resp[i]
        if (_window.innerWidth >= size.breakpoint) {
          if (_.breakpoint !== size.breakpoint) {
            _.opt = Object.assign({}, _._opt, size.settings)
            _.breakpoint = size.breakpoint
            return true
          }
          return false
        }
      }
    }
    // set back to defaults in case they were overriden
    var breakpointChanged = _.breakpoint !== 0
    _.opt = Object.assign({}, _._opt)
    _.breakpoint = 0
    return breakpointChanged
  }

  gliderPrototype.scrollTo = function (scrollTarget, scrollDuration, callback) {
    var _ = this

    var start = new Date().getTime()

    var animateIndex = _.animate_id

    var animate = function () {
      var now = new Date().getTime() - start
      _.ele.scrollLeft =
        _.ele.scrollLeft +
        (scrollTarget - _.ele.scrollLeft) *
          _.opt.easing(0, now, 0, 1, scrollDuration)
      if (now < scrollDuration && animateIndex === _.animate_id) {
        _window.requestAnimationFrame(animate)
      } else {
        _.ele.scrollLeft = scrollTarget
        callback && callback.call(_)
      }
    }

    _window.requestAnimationFrame(animate)
  }

  gliderPrototype.removeItem = function (index) {
    var _ = this

    if (_.slides.length) {
      _.track.removeChild(_.slides[index])
      _.refresh(true)
      _.emit('remove')
    }
  }

  gliderPrototype.addItem = function (ele) {
    var _ = this

    _.track.appendChild(ele)
    _.refresh(true)
    _.emit('add')
  }

  gliderPrototype.handleMouse = function (e) {
    var _ = this
    if (_.mouseDown) {
      _.isDrag = true
      _.ele.scrollLeft +=
        (_.mouseDown - e.clientX) * (_.opt.dragVelocity || 3.3)
      _.mouseDown = e.clientX
    }
  }

  // used to round to the nearest 0.XX fraction
  gliderPrototype.round = function (double) {
    var _ = this
    var step = _.opt.slidesToScroll % 1 || 1
    var inv = 1.0 / step
    return Math.round(double * inv) / inv
  }

  gliderPrototype.refresh = function (paging) {
    var _ = this
    _.init(true, paging)
  }

  gliderPrototype.setOption = function (opt, global) {
    var _ = this

    if (_.breakpoint && !global) {
      _._opt.responsive.forEach(function (v) {
        if (v.breakpoint === _.breakpoint) {
          v.settings = Object.assign({}, v.settings, opt)
        }
      })
    } else {
      _._opt = Object.assign({}, _._opt, opt)
    }

    _.breakpoint = 0
    _.settingsBreakpoint()
  }

  gliderPrototype.destroy = function () {
    var _ = this

    var replace = _.ele.cloneNode(true)

    var clear = function (ele) {
      ele.removeAttribute('style');
      [].forEach.call(ele.classList, function (className) {
        /^glider/.test(className) && ele.classList.remove(className)
      })
    }
    // remove track if it was created by glider
    if (!_.opt.skipTrack) {
      replace.children[0].outerHTML = replace.children[0].innerHTML
    }
    clear(replace);
    [].forEach.call(replace.getElementsByTagName('*'), clear)
    _.ele.parentNode.replaceChild(replace, _.ele)
    _.event(_window, 'remove', {
      resize: _.resize
    })
    _.emit('destroy')
  }

  gliderPrototype.emit = function (name, arg) {
    var _ = this

    var e = new _window.CustomEvent('glider-' + name, {
      bubbles: !_.opt.eventPropagate,
      detail: arg
    })
    _.ele.dispatchEvent(e)
  }

  gliderPrototype.event = function (ele, type, args) {
    var eventHandler = ele[type + 'EventListener'].bind(ele)
    Object.keys(args).forEach(function (k) {
      eventHandler(k, args[k])
    })
  }

  return Glider
})


/***/ }),

/***/ "./node_modules/lodash.throttle/index.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash.throttle/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;


/***/ }),

/***/ "./assets/scss/site.scss":
/*!*******************************!*\
  !*** ./assets/scss/site.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/tabbable/dist/index.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/tabbable/dist/index.esm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "focusable": () => (/* binding */ focusable),
/* harmony export */   "isFocusable": () => (/* binding */ isFocusable),
/* harmony export */   "isTabbable": () => (/* binding */ isTabbable),
/* harmony export */   "tabbable": () => (/* binding */ tabbable)
/* harmony export */ });
/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]:not(slot)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
  return element.getRootNode();
} : function (element) {
  return element.ownerDocument;
};
/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */

var getCandidates = function getCandidates(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));

  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }

  candidates = candidates.filter(filter);
  return candidates;
};
/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */

/**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */

/**
 * @typedef {Object} CandidatesScope
 * @property {Element} scope contains inner candidates
 * @property {Element[]} candidates
 */

/**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidatesScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */

/**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidatesScope>}
 */


var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);

  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();

    if (element.tagName === 'SLOT') {
      // add shadow dom slot scope (slot itself cannot be focusable)
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively(content, true, options);

      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scope: element,
          candidates: nestedCandidates
        });
      }
    } else {
      // check candidate element
      var validCandidate = matches.call(element, candidateSelector);

      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      } // iterate over shadow content if possible


      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);
      var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element);

      if (shadowRoot && validShadowRoot) {
        // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
        //  shadow exists, so look at light dom children as fallback BUT create a scope for any
        //  child candidates found because they're likely slotted elements (elements that are
        //  children of the web component element (which has the shadow), in the light dom, but
        //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
        //  _after_ we return from this recursive call
        var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);

        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scope: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        // there's not shadow so just dig into the element's (light dom) children
        //  __without__ giving the element special scope treatment
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }

  return candidates;
};

var getTabindex = function getTabindex(node, isScope) {
  if (node.tabIndex < 0) {
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    // yet they are still part of the regular tab order; in FF, they get a default
    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    // order, consider their tab index to be 0.
    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    //
    // isScope is positive for custom element with shadow root or slot that by default
    // have tabIndex -1, but need to be sorted by document order in order for their
    // content to be inserted in the correct position
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute('tabindex'), 10))) {
      return 0;
    }
  }

  return node.tabIndex;
};

var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};

var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};

var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};

var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};

var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};

var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }

  var radioScope = node.form || getRootNode(node);

  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };

  var radioSet;

  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }

  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};

var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};

var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

var isZeroArea = function isZeroArea(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
      width = _node$getBoundingClie.width,
      height = _node$getBoundingClie.height;

  return width === 0 && height === 0;
};

var isHidden = function isHidden(node, _ref) {
  var displayCheck = _ref.displayCheck,
      getShadowRoot = _ref.getShadowRoot;

  // NOTE: visibility will be `undefined` if node is detached from the document
  //  (see notes about this further down), which means we will consider it visible
  //  (this is legacy behavior from a very long way back)
  // NOTE: we check this regardless of `displayCheck="none"` because this is a
  //  _visibility_ check, not a _display_ check
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }

  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  } // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
  //  (but NOT _the_ document; see second 'If' comment below for more).
  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
  //  is attached, and the one we need to check if it's in the document or not (because the
  //  shadow, and all nodes it contains, is never considered in the document since shadows
  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
  //  visibility, including all the nodes it contains). The host could be any normal node,
  //  or a custom element (i.e. web component). Either way, that's the one that is considered
  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
  //  tested).
  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
  //  document (per the docs) and while it's a Document-type object, that document does not
  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
  //  node is actually detached.


  var nodeRootHost = getRootNode(node).host;
  var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);

  if (!displayCheck || displayCheck === 'full') {
    if (typeof getShadowRoot === 'function') {
      // figure out if we should consider the node to be in an undisclosed shadow and use the
      //  'non-zero-area' fallback
      var originalNode = node;

      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);

        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
        ) {
          // node has an undisclosed shadow which means we can only treat it as a black box, so we
          //  fall back to a non-zero-area test
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          // iterate up slot
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          // cross shadow boundary
          node = rootNode.host;
        } else {
          // iterate up normal dom
          node = parentElement;
        }
      }

      node = originalNode;
    } // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
    //  it might be a falsy value, which means shadow DOM support is disabled
    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
    //  now we can just test to see if it would normally be visible or not, provided it's
    //  attached to the main document.
    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.


    if (nodeIsAttached) {
      // this works wherever the node is: if there's at least one client rect, it's
      //  somehow displayed; it also covers the CSS 'display: contents' case where the
      //  node itself is hidden in place of its contents; and there's no need to search
      //  up the hierarchy either
      return !node.getClientRects().length;
    } // Else, the node isn't attached to the document, which means the `getClientRects()`
    //  API will __always__ return zero rects (this can happen, for example, if React
    //  is used to render nodes onto a detached tree, as confirmed in this thread:
    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
    //
    // It also means that even window.getComputedStyle(node).display will return `undefined`
    //  because styles are only computed for nodes that are in the document.
    //
    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
    //  considering __everything__ to be visible because of the innability to determine styles.

  } else if (displayCheck === 'non-zero-area') {
    // NOTE: Even though this tests that the node's client rect is non-zero to determine
    //  whether it's displayed, and that a detached node will __always__ have a zero-area
    //  client rect, we don't special-case for whether the node is attached or not. In
    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
    //  times, and that includes attached or not.
    return isZeroArea(node);
  } // visible, as far as we can tell, or per current `displayCheck` mode


  return false;
}; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset


var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement; // check if `node` is contained in a disabled <fieldset>

    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> among the children of the disabled <fieldset>
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i); // when the first <legend> (in document order) is found

          if (child.tagName === 'LEGEND') {
            // if its parent <fieldset> is not nested in another disabled <fieldset>,
            // return whether `node` is a descendant of its first <legend>
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        } // the disabled <fieldset> containing `node` has no <legend>


        return true;
      }

      parentNode = parentNode.parentElement;
    }
  } // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state


  return false;
};

var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }

  return true;
};

var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }

  return true;
};

var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);

  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  } // If a custom element has an explicit negative tabindex,
  // browsers will not allow tab targeting said element's children.


  return false;
};
/**
 * @param {Array.<Element|CandidatesScope>} candidates
 * @returns Element[]
 */


var sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function (item, i) {
    var isScope = !!item.scope;
    var element = isScope ? item.scope : item;
    var candidateTabindex = getTabindex(element, isScope);
    var elements = isScope ? sortByOrder(item.candidates) : element;

    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item: item,
        isScope: isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};

var tabbable = function tabbable(el, options) {
  options = options || {};
  var candidates;

  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }

  return sortByOrder(candidates);
};

var focusable = function focusable(el, options) {
  options = options || {};
  var candidates;

  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }

  return candidates;
};

var isTabbable = function isTabbable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, candidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorTabbable(options, node);
};

var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');

var isFocusable = function isFocusable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorFocusable(options, node);
};


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/van11y-accessible-accordion-aria/dist/van11y-accessible-accordion-aria.min.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/van11y-accessible-accordion-aria/dist/van11y-accessible-accordion-aria.min.js ***!
  \****************************************************************************************************/
/***/ (() => {

"use strict";
/**
 * van11y-accessible-accordion-aria - ES2015 accessible accordion system, using ARIA (compatible IE9+ when transpiled)
 * @version v3.0.1
 * @link https://van11y.net/accessible-accordion/
 * @license MIT : https://github.com/nico3333fr/van11y-accessible-accordion-aria/blob/master/LICENSE
 */
function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},loadConfig=function(){var e={},t=function(t,r){e[t]=r},r=function(t){return e[t]},n=function(t){return e[t]};return{set:t,get:r,remove:n}},DATA_HASH_ID="data-hashaccordion-id",pluginConfig=loadConfig(),findById=function(e,t){return document.querySelector("#"+e+"["+DATA_HASH_ID+'="'+t+'"]')},addClass=function(e,t){e.classList?e.classList.add(t):e.className+=" "+t},removeClass=function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")},hasClass=function(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)},setAttributes=function(e,t){Object.keys(t).forEach(function(r){e.setAttribute(r,t[r])})},searchParentHashId=function(e,t){for(var r=!1,n=e;1===n.nodeType&&n&&r===!1;)n.hasAttribute(t)===!0?r=!0:n=n.parentNode;return r===!0?n.getAttribute(t):""},searchParent=function(e,t,r){for(var n=!1,A=e;A&&n===!1;)hasClass(A,t)===!0&&A.getAttribute(DATA_HASH_ID)===r?n=!0:A=A.parentNode;return n===!0?A.getAttribute("id"):""},unSelectHeaders=function(e,t){e.forEach(function(e){setAttributes(e,_defineProperty({},t,"false"))})},selectHeader=function(e,t){e.setAttribute(t,!0)},selectHeaderInList=function(e,t,r){var n=void 0;e.forEach(function(e,t){"true"===e.getAttribute(r)&&(n=t)}),"next"===t&&(selectHeader(e[n+1]),setTimeout(function(){e[n+1].focus()},0)),"prev"===t&&(selectHeader(e[n-1]),setTimeout(function(){e[n-1].focus()},0))},plugin=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=_extends({ACCORDION_JS:"js-accordion",ACCORDION_JS_HEADER:"js-accordion__header",ACCORDION_JS_PANEL:"js-accordion__panel",ACCORDION_DATA_PREFIX_CLASS:"data-accordion-prefix-classes",ACCORDION_DATA_OPENED:"data-accordion-opened",ACCORDION_DATA_MULTISELECTABLE:"data-accordion-multiselectable",ACCORDION_DATA_COOL_SELECTORS:"data-accordion-cool-selectors",ACCORDION_PREFIX_IDS:"accordion",ACCORDION_BUTTON_ID:"_tab",ACCORDION_PANEL_ID:"_panel",ACCORDION_STYLE:"accordion",ACCORDION_TITLE_STYLE:"accordion__title",ACCORDION_HEADER_STYLE:"accordion__header",ACCORDION_PANEL_STYLE:"accordion__panel",ACCORDION_ROLE_TABLIST:"tablist",ACCORDION_ROLE_TAB:"tab",ACCORDION_ROLE_TABPANEL:"tabpanel",ATTR_ROLE:"role",ATTR_MULTISELECTABLE:"aria-multiselectable",ATTR_EXPANDED:"aria-expanded",ATTR_LABELLEDBY:"aria-labelledby",ATTR_HIDDEN:"aria-hidden",ATTR_CONTROLS:"aria-controls",ATTR_SELECTED:"aria-selected"},e),r=Math.random().toString(32).slice(2,12);pluginConfig.set(r,t);var n=function(){var e=arguments.length<=0||void 0===arguments[0]?document:arguments[0];return[].slice.call(e.querySelectorAll("."+t.ACCORDION_JS))},A=function(e){n(e).forEach(function(e){var n="z"+Math.random().toString(32).slice(2,12),A=e.hasAttribute(t.ACCORDION_DATA_PREFIX_CLASS)===!0?e.getAttribute(t.ACCORDION_DATA_PREFIX_CLASS)+"-":"",a=e.hasAttribute(t.ACCORDION_DATA_COOL_SELECTORS)===!0;"none"===e.getAttribute(t.ACCORDION_DATA_MULTISELECTABLE)?e.setAttribute(t.ATTR_MULTISELECTABLE,"false"):e.setAttribute(t.ATTR_MULTISELECTABLE,"true"),e.setAttribute(t.ATTR_ROLE,t.ACCORDION_ROLE_TABLIST),e.setAttribute("id",n),e.setAttribute(DATA_HASH_ID,r),addClass(e,A+t.ACCORDION_STYLE);var i=[].slice.call(e.querySelectorAll("."+t.ACCORDION_JS_HEADER));i.forEach(function(i,_){var o,T;if(i.parentNode===e||a!==!1){var E=_+1,s=i.nextElementSibling,C=i.innerHTML,c=document.createElement("BUTTON"),D=i.hasAttribute(t.ACCORDION_DATA_OPENED)===!0?i.getAttribute(t.ACCORDION_DATA_OPENED):"";c.innerHTML=C,addClass(c,t.ACCORDION_JS_HEADER),addClass(c,A+t.ACCORDION_HEADER_STYLE),setAttributes(c,(o={},_defineProperty(o,t.ATTR_ROLE,t.ACCORDION_ROLE_TAB),_defineProperty(o,"id",t.ACCORDION_PREFIX_IDS+n+t.ACCORDION_BUTTON_ID+E),_defineProperty(o,t.ATTR_CONTROLS,t.ACCORDION_PREFIX_IDS+n+t.ACCORDION_PANEL_ID+E),_defineProperty(o,t.ATTR_SELECTED,"false"),_defineProperty(o,"type","button"),_defineProperty(o,DATA_HASH_ID,r),o)),i.innerHTML="",i.appendChild(c),addClass(i,A+t.ACCORDION_TITLE_STYLE),removeClass(i,t.ACCORDION_JS_HEADER),addClass(s,A+t.ACCORDION_PANEL_STYLE),setAttributes(s,(T={},_defineProperty(T,t.ATTR_ROLE,t.ACCORDION_ROLE_TABPANEL),_defineProperty(T,t.ATTR_LABELLEDBY,t.ACCORDION_PREFIX_IDS+n+t.ACCORDION_BUTTON_ID+E),_defineProperty(T,"id",t.ACCORDION_PREFIX_IDS+n+t.ACCORDION_PANEL_ID+E),_defineProperty(T,DATA_HASH_ID,r),T)),"true"===D?(c.setAttribute(t.ATTR_EXPANDED,"true"),i.removeAttribute(t.ACCORDION_DATA_OPENED),s.setAttribute(t.ATTR_HIDDEN,"false")):(c.setAttribute(t.ATTR_EXPANDED,"false"),s.setAttribute(t.ATTR_HIDDEN,"true"))}})})};return{attach:A}},main=function(){return["click","keydown","focus"].forEach(function(e){document.body.addEventListener(e,function(t){var r=searchParentHashId(t.target,DATA_HASH_ID);""!==r&&!function(){var n=pluginConfig.get(r);hasClass(t.target,n.ACCORDION_JS_HEADER)===!0&&"focus"===e&&!function(){var e=t.target,A=findById(searchParent(e,n.ACCORDION_JS,r),r),a=A.hasAttribute(n.ACCORDION_DATA_COOL_SELECTORS)===!0,i=[].slice.call(A.querySelectorAll("."+n.ACCORDION_JS_HEADER));a===!1&&(i=i.filter(function(e){return e.parentNode.parentNode===A})),unSelectHeaders(i,n.ATTR_SELECTED),selectHeader(e,n.ATTR_SELECTED)}(),hasClass(t.target,n.ACCORDION_JS_HEADER)===!0&&"click"===e&&!function(){var e=t.target,A=findById(searchParent(e,n.ACCORDION_JS,r),r),a=A.hasAttribute(n.ACCORDION_DATA_COOL_SELECTORS)===!0,i=[].slice.call(A.querySelectorAll("."+n.ACCORDION_JS_HEADER)),_=A.getAttribute(n.ATTR_MULTISELECTABLE),o=findById(e.getAttribute(n.ATTR_CONTROLS),r),T=e.getAttribute(n.ATTR_EXPANDED);a===!1&&(i=i.filter(function(e){return e.parentNode.parentNode===A})),"false"===T?(e.setAttribute(n.ATTR_EXPANDED,!0),o.removeAttribute(n.ATTR_HIDDEN)):(e.setAttribute(n.ATTR_EXPANDED,!1),o.setAttribute(n.ATTR_HIDDEN,!0)),"false"===_&&i.forEach(function(t){var A=findById(t.getAttribute(n.ATTR_CONTROLS),r);t!==e?(t.setAttribute(n.ATTR_SELECTED,!1),t.setAttribute(n.ATTR_EXPANDED,!1),A.setAttribute(n.ATTR_HIDDEN,!0)):t.setAttribute(n.ATTR_SELECTED,!0)}),setTimeout(function(){e.focus()},0),t.preventDefault()}(),hasClass(t.target,n.ACCORDION_JS_HEADER)===!0&&"keydown"===e&&!function(){var e=t.target,A=searchParent(e,n.ACCORDION_JS,r),a=findById(A,r),i=a.hasAttribute(n.ACCORDION_DATA_COOL_SELECTORS)===!0,_=[].slice.call(a.querySelectorAll("."+n.ACCORDION_JS_HEADER));i===!1&&(_=_.filter(function(e){return e.parentNode.parentNode===a})),36===t.keyCode?(unSelectHeaders(_,n.ATTR_SELECTED),selectHeader(_[0],n.ATTR_SELECTED),setTimeout(function(){_[0].focus()},0),t.preventDefault()):35===t.keyCode?(unSelectHeaders(_,n.ATTR_SELECTED),selectHeader(_[_.length-1],n.ATTR_SELECTED),setTimeout(function(){_[_.length-1].focus()},0),t.preventDefault()):37!==t.keyCode&&38!==t.keyCode||t.ctrlKey?40!==t.keyCode&&39!==t.keyCode||t.ctrlKey||("true"===_[_.length-1].getAttribute(n.ATTR_SELECTED)?(unSelectHeaders(_,n.ATTR_SELECTED),selectHeader(_[0],n.ATTR_SELECTED),setTimeout(function(){_[0].focus()},0),t.preventDefault()):(selectHeaderInList(_,"next",n.ATTR_SELECTED),t.preventDefault())):"true"===_[0].getAttribute(n.ATTR_SELECTED)?(unSelectHeaders(_,n.ATTR_SELECTED),selectHeader(_[_.length-1],n.ATTR_SELECTED),setTimeout(function(){_[_.length-1].focus()},0),t.preventDefault()):(selectHeaderInList(_,"prev",n.ATTR_SELECTED),t.preventDefault())}()}()},!0)}),plugin};window.van11yAccessibleAccordionAria=main();var onLoad=function e(){var t=window.van11yAccessibleAccordionAria();t.attach(),document.removeEventListener("DOMContentLoaded",e)};document.addEventListener("DOMContentLoaded",onLoad);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/js/site-all": 0,
/******/ 			"assets/css/site": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkzonemaster_se"] = self["webpackChunkzonemaster_se"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/css/site"], () => (__webpack_require__("./assets/js/site.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/css/site"], () => (__webpack_require__("./assets/scss/site.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=site-all.js.map