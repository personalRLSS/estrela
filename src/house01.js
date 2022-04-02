import * as THREE from 'three';
import Stats from       '../build/jsm/libs/stats.module.js';
import GUI from '../libs/util/dat.gui.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initDefaultBasicLight,
        InfoBox,
        onWindowResize} from "../libs/util/util.js";
import {createFirstFloor} from './firstFloor.js'
import {createSecondFloor} from './secondFloor.js'
import {color} from "./util/settings.js";


var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
initDefaultBasicLight(scene, true, new THREE.Vector3(25, -20, 30), 100, 1024, 0.1, 200) ;	

// Main camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  //camera.position.set(7, -10, 3);
  camera.position.set(21, -12, 12);  
  camera.up.set( 0, 0, 1 );

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );
   //trackballControls.target.set(7,0,3);
   trackballControls.target.set(10,4,3);   

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

//-- First Floor ---------------------------------------------
let firstFloor = createFirstFloor(color);
scene.add(firstFloor);

//-- Second Floor ---------------------------------------------
let secondFloor = createSecondFloor(color);
scene.add(secondFloor);


// Use this to show information onscreen
var controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");

buildInterface();
render();

function buildInterface()
{
  var gui = new GUI();
  gui.add(firstFloor, 'visible', true).name("First Floor");
  gui.add(secondFloor, 'visible', true).name("Second Floor");
  //gui.add(thirdFloor, 'visible'), true).name("Third Floor");
}

function render()
{
  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}
