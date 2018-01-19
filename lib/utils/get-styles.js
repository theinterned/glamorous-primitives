'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function evaluateGlamorStyles(styles, props, theme, context) {
	return styles.map(function (style) {
		if (typeof style === 'function') {
			return style(props, theme, context);
		}
		return style;
	});
}

// This will change in V3 (V3 will have support for css and className via babel transform)
function getStyles(styles, props, styleOverrides, theme, context) {
	var glamorStyles = evaluateGlamorStyles(styles, props, theme, context);
	var outputStyles = glamorStyles;

	if (props.style) {
		outputStyles.push(props.style);
	}

	if (styleOverrides && Object.keys(styleOverrides).length > 0) {
		outputStyles.push(styleOverrides);
	}

	return outputStyles;
}

exports.default = getStyles;