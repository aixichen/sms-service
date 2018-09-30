'use strict';

const Controller = require('egg').Controller;

class SmsController extends Controller {
  async create() {
    try {
      const { tpl_id, phone, source_type, sms_params } = this.ctx.request.body;
      const data = [];
      if (typeof tpl_id === 'number') {
        data.tpl_id = tpl_id;
      } else {
        throw new Error('tpl_id参数错误');
      }

      if (typeof phone !== 'number' || (phone + '').length !== 11) {
        throw new Error('phone参数错误');
      }
      const source_type_map = new Map([[ 1, true ]]);
      if (!(source_type_map.has(source_type))) {
        throw new Error('source_type参数错误');
      }

      if (sms_params) {
        data.sms_params = sms_params;
      } else {
        data.sms_params = [];
      }
      const result = await this.ctx.service.sms.create(phone, source_type, data);

      this.ctx.helper.success(this.ctx, result);
    } catch (error) {
      this.ctx.helper.error(this.ctx, 404, error.message);
    }
  }
  async smsCallback() {
    try {
      const input = this.ctx.request.body;
      await this.ctx.service.sms.smsCallback(input);
      this.ctx.body = {
        result: 0,
        errmsg: 'OK',
      };
    } catch (error) {
      this.ctx.helper.error(this.ctx, 404, error.message);
    }
  }
}

module.exports = SmsController;
