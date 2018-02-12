// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// JS editor rules applying:
openerp.simbioz_theme.extend(function(instance) {


	// Web interface initializer:
	instance.web.ListView.include({
		load_list: function() {
			var self = this;
			self._super.apply(this, arguments);
			var one2many_length = self.$el.parents('.oe_form_field.oe_form_field_one2many').length;
			var scrollArea = self.$el.parents('.oe_view_manager.oe_view_manager_current').find('.oe_view_manager_wrapper .oe_view_manager_body')[0];
			if(scrollArea &&  one2many_length == 0){
				self.$el.find('table.oe_list_content').each(function(){
					$(this).stickyTableHeaders({scrollableArea: scrollArea})
				});
			}
		},			

			/*
			// Adding "New Item" to form inline elements:
			var elem = '.oe_form_editable .oe_view_manager_view_list tr:not(.processed) .oe_form_field_one2many_list_row_add';
			$.initialize(elem, function() {
				var parent = $(this).closest('tbody');
				if ($(parent).find('tr[data-id]').length > 0 || $(parent).find('td[data-field]').length > 0) {
					var row = $(this).closest('tr');
					$(row).clone(true).addClass('processed').prependTo(parent);
				}
			});

			// Adding row number header and footer:
			var elem_head = '.oe_list_header_columns > th > .oe_list_record_selector';
			$.initialize(elem_head, function() {
				$(this).parent().after('<th width="1">#</th>');
			});

			// Adding row number to lines:
			var elem_body = 'tbody > tr > .oe_list_record_selector';
			var number = 0;
			$.initialize('.oe_list_content', function() {number = 0;});
			$.initialize(elem_body, function() {
				if ($(this).parent().attr('data-id')) {
					number = number + 1;
					$(this).after('<td width="1">' + number + '</td>');
				}
				else $(this).after('<td width="1"></td>');
			});

			// Header and footer fix fix:
			$.initialize('.oe_group_header', function() {
				$(this).append('<td></td>');
			});

			$.initialize('.oe_list_content > tfoot > tr', function() {
				$(this).append('<td></td>');
			});*/
	});

});