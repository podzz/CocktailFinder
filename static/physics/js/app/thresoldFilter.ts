/// <reference path="../lib/pixi.d.ts"/>

class thresoldFilter extends PIXI.AbstractFilter
{
        constructor() {
            super.fragmentSrc = [
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
                ].join('\n')
        }
}
