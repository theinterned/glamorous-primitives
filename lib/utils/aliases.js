'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactPrimitives = require('react-primitives');

var _reactPrimitives2 = _interopRequireDefault(_reactPrimitives);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  Native interfaces to be assigned. 
  https://code.facebook.com/posts/895897210527114/dive-into-react-native-performance/
 */

var aliases = ['Text', 'View', 'Image', 'Touchable'];

/**
  This function assigns the aliases to native glamorous constructor.
  Example - 
  const StyledText = glamorous.text({ color: 'red' })
  <StyledText>
    Hello World
  </StyledText>
**/
function assignAliases(glamorousConstructor) {
	Object.assign(glamorousConstructor, aliases.reduce(function (getters, alias) {
		var aliasLowerCase = alias.toLowerCase();
		getters[aliasLowerCase] = glamorousConstructor(_reactPrimitives2.default[alias]);
		return getters;
	}, {}));

	Object.assign(glamorousConstructor, aliases.reduce(function (comps, tag) {
		comps[tag] = glamorousConstructor[tag.toLowerCase()]();
		comps[tag].displayName = 'glamorous.' + tag;
		comps[tag].propsAreCssOverrides = true;
		return comps;
	}, {}));

	return glamorousConstructor;
}

exports.default = assignAliases;