'use strict';

module.exports = app => {
  const { STRING, INTEGER, JSON, DATE, UUID } = app.Sequelize;

  const SmsLog = app.model.define('sms_log', {
    id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: app.Sequelize.UUID1 },
    source_type: INTEGER(1),
    tpl_id: INTEGER(11),
    phone: INTEGER(11),
    sms_params: JSON,
    sms_status: INTEGER(1),
    sms_result: JSON,
    remark: STRING,
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true,
  });

  return SmsLog;
};
