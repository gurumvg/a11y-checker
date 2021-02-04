import constants from './constants';

function isButtonElement(elem) {
    var elemTagName = elem.tagName && elem.tagName.toLowerCase();
    var elemTypeName = elem.getAttribute && elem.getAttribute('type') && elem.getAttribute('type').toLowerCase();
    var elemRoleName = elem.getAttribute && elem.getAttribute('role') && elem.getAttribute('role').toLowerCase();

    //TODO - check if it is not aria-hidden ?
    if (elemTagName === 'button' || elemTypeName === 'button' || elemRoleName === 'button')
        return true;
}    

// check if element is accessible for AT
function isElementAccessible(elem) {
    if (!elem) return false;

    if (elem.nodeType === 8 || elem.nodeType === 3) //ignore comment or text node (?)
        return false;

    if (elem.matches(constants.hidden))
        return false;

    
    var elemStyle = window.getComputedStyle(elem);
    if (elemStyle.display === "none")
        return false;

    if (elemStyle.visibility === "hidden")
        return false;

    return true; //default
}

function isInViewport(elem) {
    var rect = elem.getBoundingClientRect();
    var flagg = true;

    flagg = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );

    //above code doesn't work for iframe documents
    if(flagg)
        flagg = (elem.className.indexOf('sr-only') === -1);

    return flagg;

}

function isActionable(elem) {
    var selector = constants.actionable.join(',');
    return elem.matches(selector);
}

function isLabelable(elem) {
    var selector = constants.labelable.join(',');
    return elem.matches(selector);
}

function isContained(elem) {
    var selector = constants.contained.join(',');
    return elem.matches(selector);
}

function sanitize(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().trim();
}

export {isButtonElement, isElementAccessible, isInViewport, isActionable, isLabelable, isContained, sanitize};