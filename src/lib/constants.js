const constants = {};

constants.inputs  = ['text', 'password', 'textarea', 'email', 'number', 'url', 'string', 'search'];

constants.contained = [
	'a',
	'button',
	'[role="button"]',
	'[type="button"]',
];

constants.noNameAttrs = [
	'[aria-label]',
	'[aria-labelledby]',
	'[title]',
	'[placeholder]',
	'[alt]',
];

constants.actionable = [
	'a',
	'input',
	'button',
	'[role="button"]',
	'[tabindex="0"]',
];

constants.labelable = [
	// 'button',
	'input:not([type="hidden"])',
	'keygen',
	'meter',
	'output',
	'progress',
	'select',
	'textarea',
];

constants.hidden = [
	'[type="hidden"]',
	'[aria-hidden="true"]',
];

export default constants;