PIXI.ColorMixerFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    this.uniforms = {
        r: {type: '1f', value: 0.0},
        g: {type: '1f', value: 255.0},
        b: {type: '1f', value: 255.0},
        a: {type: '1f', value: 255.0}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform float r;',
        'uniform float g;',
        'uniform float b;',
        'uniform float a;',
        'uniform sampler2D uSampler;',
        'void main(void) {',
        ' gl_FragColor = texture2D(uSampler, vTextureCoord);',

        '   gl_FragColor.r = r  / 255.;',
        '   gl_FragColor.g = g / 255.;',
        '   gl_FragColor.b = b / 255.;',
        '   gl_FragColor.a = a / 255.;',
        '}'
    ];
};

PIXI.ColorMixerFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.ColorMixerFilter.prototype.constructor = PIXI.ColorMixerFilter;

/**
 * The pixel size used by the filter.
 *
 * @property size
 * @type Number
 */
Object.defineProperty(PIXI.ColorMixerFilter.prototype, 'r', {
    get: function() {
        return this.uniforms.r.value;
    },
    set: function(value) {
        this.uniforms.r.value = value;
    }
});

Object.defineProperty(PIXI.ColorMixerFilter.prototype, 'g', {
    get: function() {
        return this.uniforms.g.value;
    },
    set: function(value) {
        this.uniforms.g.value = value;
    }
});

Object.defineProperty(PIXI.ColorMixerFilter.prototype, 'b', {
    get: function() {
        return this.uniforms.b.value;
    },
    set: function(value) {
        this.uniforms.b.value = value;
    }
});

Object.defineProperty(PIXI.ColorMixerFilter.prototype, 'a', {
    get: function() {
        return this.uniforms.a.value;
    },
    set: function(value) {
        this.uniforms.a.value = value;
    }
});