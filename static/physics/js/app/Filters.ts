/// <reference path="lib/pixi.d.ts"/>
class Filters {
    private thresoldFilter: PIXI.AbstractFilter;

    constructor() {
        this.thresoldFilter = new CustomFilter([
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
        ]);
    }

    public getThresoldFilter() {
        return this.thresoldFilter;
    }
}

class CustomFilter extends PIXI.AbstractFilter {
    constructor(fragmentSource:string[]) {
        super(null, fragmentSource, {customUniform: {type: '1f', value: 0}});
    }
}

