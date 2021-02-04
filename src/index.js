import scanner from './lib/scanner';



function scan(elem) {
	const violationsList = [];

    scanner(elem || document.body, violationsList); //kick-off

    console.group("Label In Name violations: " + violationsList.length);
    for (var v = 0; v < violationsList.length; v++) {
        console.group('');
        console.log(violationsList[v].element);
        console.warn(violationsList[v].message);
        console.groupEnd('');
    }
    console.groupEnd();
}

export default {
	scan: scan
};
