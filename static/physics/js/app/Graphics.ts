/// <reference path="lib/pixi.d.ts"/>
/// <reference path="lib/jquery.d.ts"/>
/// <reference path="lib/three.d.ts"/>
/// <reference path="lib/liquidfun.d.ts"/>
/// <reference path="lib/greensock.d.ts"/>
/// <reference path="Events.ts"/>
/// <reference path="Tools.ts"/>

class Graphics {
    private events:Events;

    // Renderer
    public threeRenderer:THREE.WebGLRenderer;
    public camera:THREE.PerspectiveCamera;

    // Geometry
    public geometry:THREE.BufferGeometry;
    public currentVertex:number = 0;
    public buffer:THREE.Mesh;

    public scene:THREE.Scene;
    public recipeScene:THREE.Scene;

    public composer:THREE.EffectComposer;


    constructor(events:Events) {

        this.events = events;

        this.initRenderer();
    }

    private initRenderer():void {
        var width = Tools.GetWidth();
        var height = Tools.GetHeight();
        this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
        try {
            this.threeRenderer = new THREE.WebGLRenderer({alpha: true});
        } catch (error) {
            console.log('Your browser doesn\'t support webgl');
            return;
        }

        this.threeRenderer.setClearColor(0x000000, 0);
        this.threeRenderer.setSize(width, height);
        this.threeRenderer.setPixelRatio(window.devicePixelRatio);
        this.threeRenderer.sortObjects = true;
        this.threeRenderer.autoClear = false;
        this.threeRenderer.gammaInput = true;
        this.threeRenderer.gammaOutput = true;

        this.camera.up = new THREE.Vector3(0, -1, 0);
        this.camera.position.set(0,0,-10);

        this.reset();

        $("#renderer").append(this.threeRenderer.domElement);
    }

    public reset():void
    {
        this.scene = new THREE.Scene();
        this.scene.add(this.camera);

        this.recipeScene = new THREE.Scene();
        this.recipeScene.add(this.camera);
        /*var DirectionalLight = new THREE.DirectionalLight(0xffffff, 10);
        DirectionalLight.position.set(0,1,0);
        DirectionalLight.lookAt(this.scene.position);
        this.scene.add(DirectionalLight);*/

        this.camera.lookAt(this.scene.position);

        this.composer = new THREE.EffectComposer(this.threeRenderer);

        var renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        var hblur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
        hblur.uniforms['h'].value = 1 / 1000;
        this.composer.addPass(hblur);

        var vblur = new THREE.ShaderPass(THREE.VerticalBlurShader);
        vblur.uniforms['v'].value = 1 / 1000;
        vblur.renderToScreen = true;
        this.composer.addPass(vblur);

       // var treshold = new THREE.ShaderPass(THREE.TresholdShader);
        //treshold.renderToScreen = true;
        //this.composer.addPass(treshold);

        //var copypass = new THREE.ShaderPass(THREE.CopyShader);
        //copypass.renderToScreen = true;
        //this.composer.addPass(copypass);
    }



    public RenderRecipe(image_url) {
        var textureLoader = new THREE.TextureLoader();
        var locate = this;
        textureLoader.load(image_url, function (tex:THREE.Texture) {
            tex.needsUpdate = true;
            var material = new THREE.SpriteMaterial({map: tex });
            var cube = new THREE.Sprite(material);
            cube.renderOrder = 1;
            cube.scale.set(3,5,0);
            cube.material.opacity = 0.7;
            cube.position.set(0,1.5,0);
            locate.recipeScene.add(cube);
        });
    }

    public RenderRotor(image_url, vector:b2Vec2, time:number) {
        var textureLoader = new THREE.TextureLoader();
        var locate = this;
        textureLoader.load(image_url, function (tex:THREE.Texture) {
            tex.needsUpdate = true;
            var material = new THREE.SpriteMaterial({map: tex });
            var cube = new THREE.Sprite(material);
            //cube.scale.set(2,3.5,0); // Valeur de base, qui ne masquait pas totalement le liquide
            cube.scale.set(2.25,3.94,0);
            cube.position.set(vector.x - 0.4,-15,0);
            cube.renderOrder = 1;
            locate.recipeScene.add(cube);

            var tl = new TimelineLite();
            var tl2 = new TimelineLite();

            tl.to(cube.position, 2, {y: vector.y - 0.2});
            tl2.to(cube.material, 2, { rotation: -2.5});
            tl.to(cube.position, 2, {y: -15}, time);
            tl2.to(cube.material,2,{rotation:0}, time);
        });
    }
}