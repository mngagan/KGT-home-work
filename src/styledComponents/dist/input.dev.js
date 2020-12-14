"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: 0.5em;\n  margin: 0.5em;\n  color: ", ";\n  background: ", ";\n  border: 1px solid;\n  border-radius: 3px;\n  transition : background-color  1s, color 1s;\n  width : 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var input = _styledComponents["default"].input(_templateObject(), function (props) {
  return props.theme.text;
}, function (props) {
  return props.theme.primary;
});

exports.input = input;