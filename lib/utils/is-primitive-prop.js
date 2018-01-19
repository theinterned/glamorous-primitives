import reactPrimitives from 'react-primitives';
import viewStylePropTypes from 'react-primitives/lib/web/View/ViewStylePropTypes';
import textStylePropTypes from 'react-primitives/lib/web/Text/TextStylePropTypes';
import imageStylePropTypes from 'react-primitives/lib/web/Image/ImageStylePropTypes';

// Get all the supported props for the primitive interface
var viewStyleProps = Object.keys(viewStylePropTypes);
var textStyleProps = Object.keys(textStylePropTypes);
var imageStyleProps = Object.keys(imageStylePropTypes);

var View = reactPrimitives.View,
    Text = reactPrimitives.Text,
    Image = reactPrimitives.Image,
    Touchable = reactPrimitives.Touchable,
    Animated = reactPrimitives.Animated;


var imageStyleComponents = [Animated.Image, Image];

var textStyleComponents = [Animated.Text, Text];

var viewStyleComponents = [Animated.View, View, Touchable];

export default function isPrimitiveProp(element, propName) {
	if (textStyleComponents.indexOf(element) > -1) {
		return textStyleProps.indexOf(propName) > -1;
	}

	if (viewStyleComponents.indexOf(element) > -1) {
		return viewStyleProps.indexOf(propName) > -1;
	}

	if (imageStyleComponents.indexOf(element) > -1) {
		return imageStyleProps.indexOf(propName) > -1;
	}

	return false;
}