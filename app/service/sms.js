'use strict';
const Service = require('egg').Service;
const UuidV1 = require('uuid/v1');

class SmsService extends Service {

  async create(phone, source_type, data) {
    const insert_data = {};
    insert_data.id = UuidV1();
    insert_data.tpl_id = data.tpl_id;
    insert_data.phone = phone;
    insert_data.source_type = source_type;
    insert_data.sms_params = JSON.stringify(data.sms_params);
    this.sendSms(phone, data.tpl_id, data.sms_params, '', insert_data.id);
    return await this.ctx.model.SmsLog.create(insert_data);
  }

  sendSms(phone, tpl_id, params, smsSign = '', ext = '') {
    const params_arr = Object.values(params);
    const QcloudSms = require('qcloudsms_js');
    const appid = '1400060304';
    const appkey = '0b434cd1fe2482e43ee1bc9a60899d8a';
    const qcloudsms = QcloudSms(appid, appkey);
    const ssender = qcloudsms.SmsSingleSender();
    return ssender.sendWithParam(86, phone, tpl_id, params_arr, smsSign, '', ext, this.callback);
  }

  callback(err, res, resData) {
    resData.id = '';
  }

  async smsCallback(data) {
    data.forEach(temp => {
      const temp_data = {};
      temp_data.id = UuidV1();
      temp_data.log_id = '';
      if (temp.report_status === 'SUCCESS') {
        temp_data.sms_status = 1;
      } else {
        temp_data.sms_status = 2;
      }
      temp_data.sms_result = JSON.stringify(temp);
      this.ctx.model.SmsCallbackLog.create(temp_data);
    });
    return [];
  }
}

module.exports = SmsService;
