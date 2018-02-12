// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// Filters design for Odoo:
openerp.simbioz_theme.extend(function(instance) {

	// Web interface initializer:
	instance.web.WebClient.include({
		start: function() {
			this._super.apply(this, arguments);

			// Filters button:
			$(document.body).on("mousedown", ".oe_searchview_unfold_drawer", function(e) {
				e.stopPropagation();
				$('.oe_searchview_drawer .col-md-5').toggleClass('oe_visible');
			});

			// Hiding searchbar on away click:
			$(window).click(function() {
				if ($('.ui-menu:hover').length == 0) {
					if ($('.oe_searchview_drawer .col-md-5:hover').length == 0) {
						$('.oe_searchview_drawer .col-md-5').removeClass('oe_visible');;
					}
				}
			});
		}
	});
});