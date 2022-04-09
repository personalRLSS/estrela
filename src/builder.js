import * as THREE from 'three';
import Stats from       '../build/jsm/libs/stats.module.js';
import GUI from '../libs/util/dat.gui.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initDefaultSpotlight,
        lightFollowingCamera,
        InfoBox,
        onWindowResize,
        degreesToRadians} from "../libs/util/util.js";
import {color} from "./util/settings.js";

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
let clock = new THREE.Clock();
var renderer = initRenderer();    // View function in util/utils
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(new THREE.Color("lightgray"))
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
var light = initDefaultSpotlight(scene, new THREE.Vector3(0, 0, 30)); // Use default light

// Main camera
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, -5, 0);    
  camera.up.set( 0, 0, 1 );

  // Enable mouse rotation, pan, zoom etc.
let trackballControls = new TrackballControls( camera, renderer.domElement );

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 7 );
scene.add( axesHelper );

builder();
animate();

function createCylinder(material, radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded = null)
{
  var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
  var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;

  return object;
}

function builder()
{
   let diameter = 0.05
   let size = 10
   let seg = 20
   let spacing = 0.3
   let numberOfTubes = 3
   let c1, guardaCorpo = new THREE.Object3D();
   var mat = new THREE.MeshPhongMaterial({color:"rgb(205,127,50)"});

   let i = 0
   for(; i < spacing * numberOfTubes; i+=spacing )
   {
      c1 = createCylinder(mat, diameter, diameter, size, seg, seg)
      c1.translateZ(i)
      guardaCorpo.add(c1)
   }
   c1 = createCylinder(mat, diameter*2, diameter*2, size, seg, seg)
   c1.translateZ(spacing * numberOfTubes + spacing/4)
   guardaCorpo.add(c1)

   // Barras verticais
   let dist = 2
   let barrasVerticais = new THREE.Object3D();
   let sizeV = numberOfTubes*spacing
   for(i = 0; i <= size; i+=dist )
   {
      c1 = createCylinder(mat, diameter, diameter, numberOfTubes*spacing, seg, seg)
      c1.translateY(i)
      c1.rotateX(degreesToRadians(90))
      barrasVerticais.add(c1)
   }
   barrasVerticais.translateZ(sizeV/2)
   barrasVerticais.translateY(-size/2)

   guardaCorpo.add(barrasVerticais)
   guardaCorpo.rotateZ(degreesToRadians(90))
   scene.add(guardaCorpo)

}

//-- Main loop -----------------------------------------------------------------------------------
function animate() 
{
	renderer.setAnimationLoop( render );
}

function render()
{
   stats.update(); // Update FPS
   lightFollowingCamera(light, camera) // Makes light follow the camera
   trackballControls.update(); // Enable mouse movements
   renderer.render(scene, camera) // Render scene
}
