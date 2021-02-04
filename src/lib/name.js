import aria from 'aria-api';
// import constants from './constants';
// import {isContained} from './utils';

function getName(elem) {
    var aName = aria.getName(elem);

    // if(aName && isContained(elem))
    //     return (elem.matches(constants.noname)) ? '' : aName;

    return aName;
}

export default getName;