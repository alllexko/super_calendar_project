#Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
#coding: utf-8
from openerp import models, fields, api
from HTMLParser import HTMLParser

# Default settings:
DEFAULTS = {
	'display_badges':            True,
	'display_shortcuts':         True,
	'header_background':         '#392B6A',
	'header_color':              '#FFFFFF',
	'header_active_background':  '#FD8500',
	'header_active_color':       '#FFFFFF',
	'sidebar_background':        '#F0EEEE',
	'sidebar_color':             '#4C4C4C',
	'sidebar_section':           '#4C4165',
	'sidebar_active_background': '#FD8500',
	'sidebar_active_color':      '#FFFFFF',
	'url_color':                 '#006699',
	'url_hover':                 '#FD8500',
	'button_background':         '#006699',
	'button_color':              '#FFFFFF',
	'styles':                    '',
	'background':                None
}

# Editor palette:
class ThemeWizard(models.TransientModel):
	_inherit = 'res.config.settings'
	_name = 'simbioz_theme.editor'

	# Blank theme checker:
	default_first_start = fields.Boolean(
		default=True, default_model='simbioz_theme.config')
	# If this wizard wasn't set - defaults will not be set
	# and JS rules would use values from DEFAULTS dictionary.

	# Custom login background:
	default_background = fields.Binary(
		string='Custom login background',
		default=DEFAULTS['background'],
		default_model='simbioz_theme.config')

	# Interface addons:
	default_display_badges = fields.Boolean(
		string='Display needaction badges?',
		default=DEFAULTS['display_badges'],
		default_model='simbioz_theme.config')
	default_display_shortcuts = fields.Boolean(
		string='Display shortcut stars?',
		default=DEFAULTS['display_shortcuts'],
		default_model='simbioz_theme.config')

	# Setting skin tuning to default:
	@api.multi
	def reset_all_settings(self):
		for field in DEFAULTS:
			setattr(self, 'default_' + field, DEFAULTS[field])
		return self.execute()

	# Refreshing page after settings saved:
	def execute(self, *args, **kargs):
		super(ThemeWizard, self).execute(*args, **kargs)
		return {
			'type': 'ir.actions.client',
			'tag':  'reload'
		}

# Iterating to apply fields:
exclude = ['display_shortcuts', 'display_badges', 'background']
for key in DEFAULTS:
	value = DEFAULTS[key]
	if not key in exclude:
		setattr(ThemeWizard, 'default_' + str(key), fields.Char(
			default=DEFAULTS[key],
			string=key.replace('_', ' ').capitalize(),
			default_model='simbioz_theme.config'
		))

# Editor settings container:
class ThemeSettings(models.Model):
	_name = 'simbioz_theme.config'
	first_start = fields.Char()

	def get_css(self, cr, uid, context=None):
		env = api.Environment(cr, 1, {})
		pool = env['simbioz_theme.config']
		settings = pool.default_get(DEFAULTS.keys() + ['first_start'])
		if 'first_start' in settings:
			result = settings
		else:
			result = DEFAULTS
		background = pool.default_get(['background'])['background']
		if not background or background == 'background':
			background = '/simbioz_theme/static/src/img/background.png'
			result['background_isbase64'] = False
		else:
			result['background_isbase64'] = True
		result['background_url'] = background
		return result

# Updating second class containers:
for field in DEFAULTS:
	setattr(ThemeSettings, field, fields.Char(default=field))
setattr(ThemeSettings, 'styles', fields.Text(default=DEFAULTS['styles']))
