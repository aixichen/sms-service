'use strict';

exports.pagingParam = params => {
  const paging_param = {
    currentPage: params.currentPage ? exports.toInt(params.currentPage) : 1,
    pageSize: params.pageSize ? exports.toInt(params.pageSize) : 10,
  };

  return paging_param;
};
exports.toInt = str => {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
};

exports.stringToInt = str => {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return Number(str) || 0;
};

// 处理成功响应
exports.success = (ctx, result = null, messages = '请求成功', status = 201) => {
  ctx.body = {
    code: 0,
    message: messages,
    data: result,
  };
  ctx.status = status;
};

// 处理失败响应
exports.error = (ctx, codes, messages) => {
  ctx.body = {
    code: codes,
    message: messages,
  };
  ctx.status = codes;
};
