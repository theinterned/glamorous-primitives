var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { StyleSheet } from 'react-primitives';

export default function prepareStyles(styles) {
	return styles.filter(function (style) {
		if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) === 'object') {
			return Object.keys(style).length > 0;
		}
		return true;
	}).map(function (style) {
		if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) === 'object') {
			return StyleSheet.create({ style: style }).style;
		}
		return style;
	});
}