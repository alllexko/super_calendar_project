// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// Attachements preview:
openerp.simbioz_theme.extend(function(instance) {

	// General preview click handler:
	openerp.simbioz_theme.preview_popup = function() {

		// Making new dialogue window:
		this.preview_dialog = new instance.web.Dialog(this, {
			title: _t("Attchment Preview"),
			min_width: '150px',
			min_height: '150px',
		}).open();

		// Removing download link:
		$(this).parent().removeAttr("href");

		// Adding preview class:
		$('.modal').addClass('oe_image_preview_modal');

		// Editing modal window:
		var image_url = $(this).attr('src');
		$('.modal-body').prepend('<img class="oe_image_preview" src="' + image_url + '"/>');
		$('.modal-footer').append('<a target="_blank" href="' + image_url 
			+'" class="oe_button oe_form_button">Download</a>');
	
	}

	// Binding to Odoo:
	instance.web.WebClient.include({

		// Binding dropdowns and attachements:
		start: function() {
			var result = this._super.apply(this, arguments);

			// Attachement previews popups:
			$(document).on('click', '.oe_dropdown_image:not(.oe_not_image)', openerp.simbioz_theme.preview_popup);
			$(document).on('click', '.oe_attachment.oe_preview img', openerp.simbioz_theme.preview_popup);

			// Done:
			return result;
		}
	});
});