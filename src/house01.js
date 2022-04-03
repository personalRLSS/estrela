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
import {createThirdFloor} from './thirdFloor.js'
import {color} from "./util/settings.js";

// VR
import { VRButton } from '../build/jsm/webxr/VRButton.js';
import {setFlyNonVRBehavior,
        updateFlyNonVRBehavior} from "../libs/util/utilVR.js";


var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.xr.enabled = true;
//renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
let moveCamera; // Move when a button is pressed 

window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
initDefaultBasicLight(scene, true, new THREE.Vector3(25, -20, 30), 100, 1024, 0.1, 200) ;	

// Main camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  //camera.position.set(7, -10, 3);
  camera.position.set(21, -12, 12);  
  camera.up.set( 0, 0, 1 );

//-- Create VR button and settings ---------------------------------------------------------------
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );

// controllers
var controller1 = renderer.xr.getController( 0 );
	controller1.addEventListener( 'selectstart', onSelectStart );
	controller1.addEventListener( 'selectend', onSelectEnd );
camera.add( controller1 );

//-- 'Camera Holder' to help moving the camera
let cameraHolder = new THREE.Object3D();
	cameraHolder.position.set(0.0, 1.0, 0.0);
cameraHolder.add(camera);
scene.add( cameraHolder );

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

//-- Third Floor ---------------------------------------------
let thirdFloor = createThirdFloor(color);
//thirdFloor.visible = false;
scene.add(thirdFloor);

// Use this to show information onscreen
var controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");

buildInterface();
animate();

//render();


function move()
{
	if(moveCamera)
	{
		// Get Camera Rotation
		let quaternion = new THREE.Quaternion();
		quaternion = camera.quaternion;

		// Get direction to translate from quaternion
		var moveTo = new THREE.Vector3(0, 0, -0.1);
		moveTo.applyQuaternion(quaternion);

		// Move the camera Holder to the computed direction
		cameraHolder.translateX(moveTo.x);
		cameraHolder.translateY(moveTo.y);
		cameraHolder.translateZ(moveTo.z);	
	}
   else
   {
      trackballControls.update(); // Enable mouse movements
   }
}

function onSelectStart( ) 
{
	moveCamera = true;
}

function onSelectEnd( ) 
{
	moveCamera = false;
}

function buildInterface()
{
  var gui = new GUI();
  gui.add(firstFloor, 'visible', true).name("First Floor");
  gui.add(secondFloor, 'visible', true).name("Second Floor");
  gui.add(thirdFloor, 'visible', true).name("Third Floor");
}

//-- Main loop -----------------------------------------------------------------------------------
function animate() 
{
	renderer.setAnimationLoop( render );
}

function render()
{
  stats.update(); // Update FPS
  move();
  //requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}
