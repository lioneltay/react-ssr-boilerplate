(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SecondComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
(function () {
  var enterModule = __webpack_require__(36).enterModule;

  enterModule && enterModule(module);
})();


// const ThirdComponent = asyncComponent({
//   loader: () => import("./ThirdComponent"),
// })
class SecondComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "SecondComponent"));
  }

  // @ts-ignore
  __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  }

}
;

(function () {
  var reactHotLoader = __webpack_require__(36).default;

  var leaveModule = __webpack_require__(36).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SecondComponent, "SecondComponent", "/Volumes/Dev/projects/hot-server-demo/src/components/SecondComponent.tsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(35)(module)))

/***/ })

}]);
//# sourceMappingURL=SecondComponent.chunk.js.map