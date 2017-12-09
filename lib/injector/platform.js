'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.freeze = exports.checkThemeWrapper = undefined;

var _reactPrimitives = require('react-primitives');

var _exenv = require('exenv');

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var os = _reactPrimitives.Platform.OS;

// __DEV__ is compiled into 'production' === process.env.NODE_ENV during build process (React Native)


// Execution environment (fallback for platform.os === 'ios' || platform.os === 'android')
function returnTheme(environment, theme) {
	return environment ? Object.freeze(theme) : theme;
}

function freeze(theme) {
	if (os === 'web') {
		var t = returnTheme(process.env.NODE_ENV !== 'production', theme);
		return t;
	}

	if ((os === 'ios' || os === 'android') && _exenv2.default.canUseDOM === false) {
		var _t = returnTheme(__DEV__, theme);
		return _t;
	}

	return theme;
}

function displayError(env, fn, component) {
	if (env) {
		console.warn(fn(component.displayName || component.name || 'Stateless Function'));
	}
	return;
}

function checkThemeWrapper(fn, component) {
	if (os === 'web') {
		displayError(process.env.NODE_ENV !== 'production', fn, component);
	}

	if ((os === 'ios' || os === 'android') && _exenv2.default.canUseDOM === false) {
		displayError(__DEV__, fn, component);
	}

	return;
}

exports.checkThemeWrapper = checkThemeWrapper;
exports.freeze = freeze;