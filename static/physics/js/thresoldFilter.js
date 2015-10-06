require(['physics/pixi'], function (PIXI) {
    PIXI.TresholdFilter = function () {

        PIXI.AbstractFilter.call(this,
            null,
            [
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
            ].join('\n'),
            {}
        );
    };

    PIXI.TresholdFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
    PIXI.TresholdFilter.prototype.constructor = PIXI.TresholdFilter;
});
