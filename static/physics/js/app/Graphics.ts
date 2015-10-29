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


    constructor(events:Events) {

        this.events = events;

        this.initRenderer();
    }

    private initRenderer():void {
        var width = Tools.GetWidth();
        var height = Tools.GetHeight();
        this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
        try {
            this.threeRenderer = new THREE.WebGLRenderer({alpha: true, antialiasing:true});
        } catch (error) {
            console.log('Your browser doesn\'t support webgl');
            return;
        }
        this.threeRenderer.setClearColor(0x000000, 0);
        this.threeRenderer.setSize(width, height);
        this.threeRenderer.sortObjects = true;
        this.camera.position.set(0,0,-10);
        this.camera.up = new THREE.Vector3(0, -1, 0);
        this.scene = new THREE.Scene();
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);
        this.RenderCocktailArtist('static/front/img/artist-sidebar.png');
        $("#renderer").append(this.threeRenderer.domElement);
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
            cube.position.set(0,1.5,0);
            locate.scene.add(cube);
        });
    }

    public RenderRotor(image_url, vector:b2Vec2) {
        var textureLoader = new THREE.TextureLoader();
        var locate = this;
        textureLoader.load(image_url, function (tex:THREE.Texture) {
            tex.needsUpdate = true;
            var material = new THREE.SpriteMaterial({map: tex });
            var cube = new THREE.Sprite(material);
            cube.scale.set(2,3.5,0);
            cube.position.set(vector.x - 0.4,-15,0);
            cube.renderOrder = 1;
            locate.scene.add(cube);

            var tl = new TimelineLite();
            var tl2 = new TimelineLite();

            tl.to(cube.position, 2, {y: vector.y});
            tl2.to(cube.material, 2, { rotation: -2.5});
            tl.to(cube.position, 2, {y: -15}, '+=6');
            tl2.to(cube.material,2,{rotation:0}, '+=6');
        });
    }

    public RenderCocktailArtist(image_url)
    {
        var textureLoader = new THREE.TextureLoader();
        var locate = this;
        textureLoader.load(image_url, function (tex:THREE.Texture) {
            tex.needsUpdate = true;
            var material = new THREE.SpriteMaterial({map: tex });
            var cube = new THREE.Sprite(material);
            cube.scale.set(8,3,0);

            cube.position.set(-9,0,0);
            cube.renderOrder = 0;
            cube.material.depthTest = false;
            locate.scene.add(cube);

            var tl = new TimelineLite();
            var tl2 = new TimelineLite();
            tl.to(cube.position, 2, {x: 0});
            tl.to(cube.position, 2, {y: -5, x:4}, '+=2');
            tl2.to(cube.scale, 2, {x: 6,y:2}, '+=4');
        });
    }
}