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

import {setMaterial,
   createThreeBasicWallRoom,
   createFourBasicWallRoom,
   updateObject,
   cut,
   createWall,
   createCutMesh,
   createWallBasic,
   createFloor,
   createWallTextured,
   createGuardaCorpo} from './util/util.js'

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

function builder()
{
   let floor = createFloor(14.5, 19, 0.20,   0, 0, 3,  color.secondFloorMat,10,10); 
   scene.add(floor)

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
