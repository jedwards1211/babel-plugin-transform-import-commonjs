"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    visitor: {
      CallExpression: function CallExpression(path) {
        var callee = path.get("callee");
        var args = path.get("arguments");

        if (callee.type !== 'Import' || !args.length) return;

        path.scope.rename("require");
        path.replaceWith(buildPromise(args[0].node));
      }
    }
  };
};

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildPromise = (0, _babelTemplate2.default)("\n  new Promise(function(resolve) {\n    resolve(require($0));\n  }.bind(this));\n");