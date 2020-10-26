"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.line = exports.tracing = exports.huourl = exports.getToken = exports.cameraslist = exports.testData = void 0;

var _request = _interopRequireDefault(require("@/utils/request"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testData = function testData(data) {
  return (0, _request["default"])({
    url: "/api/web/env/monitor",
    method: 'get',
    params: data
  });
};

exports.testData = testData;

var cameraslist = function cameraslist(data) {
  return (0, _request["default"])({
    url: "/api/web/gov/cameras/".concat(data),
    method: 'get',
    params: {}
  });
};

exports.cameraslist = cameraslist;

var getToken = function getToken() {
  return (0, _request["default"])({
    url: '/ys7/lapp/token/get',
    method: 'post',
    params: {
      appKey: "1ea8a5815b1b4e86b6ae33123b893b77",
      appSecret: "d38c5fcdd75f20204a011dd714e48f8d"
    }
  });
};

exports.getToken = getToken;

var huourl = function huourl(data) {
  return (0, _request["default"])({
    url: '/ys7/lapp/live/address/limited',
    method: 'post',
    data: _qs["default"].stringify(data)
  });
};

exports.huourl = huourl;

var tracing = function tracing(data) {
  return (0, _request["default"])({
    url: '/api/no-auth/tracing',
    method: 'get',
    params: data
  });
};

exports.tracing = tracing;

var line = function line(data) {
  return (0, _request["default"])({
    url: "/api/web/env/monitor",
    method: 'get',
    params: data
  });
};

exports.line = line;