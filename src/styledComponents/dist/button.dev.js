"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.button = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  /* Adapt the colors based on primary prop */\n  background: ", ";\n  color: ", ";\n\n  font-size: 1em;\n  border: 2px solid ", " ;\n  border-radius: 3px;\n  transition : background-color  1s, color 1s, border 1s;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var button = _styledComponents["default"].button(_templateObject(), function (props) {
  return props.theme.primary;
}, function (props) {
  return props.theme.text;
}, function (props) {
  return props.theme.text;
});

exports.button = button;