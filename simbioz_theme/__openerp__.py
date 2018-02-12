#Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
#coding: utf-8
{
	'name': 'Simbioz Backend Theme',
	'category': 'Themes/Backend',
	'website': 'http://simbioz.ua/',
	'author': 'Paul Marlow',
	'version': '1.0.0',
	'summary': 'Design excellence for Odoo masses.',
	'images': [
		'static/description/main_1.png',
		'static/description/main_screenshot.png',
	],
	'installable': True,
	'data': [
		'views/login.xml',
		'views/assets.xml',
		'views/editor.xml',
		'security.xml'
	],
	'qweb': [
		'static/src/qweb/*',
	],
	'application': True,
	'installable': True,
	'license': 'Other proprietary',
	'currency': 'EUR',
	'price': 249.0,
}
