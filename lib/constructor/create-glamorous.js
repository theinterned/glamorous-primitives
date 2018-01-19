var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import reactPrimitives from 'react-primitives';
import PropTypes from 'prop-types';
import { CHANNEL } from '../constants';
import getStyles from '../utils/get-styles';
import prepareStyles from './prepare-styles';
import { freeze } from '../injector/platform';

export default function createGlamorous(splitProps) {
	return function glamorous(comp) {
		var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    propsAreCssOverrides = _ref.propsAreCssOverrides,
		    rootEl = _ref.rootEl,
		    displayName = _ref.displayName,
		    _ref$forwardProps = _ref.forwardProps,
		    forwardProps = _ref$forwardProps === undefined ? [] : _ref$forwardProps;

		return glamorousComponentFactory;

		function glamorousComponentFactory() {
			for (var _len = arguments.length, unpreparedStyles = Array(_len), _key = 0; _key < _len; _key++) {
				unpreparedStyles[_key] = arguments[_key];
			}

			// Prepare styles for Native View and Web View
			var styles = prepareStyles(unpreparedStyles);

			var GlamorousComponent = function (_Component) {
				_inherits(GlamorousComponent, _Component);

				// Not in sync with glamorous beta V4 (theme is already available on props)
				function GlamorousComponent(props, context) {
					_classCallCheck(this, GlamorousComponent);

					// (yet to be unbinded)
					var _this = _possibleConstructorReturn(this, (GlamorousComponent.__proto__ || Object.getPrototypeOf(GlamorousComponent)).call(this, props, context));

					_this.state = { theme: null };

					_this.setTheme = function (theme) {
						return _this.setState({ theme: theme });
					};

					_this.onRef = _this.onRef.bind(_this);
					return _this;
				}

				_createClass(GlamorousComponent, [{
					key: 'componentWillMount',
					value: function componentWillMount() {
						var theme = this.props.theme;


						if (this.context[CHANNEL]) {
							this.setTheme(theme ? theme : this.context[CHANNEL].getState());
						} else {
							this.setTheme(theme || {});
						}
					}
				}, {
					key: 'componentWillReceiveProps',
					value: function componentWillReceiveProps(nextProps) {
						if (this.props.theme !== nextProps.theme) {
							this.setTheme(nextProps.theme);
						}
					}
				}, {
					key: 'componentDidMount',
					value: function componentDidMount() {
						if (this.context[CHANNEL] && !this.props.theme) {
							this.unsubscribe = this.context[CHANNEL].subscribe(this.setTheme);
						}
					}
				}, {
					key: 'componentWillUnmount',
					value: function componentWillUnmount() {
						this.unsubscribe && this.unsubscribe();
					}

					// (yet to be unbinded)

				}, {
					key: 'onRef',
					value: function onRef(innerComponent) {
						this.innerComponent = innerComponent;
						if (this.props.innerRef) {
							this.props.innerRef(innerComponent);
						}
					}
				}, {
					key: 'setNativeProps',
					value: function setNativeProps(nativeProps) {
						if (this.innerComponent) {
							this.innerComponent.setNativeProps(nativeProps);
						}
					}
				}, {
					key: 'render',
					value: function render() {
						var props = this.props;

						var _splitProps = splitProps(props, GlamorousComponent),
						    toForward = _splitProps.toForward,
						    styleOverrides = _splitProps.styleOverrides;

						var theme = freeze(this.state.theme);

						var fullStyles = getStyles(GlamorousComponent.styles, props, styleOverrides, theme, this.context);

						return React.createElement(GlamorousComponent.comp, Object.assign({}, toForward, {
							ref: this.onRef,
							style: fullStyles.length > 0 ? fullStyles : null
						}));
					}
				}]);

				return GlamorousComponent;
			}(Component);

			GlamorousComponent.comp = comp;

			GlamorousComponent.propTypes = {
				innerRef: PropTypes.func,
				theme: PropTypes.object
			};

			var defaultContextTypes = _defineProperty({}, CHANNEL, PropTypes.object);

			var userDefinedContextTypes = null;

			// Also retain the glamorous contexy channel
			Object.defineProperty(GlamorousComponent, 'contextTypes', {
				enumerable: true,
				configurable: true,
				set: function set(value) {
					userDefinedContextTypes = value;
				},
				get: function get() {
					if (userDefinedContextTypes) {
						return Object.assign({}, defaultContextTypes, userDefinedContextTypes);
					}
					return defaultContextTypes;
				}
			});

			function withComponent(newComp) {
				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				return glamorous(reactPrimitives[newComp], Object.assign({
					forwardProps: GlamorousComponent.forwardProps
				}, options)).apply(undefined, _toConsumableArray(GlamorousComponent.styles));
			}

			Object.assign(GlamorousComponent, getGlamorousComponentMetadata({
				comp: comp,
				styles: styles,
				rootEl: rootEl,
				forwardProps: forwardProps,
				displayName: displayName
			}), { withComponent: withComponent, isGlamorousComponent: true });

			return GlamorousComponent;
		}
	};
}

function getGlamorousComponentMetadata(_ref2) {
	var comp = _ref2.comp,
	    styles = _ref2.styles,
	    rootEl = _ref2.rootEl,
	    forwardProps = _ref2.forwardProps,
	    displayName = _ref2.displayName;

	var componentsComp = comp.comp ? comp.comp : comp;

	return {
		styles: when(comp.styles, styles),
		comp: componentsComp,
		rootEl: rootEl || componentsComp,
		forwardProps: when(comp.forwardProps, forwardProps),
		displayName: displayName || 'glamorous(' + getDisplayName(comp) + ')'
	};
}

function when(comp, prop) {
	return comp ? comp.concat(prop) : prop;
}

function getDisplayName(comp) {
	return typeof comp === 'string' ? comp : comp.displayName || comp.name || 'unknown';
}