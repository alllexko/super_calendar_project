// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
openerp.simbioz_theme.extend(function(instance) { 'use strict';
	instance.web.View.include({
		start: function() {
			var result = this._super.apply(this, arguments);

			// Scroll to top button:
			if ($('.oe_scroll_to_top').length == 0)
				$('body').append('<img src="/simbioz_theme/static/src/img/up.png"/ class="oe_scroll_to_top">');
			$('.oe_scroll_to_top').on('click', function() {
				$('.oe_view_manager_body').scrollTo(0, 100);
			});
			$('.oe_view_manager_body').on('scroll', function() {
				if ($(this).scrollTop() > 100)
					$('.oe_scroll_to_top').css('opacity', 1).css('visibility', 'visible');
				else $('.oe_scroll_to_top').css('opacity', 0).css('visibility', 'hidden');
			});

			// Filter drawer horizontal fixed position:
			$('.oe_view_manager_body').smartscroll(function() {
				$('.oe_searchview_drawer_container').css('margin-left', $(this).scrollLeft());
			});

			// Reflowing upper menu:
			window.dispatchEvent(new Event('resize'));

			// Done:
			return result;
		}
	});

	instance.web.FormView.include({
		start: function() {
			var result = this._super.apply(this, arguments);
			var self = this;
			result.done(function() {
				if (self.$('.oe_view_nocontent').length > 0 && self.$el.parents('.oe_popup_form').length == 0) {
					self.$('.oe_form_nosheet').attr('style', 'background-color:inherit!important');
				}
			});
			return result;
		}
	});

	instance.web.WebClient.include({
		init: function() {
			this._super.apply(this, arguments);
			if (instance.point_of_sale != undefined) {
				instance.point_of_sale.PosBaseWidget.include({
					init: function() {
						var result = this._super.apply(this, arguments);
						$('.openerp_webclient_container').css('position', 'static');
						return result;
					}
				});
			}
		}
	});

	instance.web.DateTimeWidget.include({
		start: function() {
			var result = this._super.apply(this, arguments);
			$.datepicker.setDefaults({
				yearRange: ((new Date()).getFullYear() - 100) + ':' + ((new Date()).getFullYear() - '' + 100)
			});
			return result;
		}
	});

	// Navbar fade-in:
	var display_menu = function() {
		var result = this._super.apply(this, arguments);
		$('#oe_main_menu_placeholder').css('opacity', 1);
		return result;
	};
	instance.web.View.include({start: display_menu});
	if (instance.mail != undefined) {
		instance.mail.MessageCommon.include({start: display_menu});
	}

	// Import style:
	if (instance.web.DataImport) {
		instance.web.DataImport.include({
			start: function() {
				var result = this._super.apply(this, arguments);
				$('.oe_application').css('background', 'white');
				$('#oe_main_menu_placeholder').css('opacity', 1);
				return result;
			}
		});
	}

	// Extending mail_url:
	if (instance.mail_url) {
		var add_hide_button = function() {
			var upload_button = $('<button class="fa fa-upload" aria-hidden="true"></button>'),
				result = this._super.apply(this, arguments),
				form = this.$('.oe_add');
			form.hide().before(upload_button);
			upload_button.on('click', function() {
				form.toggle();
			});
			return result;
		}
		instance.web.form.FieldMany2ManyBinaryMultiFiles.include({
			start: add_hide_button
		});
		instance.mail.ThreadComposeMessage.include({
			display_attachments: add_hide_button
		});
	}

	// Custom filters badge animation:
	$(document).on('click', '.oe_searchview_custom_private', function() {
		var parent = $(this).parent();
		if (parent.hasClass('badge')) 
			parent.removeClass('badge');
		else
			parent.addClass('badge');
		$(this).removeClass('badge');
	});

	// Popup search colors:
	instance.web.form.SelectCreatePopup.include({
		setup_search_view: function() {
			var result = this._super.apply(this, arguments);
			self.$('.oe_popup_list_pager').parent().css('background', '#ededed');
			return result;
		}
	});

	// Pager fix:
	instance.web.ListView.include({
		start: function() {
			var result = this._super.apply(this, arguments);
			result.done(function() {
				$('.oe_form .oe_view_manager_header').each(function(i, header) {
					var $header = $(header);
					if ($header.find('.oe_list_pager').length > 0) {
						$header.css('display', 'table');
						$header.find('.oe_view_manager_switch').css('display', 'none');
					}
				});
			});
			return result;
		}
	});

});
