// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// Running extensions:
openerp.simbioz_theme = function (instance) {
	
	// Running extensions:
	for (id in openerp.simbioz_theme.extensions) {
		try {
			openerp.simbioz_theme.extensions[id](instance);
		} catch(e) {
			console.error('Caught error during running Simbioz Theme extension:', e);
		}
	}

};

// Extending:
openerp.simbioz_theme.extensions = [];
openerp.simbioz_theme_extend = openerp.simbioz_theme.extend = function(code) {
	try {
		openerp.simbioz_theme.extensions.push(code);
	} catch(e) {
		console.error('Caught error during loading Simbioz Theme extension:', e);
	}
}