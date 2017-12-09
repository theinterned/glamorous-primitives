'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withTheme;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _platform = require('../injector/platform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function generateWarningMessage(componentName) {
	// eslint-disable-next-line max-len
	return 'glamorous warning: Expected component called "' + componentName + '" which uses withTheme to be within a ThemeProvider but none was found.';
}

function withTheme(ComponentToTheme) {
	var ThemedComponent = function (_React$Component) {
		_inherits(ThemedComponent, _React$Component);

		function ThemedComponent() {
			var _ref;

			var _temp, _this, _ret;

			_classCallCheck(this, ThemedComponent);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ThemedComponent.__proto__ || Object.getPrototypeOf(ThemedComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = { theme: {} }, _this.setTheme = function (theme) {
				return _this.setState({ theme: theme });
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(ThemedComponent, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				if (!this.context[_constants.CHANNEL]) {
					(0, _platform.checkThemeWrapper)(generateWarningMessage, ComponentToTheme);
					return;
				}

				this.setState({ theme: this.context[_constants.CHANNEL].getState() });
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (this.context[_constants.CHANNEL]) {
					this.unsubscribe = this.context[_constants.CHANNEL].subscribe(this.setTheme);
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				// cleanup subscription
				this.unsubscribe && this.unsubscribe();
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(ComponentToTheme, Object.assign({}, this.props, this.state));
			}
		}]);

		return ThemedComponent;
	}(_react2.default.Component);

	ThemedComponent.contextTypes = _defineProperty({}, _constants.CHANNEL, _propTypes2.default.object);

	return ThemedComponent;
}