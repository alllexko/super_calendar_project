// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// Client-side LESS compiler binding:
openerp.simbioz_theme.extend(function(instance) {
	instance.web.WebClient.include({
		init: function() {
			this._super.apply(this, arguments);
			$(document).ready(function() {

				// Preparing LESS stylesheet:
				var compiled_styles = document.createElement('style');
				compiled_styles.type = 'text/css';
				compiled_styles.innerHTML = '';

				// Generating LESS:
				$('head').find('link[rel="stylesheet/less"]').each(function(i, stylesheet) {
					var link = $(stylesheet).attr('href');
					$.get(link, function(less_content) {
						less.render(less_content, {}, function(error, less_output) {
							if (less_output) {
								compiled_styles.innerHTML += less_output.css;
							} else {
								console.error('Error during parsing ' + link + ': ' + error);
							}
						});
					});
				});

				// Appending compiled to head:
				document.getElementsByTagName('head')[0].appendChild(compiled_styles);
			});
		}
	});
});
