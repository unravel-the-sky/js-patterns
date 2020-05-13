// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  trying out a couple of patterns from https://medium.com/javascript-in-plain-english/4-useful-javascript-design-patterns-you-should-know-b4e1404e3929
 */
// Strategy pattern:
var list = ['a', 'b'];
var strategies = {
  checkRole: function checkRole(val) {
    return val === 'registered';
  },
  checkGrade: function checkGrade(val) {
    return val > 1;
  },
  checkJob: function checkJob(val) {
    return list.includes(val);
  },
  checkType: function checkType(val) {
    return val === 'active';
  }
};

var Validator = function Validator() {
  var _this = this;

  _classCallCheck(this, Validator);

  this.cache = [];
  this.validationResult = true;

  this.add = function (val, method) {
    _this.cache.push(function () {
      return strategies[method](val);
    });
  };

  this.check = function () {
    _this.cache.forEach(function (element) {
      var validatorCheck = element;
      var data = validatorCheck();
      if (!data) _this.validationResult = false;
    });

    return _this.validationResult;
  };
};

var testData = {
  role: 'registered',
  grade: 3,
  job: 'a',
  type: 'active'
};

var compose = function compose() {
  var validator = new Validator();
  validator.add(testData.role, 'checkRole');
  validator.add(testData.grade, 'checkGrade');
  validator.add(testData.type, 'checkType');
  validator.add(testData.job, 'checkJob');
  var result = validator.check();
  return result;
};

var validationResult = compose();
console.log('validation result: ', validationResult); // PubSub pattern
// eventEmitter and stuff

var EventEmitter = function EventEmitter() {
  var _this2 = this;

  _classCallCheck(this, EventEmitter);

  this.events = {};

  this.on = function (eventName, callback) {
    _this2.events[eventName] ? _this2.events[eventName].push(callback) : _this2.events[eventName] = [callback];
  };

  this.trigger = function (eventName) {
    for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arg[_key - 1] = arguments[_key];
    }

    if (_this2.events[eventName]) {
      _this2.events[eventName].forEach(function (listener) {
        listener.apply(void 0, arg);
      });
    }
  };
};

var eventEmitter = new EventEmitter();
eventEmitter.on('success', function () {
  console.log('success event happened!');
});
eventEmitter.trigger('success'); // Decorator pattern

var Write = function Write() {
  _classCallCheck(this, Write);

  this.writeTurkish = function () {
    console.log('kebab kebab');
  };
};

var Decorator = function Decorator(old) {
  var _this3 = this;

  _classCallCheck(this, Decorator);

  this.oldWrite = old.writeTurkish;

  this.writeEnglish = function () {
    console.log('oh i would like a cup of tea');
  };

  this.newWrite = function () {
    _this3.oldWrite();

    _this3.writeEnglish();
  };
};

var newSkill = {
  writeEnglish: function writeEnglish() {
    return console.log('oh i would like a cup of tea');
  }
};
var smartGuy = new Write();
var decorator = new Decorator(smartGuy);
decorator.newWrite(); // mixin pattern:

Object.assign(Write.prototype, newSkill);
var sameGuy = new Write();
sameGuy.writeTurkish();
sameGuy.writeEnglish(); // another example
// https://alligator.io/js/using-js-mixins/

var swim = {
  setSwimProperties: function setSwimProperties(speed, direction) {
    this.speed = speed;
    this.direction = direction;
  },
  getSwimProperties: function getSwimProperties() {
    console.log("swimming ".concat(this.speed, " towards ").concat(this.direction));
  }
};

var Reptile = function Reptile(name) {
  _classCallCheck(this, Reptile);

  this.name = name;
};

var alligator = new Reptile('alligator');
Object.assign(Reptile.prototype, swim);
alligator.setSwimProperties('5 m/s', 'upstream');
alligator.getSwimProperties();
/**
 * Chain of Responsibility Pattern
 */
// this goes for trrrrond

var Chain = function Chain(fn) {
  _classCallCheck(this, Chain);

  this.fn = fn;

  this.setNext = function () {};

  this.run = function () {};
};

var applyDevice = function applyDevice() {};

var selectAddress = function selectAddress() {};

var selectChecker = function selectChecker() {};

var chainApplyDevice = new Chain(applyDevice);
var chainSelectAddress = new Chain(selectAddress);
var chainSelectChecker = new Chain(selectChecker);
chainApplyDevice.setNext(chainSelectAddress);
chainApplyDevice.run(); // yields error tho, wtf..
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54114" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map