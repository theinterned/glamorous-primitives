'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = splitProps;

var _shouldForwardProperty = require('../utils/should-forward-property');

var _shouldForwardProperty2 = _interopRequireDefault(_shouldForwardProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// This will change in V3 because it has support for css prop and other properties also!
function splitProps(_ref, _ref2) {
	var propsAreCssOverrides = _ref2.propsAreCssOverrides,
	    rootEl = _ref2.rootEl,
	    forwardProps = _ref2.forwardProps;

	var theme = _ref.theme,
	    innerRef = _ref.innerRef,
	    glam = _ref.glam,
	    rest = _objectWithoutProperties(_ref, ['theme', 'innerRef', 'glam']);

	var styleOverrides = {};
	var returnValue = { toForward: {}, styleOverrides: styleOverrides };

	if (!propsAreCssOverrides) {
		// It's a component, boom! Take everything 😎
		if (typeof rootEl !== 'string') {
			returnValue.toForward = rest;
			return returnValue;
		}
	}

	return Object.keys(rest).reduce(function (split, propName) {
		if (forwardProps.indexOf(propName) !== -1 || (0, _shouldForwardProperty2.default)(rootEl, propName)) {
			split.toForward[propName] = rest[propName];
		} else if (propsAreCssOverrides) {
			split.styleOverrides[propName] = rest[propName];
		}
		return split;
	}, returnValue);
}