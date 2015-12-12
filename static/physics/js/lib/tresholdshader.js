/**
 * Created by Francois on 12/12/2015.
 */

THREE.TresholdShader = {

    uniforms: {

        "tDiffuse": { type: "t", value: null },
        "treshold":        { type: "f", value: 0.9 }

    },

    vertexShader: [

        "varying vec2 vUv;",

        "void main() {",

        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"

    ].join( "\n" ),

    fragmentShader: [


        "uniform sampler2D tDiffuse;",
        "uniform float treshold;",

        "varying vec2 vUv;",


        "void main() {",

        "gl_FragColor = texture2D( tDiffuse, vUv );",
        "if(gl_FragColor.a > 0.05)",
        "gl_FragColor.a = 0.;",

        "}"

    ].join( "\n" )

};