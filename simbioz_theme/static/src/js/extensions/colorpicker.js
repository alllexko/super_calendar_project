// Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
// Colorpicker widget for Odoo:
openerp.simbioz_theme.extend(function(instance) {
	jscolor.dir = '/simbioz_theme/static/lib/jscolor/';

	// Binding widgets:
    instance.web.form.widgets.add('color', 'instance.web.form.FieldColor');
    instance.web.search.fields.add('color', 'instance.web.search.CharField');

    // Widget itself:
    instance.web.form.FieldColor = instance.web.form.FieldChar.extend({
        template: 'FieldColor',
        widget_class: 'oe_form_field_color',

        is_syntax_valid: function () {
            var $input = this.$('input');
            if (!this.get("effective_readonly") && $input.size() > 0 && $input.val()) {
                var val = $input.val();
                var isOk = /^#[0-9A-F]{6}$/i.test(val);
                if (!isOk) {
                    return false;
                }
                try {
                    this.parse_value(this.$('input').val(), '');
                    return true;
                } catch (e) {
                    return false;
                }
            }
            return true;
        },

        render_value: function () {
            var show_value = this.format_value(this.get('value'), '');
            if (!this.get("effective_readonly")) {
                var $input = this.$el.find('input');
                $input.val(show_value);
                $input.css("background-color", show_value)
                jscolor.init(this.$el[0]);
            } else {
                this.$(".oe_form_char_content").text(show_value);
                this.$('div').css("background-color", show_value)
            }
        }
    });

    // Colorpicker initializer:
    instance.web.FormView.include({
        to_edit_mode: function () {
            this._super();
            jscolor.init(this.$el[0]);
        }
    });
});