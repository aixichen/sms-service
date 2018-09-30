'use strict';

module.exports = app => {
  const { STRING, INTEGER, JSON, DATE, UUID } = app.Sequelize;

  const SmsCallbackLog = app.model.define('sms_callback_log', {
    id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: app.Sequelize.UUID1 },
    log_id: { type: UUID },
    sms_status: INTEGER(1),
    sms_result: JSON,
    remark: STRING,
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true,
  });

  return SmsCallbackLog;
};
