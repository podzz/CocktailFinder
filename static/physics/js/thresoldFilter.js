function TresholdFilter() {

    PIXI.AbstractFilter.call(this,"",
        "precision lowp float;\n" +
        "varying vec2 vTextureCoord;\n" +
        "varying vec4 vColor;\n" +
        "uniform sampler2D uSampler;\n" +
        "void main(void) {\n" +
        "gl_FragColor = texture2D(uSampler, vTextureCoord);\n" +
        "if (gl_FragColor.a < 0.5)\n" +
        "gl_FragColor.a = 0.;\n" +
        "}"
    )


    this.passes = 1;
};

TresholdFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
TresholdFilter.prototype.constructor = TresholdFilter;

/**
 * The pixel size used by the filter.
 *
 * @property size
 * @type Number
 */
Object.defineProperties(TresholdFilter.prototype,
    {
        thresold: {
            get: function () {
                return this.uniforms.thresold.value;
            },
            set: function (value) {
                this.uniforms.thresold.value = value;
            }
        }
    });