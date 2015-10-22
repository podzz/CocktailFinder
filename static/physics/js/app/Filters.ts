/// <reference path="lib/pixi.d.ts"/>

class Filters {
    private thresoldFilter:PIXI.AbstractFilter;

    constructor() {
        this.thresoldFilter = new PIXI.AbstractFilter(null, [
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
        ], {customUniform: {type: '1f', value: 0}});
    }

    public getThresoldFilter() {
        return this.thresoldFilter;
    }
}


