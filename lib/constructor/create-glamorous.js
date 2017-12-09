'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createGlamorous;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = require('react-primitives');

var _reactPrimitives2 = _interopRequireDefault(_reactPrimitives);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('../constants');

var _getStyles = require('../utils/get-styles');

var _getStyles2 = _interopRequireDefault(_getStyles);

var _prepareStyles = require('./prepare-styles');

var _prepareStyles2 = _interopRequireDefault(_prepareStyles);

var _platform = require('../injector/platform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createGlamorous(splitProps) {
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
			var styles = (0, _prepareStyles2.default)(unpreparedStyles);

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


						if (this.context[_constants.CHANNEL]) {
							this.setTheme(theme ? theme : this.context[_constants.CHANNEL].getState());
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
						if (this.context[_constants.CHANNEL] && !this.props.theme) {
							this.unsubscribe = this.context[_constants.CHANNEL].subscribe(this.setTheme);
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

						var theme = (0, _platform.freeze)(this.state.theme);

						var fullStyles = (0, _getStyles2.default)(GlamorousComponent.styles, props, styleOverrides, theme, this.context);

						return _react2.default.createElement(GlamorousComponent.comp, Object.assign({}, toForward, {
							ref: this.onRef,
							style: fullStyles.length > 0 ? fullStyles : null
						}));
					}
				}]);

				return GlamorousComponent;
			}(_react.Component);

			GlamorousComponent.comp = comp;

			GlamorousComponent.propTypes = {
				innerRef: _propTypes2.default.func,
				theme: _propTypes2.default.object
			};

			var defaultContextTypes = _defineProperty({}, _constants.CHANNEL, _propTypes2.default.object);

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

				return glamorous(_reactPrimitives2.default[newComp], Object.assign({
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