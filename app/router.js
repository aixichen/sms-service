'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/v1/sms/smscallback/msg', controller.sms.smsCallbackMsg);
  router.post('/api/v1/sms/smscallback', controller.sms.smsCallback);
  router.resources('sms', '/api/v1/sms', controller.sms);
};
