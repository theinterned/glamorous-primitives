'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = exports.withTheme = undefined;

var _createGlamorous = require('./constructor/create-glamorous');

var _createGlamorous2 = _interopRequireDefault(_createGlamorous);

var _splitProps = require('./constructor/split-props');

var _splitProps2 = _interopRequireDefault(_splitProps);

var _themeProvider = require('./figures/theme-provider');

var _themeProvider2 = _interopRequireDefault(_themeProvider);

var _withTheme = require('./figures/with-theme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _aliases = require('./utils/aliases');

var _aliases2 = _interopRequireDefault(_aliases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var glamorous = (0, _createGlamorous2.default)(_splitProps2.default);

exports.default = (0, _aliases2.default)(glamorous);
exports.withTheme = _withTheme2.default;
exports.ThemeProvider = _themeProvider2.default;