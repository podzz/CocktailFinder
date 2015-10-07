/// <reference path="../lib/pixi.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var thresoldFilter = (function (_super) {
    __extends(thresoldFilter, _super);
    function thresoldFilter() {
        _super.prototype.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'uniform float uSize;',
            'uniform sampler2D uSampler;',
            'void main(void) ',
            '{',
            '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
            '   if (gl_FragColor.a < 0.5)',
            '       gl_FragColor.a = 0.;',
            '}'
        ].join('\n');
    }
    return thresoldFilter;
})(PIXI.AbstractFilter);
//# sourceMappingURL=thresoldFilter.js.map