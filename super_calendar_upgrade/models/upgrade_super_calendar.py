# -*- coding: utf-8 -*-

import logging
from openerp import api, fields, models
import time
import datetime
from datetime import date, timedelta

_logger = logging.getLogger(__name__)


class UpgSuperCal(models.Model):

    _inherit = 'super.calendar'

    @api.multi
    def _deadlinetest(self):
        _logger.info('---------------self_res_id--------------- %s', self.res_id.user_id.name)
        _logger.info('---------------self--------------- %s', self)

        obj = self.res_id.date_deadline
        _logger.info('---------------obj--------------- %s', obj)
        usr = self.res_id.user_id.id
        _logger.info('---------------usr--------------- %s', usr)
        # dep = self.res_id.user_id.employee_ids.department_id.id
        # _logger.info('---------------dep--------------- %s', dep)
        proj = self.res_id.project_id.id
        _logger.info('---------------proj--------------- %s', proj)

        self.write({
                    'upgsucal': obj,
                    'users_id': usr,
                    'job_project': proj,
                    # 'department': dep,
                    })

    tesh_field = fields.Char('tesh', compute=_deadlinetest)

    job_priority = fields.Selection([('0', 'Low'), ('1', 'Normal'), ('2', 'High')], string='Priority',)
    users_id = fields.Many2one('res.users', string="User")
    upgsucal = fields.Date('Deadline', readonly=True)
    color = fields.Integer('Color Index')

    department = fields.Many2one(comodel_name="hr.department", string="Department", required=False, )
    timesheet_act_id = fields.One2many(comodel_name="project.task.work", inverse_name="id", string="Timesheet",
                                       required=False, )
    sla_lev = fields.Char('Service Levels')
    job_invoice = fields.One2many(comodel_name="account.invoice", inverse_name="id", string="Invoice")
    job_mail = fields.One2many(comodel_name="mail.mail", inverse_name="id", string="Mail")
    job_project = fields.Many2one(comodel_name="project.project", string='from Project')
    job_issue = fields.One2many(comodel_name="project.issue", inverse_name="id", string="Issue")

    job_hard = fields.Char('Hard from')
    job_warning = fields.Char('Warning')
    job_qual_test = fields.Char('IQ')




    # @api.one
    # def slalev(self):
    #     _logger.info('---------------self_slalev--------------- %s', self.res_id.id)
    #     x = self.env[''].search([('', '', '')])
    #     return 0

    # @api.multi
    # @api.depends('model_id')
    # def slalev(self):
    #     if model_id == ('|', 'project.task', 'project.issue'):
