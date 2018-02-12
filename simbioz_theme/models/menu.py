#Part of the Simbioz Theme by Paul Marlow, 2016-2017. All rights reserved.
#coding: utf-8
import operator
from openerp import _, models, api, fields
from openerp.tools.safe_eval import safe_eval
from openerp.exceptions import Warning as UserError
from openerp.osv import expression


# Web shortcuts:
class WebShortcut(models.Model):
    _name = 'simbioz_theme.shortcut'

    name = fields.Char('Shortcut Name', size=64)
    menu_id = fields.Many2one('ir.ui.menu', ondelete='cascade')
    user_id = fields.Many2one('res.users', 'User Ref.', required=True,
                              ondelete='cascade', select=True,
                              default=lambda obj, cr, uid, context: uid)

    #_sql_constraints = [
    #    ('shortcut_unique', 'unique(menu_id,user_id)',
    #     'Shortcut for this menu already exists!'),
    #]

    @api.model
    def get_user_shortcuts(self, user_id):
        shortcuts = self.search([('user_id', '=', user_id)])
        res = []
        for shortcut in shortcuts.filtered('menu_id'):
            _name = shortcut.menu_id.name_get()
            _name = _name[0][1] if len(_name) else ''
            _id = shortcut.menu_id.id
            res.append(
                {
                    'id': shortcut.id,
                    'name': _name,
                    'menu_id': (_id, _name)
                }
            )
        return res


# Mixed:
class IrUiMenu(models.Model):
    _inherit = 'ir.ui.menu'

    needaction = fields.Boolean(
        help='Set to False to disable needaction for specific menu items',
        default=True)
    needaction_domain = fields.Text(
        help='If your menu item needs a different domain, set it here. It '
        'will override the model\'s needaction domain completely.')


    # Needaction:
    # NOT USED YET!
    @api.multi
    def get_navbar_needaction_data(self):
        result = {}
        for this in self:
            count_per_model = {}
            action_menu = self.env['ir.ui.menu'].browse([])
            if not this.needaction:
                continue
            for menu_id, needaction in self.search(
                    [('id', 'child_of', this.ids)])._filter_visible_menus()\
                    .get_needaction_data().iteritems():
                if needaction['needaction_enabled']:
                    menu = self.env['ir.ui.menu'].browse(menu_id)
                    model = menu._get_needaction_model()
                    count_per_model[model] = max(
                        count_per_model.get(model),
                        needaction['needaction_counter']
                    )
                    if needaction['needaction_counter'] and not action_menu:
                        action_menu = menu
            result[this.id] = {
                'count': sum(count_per_model.itervalues()),
            }
            if action_menu:
                result[this.id].update({
                    'action_id': action_menu.action and
                    action_menu.action.id or None,
                    'action_domain': action_menu._eval_needaction_domain(),
                })
        return result

    @api.multi
    def get_needaction_data(self):
        result = super(IrUiMenu, self).get_needaction_data()
        for this in self.sorted(operator.itemgetter('parent_left'), True):
            data = result[this.id]
            if data['needaction_enabled'] or this.needaction and\
               this.needaction_domain:
                if not this.needaction:
                    data['needaction_enabled'] = False
                    data['needaction_counter'] = 0
                    continue
                if this.needaction_domain and\
                   this._get_needaction_model() is not None:
                    data['needaction_enabled'] = True
                    data['needaction_counter'] = this._get_needaction_model()\
                        .search_count(this._eval_needaction_domain())
            if not data['needaction_enabled'] and this.needaction and\
               this.child_id and this.parent_id and this.parent_id.parent_id:
                # if the user didn't turn it off, show counters for submenus
                # but only from the 3rd level (the first that is closed by
                # default)
                for child in this.child_id:
                    data['needaction_counter'] += result.get(child.id, {}).get(
                        'needaction_counter', 0)
                data['needaction_enabled'] = bool(data['needaction_counter'])
        return result

    @api.multi
    def _eval_needaction_domain(self):
        self.ensure_one()
        eval_context = {
            'uid': self.env.user.id,
            'user': self.env.user,
        }
        if self.needaction_domain:
            return safe_eval(self.needaction_domain, locals_dict=eval_context)
        model = self._get_needaction_model()
        if model is None or not hasattr(model, '_needaction_domain_get'):
            return []
        return expression.AND([
            safe_eval(
                'domain' in self.action._fields and self.action.domain or '[]',
                locals_dict=eval_context),
            model._needaction_domain_get(),
        ])

    @api.multi
    def _get_needaction_model(self):
        if not self.action:
            return None
        model = None
        if 'res_model' in self.action._fields:
            model = self.action.res_model
        elif 'model_id' in self.action._fields:
            model = self.action.model_id.model
        if model in self.env.registry:
            return self.env[model]
        return None

    @api.constrains('needaction_domain')
    @api.multi
    def _check_needaction_domain(self):
        for this in self:
            try:
                expression.AND([
                    this._eval_needaction_domain(),
                    expression.TRUE_DOMAIN,
                ])
            except Exception as ex:
                raise UserError(
                    _('Cannot evaluate %s to a search domain:\n%s') %
                    (self.needaction_domain, ex))


    # Shorcuts:
    @api.multi
    def unlink(self):
        res = super(IrUiMenu, self).unlink()
        shortcuts = self.env['simbioz_theme.shortcut'].search([('menu_id', '=', False)])
        for shortcut in shortcuts:
            shortcut.unlink()
        return res
