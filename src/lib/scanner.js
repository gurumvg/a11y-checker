import {isButtonElement, isElementAccessible, isActionable, isContained, sanitize} from './utils';
import getLabel from './label';
import getName from './name';
import constants from './constants';

function scanner(elem, violationsList) {
    if (!elem) return;

    if (elem.hasChildNodes()) {
        var children = elem.childNodes;

        for (var i = 0; i < children.length; i++) {
            var childNode = children[i];

            if(!childNode) continue;

            var childNodeTagName = childNode.tagName && childNode.tagName.toLowerCase();
            var childNodeTypeName = (childNode.getAttribute && childNode.getAttribute('type') && childNode.getAttribute('type').toLowerCase()) || 'text';

            if (!isElementAccessible(childNode)) {
                continue;
            } else if (!isActionable(childNode))
                scanner(childNode, violationsList); //recurse
            else {
                //TODO - skip this for LABEL node
                var oAName = getName(childNode);
                var oLabel = getLabel(childNode);
                
                var aName = sanitize(oAName);
                var label = sanitize(oLabel);
                var isMatching = false;

                if (childNodeTagName === 'input' && constants.inputs.indexOf(childNodeTypeName) !== -1) {
                    if (label && !aName)
                        isMatching = true;

                } else if (isContained(childNode)) {
                    if ((!label && aName) || (label && !aName))
                        isMatching = true;
                }

                if (!isMatching) {
                    if (aName && aName.indexOf(label) !== -1) {
                        isMatching = true;
                    } else if (label === aName) {
                        isMatching = true;
                    }
                }


                if (!isMatching) {
                    violationsList.push({
                        //type: 'Label In Name violation',
                        message: 'Accessible name "' + oAName + '" does not match with the label "' + oLabel + '"',
                        element: childNode
                    });
                }

            }

        }

    }

}

export default scanner;