// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// Keyboard shortcuts for Odoo:
openerp.simbioz_theme.extend(function(instance) {
	instance.web.WebClient.include({
		init: function() {
			this._super.apply(this, arguments);
			$.ctrl = function(key, callback, args) {
			    $(document).keydown(function(e) {
			        if(!args) args=[]; // IE barks when args is null 
			        if((e.keyCode == key.charCodeAt(0) || e.keyCode == key) && (e.metaKey || e.ctrlKey)) {
			            callback.apply(this, args);
			            return false;
			        }
			    });        
			};

			// Edit the current object:
			$.ctrl('E', function() {
				$('.oe_form_button_edit').trigger('click');
			});

			// Save the current object:
			$.ctrl('S', function() {
				$('.oe_form_button_save').trigger('click');
			});

			// Cancel the current object edition:
			$.ctrl('Z', function() {
				if (confirm('Are you sure want to undo changes?')) {
					$('.oe_form_button_cancel').trigger('click');
				}
			});

			// New object:
			$.ctrl('N', function() {
				$('.oe_form_button_create').trigger('click');
				$('.oe_list_add').trigger('click');
			});

			// Previous object:
			// Key: UP.
			$.ctrl('38', function() {
				$('.oe_pager_group a[data-pager-action="previous"]').trigger('click');
			});

			// Next object:
			// Key: Down.
			$.ctrl('40', function() {
				$('.oe_pager_group a[data-pager-action="next"]').trigger('click');
			});

			// Delete the current object
			// Backspace.
			$.ctrl('8', function() {
				$('.oe_sidebar_action_a').each(function() {
					var button_text = $(this).text().trim();
					if (button_text == openerp.web._t('Delete')) {
						$(this).trigger('click');
					}
				});
			});

			// Duplicate the current object:
			$.ctrl('D', function() {
				$('.oe_sidebar_action_a').each(function() {
					var button_text = $(this).text().trim();
					if (button_text == openerp.web._t('Duplicate')) {
						$(this).trigger('click');
					}
				});
			});
		}
	});
});