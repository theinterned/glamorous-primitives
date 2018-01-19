'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _brcast = require('brcast');

var _brcast2 = _interopRequireDefault(_brcast);

var _constants = require('../constants');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThemeProvider = function (_React$Component) {
	_inherits(ThemeProvider, _React$Component);

	function ThemeProvider() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ThemeProvider);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).call.apply(_ref, [this].concat(args))), _this), _this.broadcast = (0, _brcast2.default)(_this.props.theme), _this.setOuterTheme = function (theme) {
			_this.outerTheme = theme;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ThemeProvider, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return _defineProperty({}, _constants.CHANNEL, this.broadcast);
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (this.context[_constants.CHANNEL]) {
				this.setOuterTheme(this.context[_constants.CHANNEL].getState());
				this.broadcast.setState(this.getTheme());
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.context[_constants.CHANNEL]) {
				this.unsubscribe = this.context[_constants.CHANNEL].subscribe(this.setOuterTheme);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.theme !== nextProps.theme) {
				this.broadcast.setState(this.getTheme(nextProps.theme));
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.unsubscribe && this.unsubscribe();
		}
	}, {
		key: 'getTheme',
		value: function getTheme(passedTheme) {
			var theme = passedTheme || this.props.theme;
			return Object.assign({}, this.outerTheme, theme);
		}
	}, {
		key: 'render',
		value: function render() {
			return this.props.children ? _react2.default.Children.only(this.props.children) : null;
		}
	}]);

	return ThemeProvider;
}(_react2.default.Component);

ThemeProvider.childContextTypes = _defineProperty({}, _constants.CHANNEL, _propTypes2.default.object.isRequired);
ThemeProvider.contextTypes = _defineProperty({}, _constants.CHANNEL, _propTypes2.default.object);
ThemeProvider.propTypes = {
	theme: _propTypes2.default.object.isRequired,
	children: _propTypes2.default.node
};
exports.default = ThemeProvider;