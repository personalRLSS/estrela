import * as THREE from 'three';
import Stats from       '../build/jsm/libs/stats.module.js';
import GUI from '../libs/util/dat.gui.module.js';
import { CSG } from '../../libs/other/CSGMesh.js' 
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
   initDefaultBasicLight,
        lightFollowingCamera,
        onWindowResize,
        degreesToRadians} from "../libs/util/util.js";

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

import {color} from "./util/settings.js";


var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
let clock = new THREE.Clock();
var renderer = initRenderer();    // View function in util/utils
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(new THREE.Color("lightgray"))
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
let light = initDefaultBasicLight(scene); // Create a basic light to illuminate the
// Main camera
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, -20, 0);    
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
   let geometry = new THREE.BoxGeometry(10, 0.10, 10).toNonIndexed();

  // let box = new THREE.Box3().setFromObject( geometry );
  // let size = new THREE.Vector3();
   // let size = geometry.width;
   geometry.computeBoundingBox()
   let x = geometry.boundingBox.max.x - geometry.boundingBox.min.x
   let z = geometry.boundingBox.max.z - geometry.boundingBox.min.z
   console.log(x)
   let esquadria = 0.5

   let cutBox = new THREE.BoxGeometry(x - esquadria, 2, z - esquadria);
   //cut.translate(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0); // To avoid conflict with the axeshelper
   let obj = new THREE.Mesh(geometry);
   let cutMesh = new THREE.Mesh(cutBox);
   
   let baseCSG = CSG.fromMesh(obj)  
   let cutCSG = CSG.fromMesh(cutMesh)   
   let csgObject = baseCSG.subtract(cutCSG) // Execute subtraction
   
   let auxMat = new THREE.Matrix4();
   let output = CSG.toMesh(csgObject, auxMat)
   
   output.material = new THREE.MeshLambertMaterial({color:"rgb(255,0,0)"});
   // output.castShadow = true;
   // output.receiveShadow = true;  
   scene.add(output);

   geometry = new THREE.PlaneGeometry(10, 10);
   let glass = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color:"rgb(50,50,50)", transparent: true, opacity: 0.5}));
   glass.rotateX(degreesToRadians(90))
   scene.add(glass)

   // let cutBox = new THREE.BoxGeometry(9.5, 2, 9.5);
   //cut.translate(moveX+sizeX/2.0, moveY+sizeY
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
