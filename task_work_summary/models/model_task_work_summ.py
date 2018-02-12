# -*- coding: utf-8 -*-


import logging
from openerp import models, fields, api

_logger = logging.getLogger(__name__)


class TaskWorkSummary(models.Model):
    _name = 'taskwork.summary'

    name = fields.Char(string="Name")
    task_work_set_ids = fields.One2many(comodel_name="taskwork.set", inverse_name="task_work_set_id", required=False, )


class TaskWorkSet(models.Model):
    _name = "taskwork.set"

    task_work_set_id = fields.Many2one(comodel_name="taskwork.summary", string="Task Work Set", required=False, )
    name = fields.Char(string="Description")


class ProjectTaskSummary(models.Model):
    _inherit = 'project.task'

    task_work_set_id = fields.Many2one(comodel_name="taskwork.summary", string="Task Work Set", required=False, )

    @api.one
    def taskworkset(self):
        # _logger.info('---------------quantity--------------- %s', self.task_work_set_id)
        for line in self.task_work_set_id.task_work_set_ids:
            # _logger.info('---------------record--------------- %s', line)
            # _logger.info('----------------line.name------------ %s', line.name)
            self.env['project.task.work'].create({'name': line.name, 'task_id': self.id, 'user_id': self.user_id.id,
                                              'hours': 00})
