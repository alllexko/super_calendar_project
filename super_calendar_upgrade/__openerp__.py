# -*- coding: utf-8 -*-

{
    'name': 'Upgrade Super Calendar',
    'version': '8.0.1',
    'category': 'calendar',
    'summary': '',
    'author': 'Alexandr Konopko',
    'website': 'http://baspar.eu',
    'license': 'AGPL-3',
    'depends': [
        'super_calendar',
        'hr',
        'project_sla',
        'account',
        'mail',
        'project',
        'project_issue',
        'project_timesheet',

    ],
    'data': [
        # 'views/upgrade_super_calendar.xml',
        'views/overwrit_super_calendar_view.xml',
        'views/kanban_super_calendar.xml'
    ],
}
