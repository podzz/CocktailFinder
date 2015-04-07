PIXI.TresholdFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    this.uniforms = {
        thresold: {type: '1f', value: 0.80}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float thresold;',
        'uniform sampler2D uSampler;',
        'void main(void) {',
        ' gl_FragColor = texture2D(uSampler, vTextureCoord);',

        ' if (gl_FragColor.a < thresold)',
        '   gl_FragColor.a = 0. ;',
        '}'
    ];
};

PIXI.TresholdFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.TresholdFilter.prototype.constructor = PIXI.TresholdFilter;

/**
 * The pixel size used by the filter.
 *
 * @property size
 * @type Number
 */
Object.defineProperty(PIXI.TresholdFilter.prototype, 'size', {
    get: function() {
        return this.uniforms.thresold.value;
    },
    set: function(value) {
        this.uniforms.thresold.value = value;
    }
});