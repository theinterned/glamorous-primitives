'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shouldForwardProperty;

var _isPrimitiveProp = require('./is-primitive-prop');

var _isPrimitiveProp2 = _interopRequireDefault(_isPrimitiveProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shouldForwardProperty(rootEl, propName) {
  return typeof rootEl !== 'string' && !(0, _isPrimitiveProp2.default)(rootEl, propName);
}