function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import shouldForwardProperty from '../utils/should-forward-property';

// This will change in V3 because it has support for css prop and other properties also!
export default function splitProps(_ref, _ref2) {
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
		if (forwardProps.indexOf(propName) !== -1 || shouldForwardProperty(rootEl, propName)) {
			split.toForward[propName] = rest[propName];
		} else if (propsAreCssOverrides) {
			split.styleOverrides[propName] = rest[propName];
		}
		return split;
	}, returnValue);
}