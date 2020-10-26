"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.constantRoutes = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _admin = require("../utils/admin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var web = function web(name) {
  return function () {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/pc/".concat(name)));
    });
  };
};

var mobile = function mobile(name) {
  return function () {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/mobile/".concat(name)));
    });
  };
};

var width = (0, _admin.getScreen)();
var both = width == 1 ? mobile : web; // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题

var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
};

_vue["default"].use(_vueRouter["default"]);

var constantRoutes = [{
  path: '/',
  component: both('index')
}, {
  path: "/insurance",
  component: both('insurance')
}, {
  path: "/material",
  meta: {
    title: '农资'
  },
  component: both('material')
}, {
  path: "/finance",
  meta: {
    title: "金融"
  },
  component: both('finance')
}, {
  path: '/policy',
  component: both('policy')
}, {
  path: '/equipment',
  meta: {
    title: '终端设备'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/pc/equipment.vue'));
    });
  }
}, {
  path: '/equipment/:id',
  meta: {
    title: '终端设备'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/pc/equipment.vue'));
    });
  }
}, {
  path: '/about',
  component: both('about')
}, {
  path: '/hybrid',
  //供安卓使用
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/hybrid/index'));
    });
  }
}, {
  path: '/platform',
  meta: {
    title: '平台'
  },
  component: both('base')
}, {
  path: '/basentry',
  meta: {
    title: '基地入驻'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/baseentry'));
    });
  }
}, {
  path: '/platform/:id',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/pc/detail.vue'));
    });
  }
}, {
  path: '/insurancentry',
  meta: {
    title: '保险入驻'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/insurance'));
    });
  }
}, {
  path: '/people',
  meta: {
    title: '个人养殖户'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/people'));
    });
  }
}, {
  path: '/farm',
  meta: {
    title: '养殖场'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/farm'));
    });
  }
}, {
  path: '/financentry',
  meta: {
    title: '金融入驻'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/finance'));
    });
  }
}, {
  path: '/agricultural',
  meta: {
    title: '农资服务入驻'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/agricultural'));
    });
  }
}, {
  path: '/feed',
  meta: {
    title: '饲料企业入驻'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/feed'));
    });
  }
}, {
  path: '/vaccine',
  meta: {
    title: '疫苗企业入驻'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/vaccines'));
    });
  }
}, {
  path: '/veterinary',
  meta: {
    title: '兽医企业入驻'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/veterinary'));
    });
  }
}, {
  path: '/gov',
  meta: {
    title: '政府机构'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/newentry/gov'));
    });
  }
}, {
  path: '/news/:id',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/mobile/news'));
    });
  }
}, {
  path: '/mobiequip',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/mobile/equipment.vue'));
    });
  }
}, {
  path: '/mobiequip/:id',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/mobile/equipment.vue'));
    });
  }
}, {
  path: '/video',
  meta: {
    title: '九宫格摄像监控'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/multi/index'));
    });
  }
}, {
  path: '/trace/:id',
  meta: {
    title: '溯源'
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/multi/trace.vue'));
    });
  }
}];
exports.constantRoutes = constantRoutes;
var router = new _vueRouter["default"]({
  routes: constantRoutes
});
var _default = router;
exports["default"] = _default;