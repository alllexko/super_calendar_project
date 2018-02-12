// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// Sidebar hide for Odoo:
openerp.simbioz_theme.extend(function(instance) { 'use strict';

	// Saving state in localStorage:
	var lstr = window.localStorage;

	// Initial loading:
	instance.web.WebClient.include({
		start: function() {
			var self = this;
			this._super.apply(this, arguments);

			// Adding button:
			var bar = '<span class="icon-bar"></span>';
			$('#oe_main_menu_navbar > .navbar-collapse').prepend(
				'<button type="button" class="submenu-toggle">' + bar + bar +'</button>');

			// Adding button action:
			$('.submenu-toggle').on('click', function() {
				if ($('.oe_leftbar').hasClass('oe_minimized')) {
					$('.oe_leftbar').removeClass('oe_minimized');
					lstr.setItem('simbioz_theme_sidebar', 'opened');
				} else {
					$('.oe_leftbar').addClass('oe_minimized');
					lstr.setItem('simbioz_theme_sidebar', 'closed');
				}
			});

			// Minimizing on start:
			$('.oe_leftbar').addClass('oe_minimized');
		} 
	});

	// Using user preference:
	var check_startup = function() {
		var result = this._super.apply(this, arguments);
		if (lstr.getItem('simbioz_theme_sidebar') == 'opened') {
			$('.oe_leftbar').removeClass('oe_minimized');
		}
		return result;
	};
	instance.web.View.include({start: check_startup});
	if (instance.mail != undefined) {
		instance.mail.MessageCommon.include({start: check_startup});
	}


});