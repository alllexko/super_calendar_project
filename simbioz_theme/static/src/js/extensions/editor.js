// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// JS editor rules applying:
openerp.simbioz_theme.extend(function(instance) { 'use strict';
	instance.web.WebClient.include({
		init: function() {
			this._super.apply(this, arguments);

			// Retrieving theme colors:
			var model = new instance.web.Model("simbioz_theme.config");
			var context = new instance.web.CompoundContext();
			model.call("get_css", [], {context: context}).then(function(result) {

				// Creating new stylesheet:
				var style = document.createElement("style");
				style.appendChild(document.createTextNode(""));
				document.head.appendChild(style);
				var sheet = style.sheet;

				// Custom CSS styles:
				if (result['styles']) {
					var custom_style = document.createElement("style");
					custom_style.appendChild(document.createTextNode(""));
					document.head.appendChild(custom_style);
					custom_style.innerHTML = result['styles'];
				}

				// General editor rules:
				var rules = [
					
					// Navbar rules:
					[
						[
							'#oe_main_menu_navbar .nav > li > *',
							'.openerp .modal-header button',
							'.openerp .modal-header',
						],
						{'color': result['header_color']}
					],
					[
						[
							'#oe_main_menu_navbar',
							'.openerp .modal-header',
						],
						{'background-color': result['header_background']}
					],
					[
						['.navbar-nav > .active > .oe_menu_toggler', '.navbar-nav .badge'],
						{'background-color': result['header_active_background']}
					],
					[
						['#oe_main_menu_navbar .nav > .active > a > span'],
						{'color': result['header_active_color']}
					],

					// Sidebar rules:
					[
						['.oe_leftbar'],
						{'background-color': result['sidebar_background']}
					],
					[
						['.oe_leftbar a'],
						{'color': result['sidebar_color']}
					],
					[
						['.oe_secondary_menu_section'],
						{'color': result['sidebar_section']}
					],

					// Link rules:
					[
						[
							'.openerp .oe_application a:not(.oe_kanban_colorpicker)',
							'.openerp .oe_view_manager table.oe_view_manager_header h2 a',
							'.openerp .oe_form_field_status li:not(.oe_active) > .label',
							'.openerp .oe_dropdown_menu > li > span',
							'.ui-datepicker.ui-widget-content button',
							'.oe_sidebar_add_attachment'
						],
						{'color': result['url_color']}
					],
					[
						['.openerp .oe_application a:hover'],
						{'color': result['url_hover']}
					],

					// Sidebar and form colors settings:
					[
						[
							'.openerp .badge',
							'.active > .oe_menu_leaf',
							'.dropdown .open > .dropdown-toggle',
							'.navbar-inverse .navbar-nav > .open > a',
							'.openerp .oe_tag_dark',
							'.oe_stat_button:hover',
							'.ui-menu-item .ui-state-focus',
							'.oe_form_dropdown_section li:hover',
							'.oe_form_dropdown_section li:hover a',
							'.oe_sidebar_add_attachment:hover',
							'.oe_dropdown_kanban li a:hover',
							'.oe_dashboard_tile.oe_kanban_global_click',
							'.oe_calendar_mini a:hover',
							'.ui-datepicker.ui-widget-content .ui-state-active',
							'.ui-datepicker.ui-widget-content .ui-state-hover',
							'.oe_form_field_progressbar .ui-progressbar-value',
						], 
						{'background-color': result['sidebar_active_background']}
					],
					[
						[
							'.oe_leftbar .active .oe_menu_text',
							'.openerp .oe_dropdown_menu > li > a:hover',
							'.openerp .oe_dropdown_menu > li > .oe_hidden_input_file:hover',
							'.openerp .oe_dropdown_menu > li > span:hover',
							'.ui-menu .ui-menu-item a.ui-corner-all:hover',
							'.ui-menu .ui-menu-item a.ui-state-focus',
							'.openerp .nav-pills > li.active .badge',
							'a.ui-state-default.ui-state-highlight.ui-state-active',
							'a.ui-state-hover',
							'.oe_dashboard_tile .tile_label',
							'.oe_calendar_mini a:hover',
							'.oe_form_field_progressbar span'
						],
						{'color': result['sidebar_active_color']}
					],
					[
						['.oe_notebook .ui-tabs-active'],
						{'border-bottom': '2.5px solid ' + 
							result['sidebar_active_background']}
					],

					// Button colors:
					[
						[
							'.oe_highlight', '.oe_follower', 
							'.openerp .oe_form_field_status li.oe_active',
							'.openerp .oe_form_field_status li.oe_active .arrow > span'
						],
						{
							'background-image': 'none',
							'background-color': result['button_background'],
							'color': result['button_color'],
						},
					],
					[
						['input:focus', 'textarea:focus', '.oe_searchview:focus', '.form-control:focus'],
						{'border-bottom': '2px solid ' + result['header_active_background']}
					]

				];

				// Disabled/Enabled rules:
				if (result['display_badges'] == false) 
					rules.push([
						['#oe_main_menu_navbar .badge'],
						{'display': 'none'}
					]);
				if (result['display_shortcuts'] == false)
					rules.push([
						[
							'.oe_shortcuts', '.oe_shortcuts_remove', '.oe_shortcut_dropdown',
							'.oe_shortcuts_toggle', '.oe_systray_shortcuts .oe_star_off'
						],
						{'display': 'none'}
					]);

				// Applying rules:
				rules.forEach(function(set) {
					var selectors = set[0].join();
					var rules = '';
					for (var key in set[1]) {
						rules += key + ':' + set[1][key] + '!important;\n';
					}
					sheet.insertRule(selectors + ' {\n' + rules + '}', 0);
				});
			});
		}
	});
});