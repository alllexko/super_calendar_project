#Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
#coding: utf-8
from openerp import http, api, SUPERUSER_ID
from openerp.http import request
from openerp.addons.web.controllers.main import Home

# Home pages variables:
class Home(Home):

	@http.route('/web/login', type='http', auth="none")
	def web_login(self, redirect=None, **kargs):
		cr, uid, context = request.cr, SUPERUSER_ID, request.context
		env = api.Environment(cr, 1, {})
		settings = env['simbioz_theme.config'].get_css()
		for key in settings:
			request.params[key] = settings[key]
		return super(Home, self).web_login(redirect, **kargs)