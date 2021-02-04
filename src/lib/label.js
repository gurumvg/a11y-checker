import constants from './constants';
import {isElementAccessible, isInViewport, isLabelable, isContained} from './utils';

function getElementLabel(elem) {
    var elemTagName = elem.tagName.toLowerCase();

    if (isContained(elem))
        return getElementCumulativeLabel(elem);

    else if (isLabelable(elem)) {
        var strings = Array.prototype.map.call(elem.labels, function(label) {
            return getElementCumulativeLabel(label);
        });
        return strings.join(' ');        
    }

    return '';
}

function getElementCumulativeLabel(elem) {
    var children = elem.childNodes;
    var elemLabel = '';

    for (var i = 0; i < children.length; i++) {
        var childNode = children[i];

        if (childNode.nodeType === 3) //text node
            elemLabel += childNode.textContent;
        else if (isElementAccessible(childNode) && isInViewport(childNode))
            elemLabel += getElementCumulativeLabel(childNode);
    }

    return elemLabel;
}

function getLabel(elem) {

    if (isContained(elem))
        if(!elem.matches(constants.noNameAttrs))
            return '';

    return getElementLabel(elem);
}

export default getLabel;