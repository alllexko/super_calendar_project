// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// Mobile version selector:
openerp.simbioz_theme.extend(function(instance) {

	// Adding mobile viewport:
	$('head').append(
		'<meta name="viewport" content="width=device-width, initial-scale=0.85, maximum-scale=0.85, user-scalable=0">'
	);
	
	// Mobile version selector:
	function check_mobile_version() {

		// Applying mobile classes:
		if ($('.navbar-toggle').css('display') != 'none') {
			$("body").addClass('mobile');
			$('.submenu-toggle').prependTo('#oe_main_menu_navbar');
		} 

		// Removing mobile classes:
		else {
			$('.submenu-toggle').prependTo('#oe_main_menu_navbar > .navbar-collapse');
			$("body").removeClass('mobile');
		}
	}
	
	// Event handlers:
	$(window).resize(function() {
		check_mobile_version();
	});
	$(window).load(function() {
	    check_mobile_version();
	});
	
});