/// <reference path="../lib/pixi.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomFilter = (function (_super) {
    __extends(CustomFilter, _super);
    function CustomFilter(fragmentSource) {
        _super.call(this, null, fragmentSource, { customUniform: { type: '1f', value: 0 } });
    }
    return CustomFilter;
})(PIXI.AbstractFilter);
//# sourceMappingURL=ThresoldFilter.js.map