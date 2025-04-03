import * as THREE from 'three';
import {TrackballControls} from './build/jsm/controls/TrackballControls.js';
import {FlyControls} from './build/jsm/controls/FlyControls.js';
import {OBJLoader} from './build/jsm/loaders/OBJLoader.js';
import {MTLLoader} from './build/jsm/loaders/MTLLoader.js';
import {initRenderer, 
   initDefaultBasicLight,
   InfoBox,
   onWindowResize,
   getMaxSize,
   setMaterial,
   createGroundPlaneXZ} from './util/util.js';
import GUI from './util/dat.gui.module.js';
import { setVRMode,
         moveVR,
         updateCameraPosition} from "./util/VRMode.js";

//-- MUDAR AQUI, PRINCIPALMENTE O layout ----------------------------------

var path = './exportObj/';
var layout = 'layout4';

//-------------------------------------------------------------------------


var scene = new THREE.Scene();    // Create main scene
let clock = new THREE.Clock();
var renderer = initRenderer();    // View function in util/utils

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.xr.enabled = true;
renderer.shadowMap.enabled = true;

let flyMode = false;

initDefaultBasicLight(scene, true, new THREE.Vector3(15, 35, 25), 100, 1024, 0.1, 400, 0.8) ;	

// Secondary light
let secLight = new THREE.DirectionalLight('white', 0.2);
   secLight.position.copy(new THREE.Vector3(-10, 50, -30));
scene.add(secLight);

// Main camera
let cameraFly = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
  //cameraFly.position.copy(camera.position); 
  cameraFly.position.set(1.5, 0.8, 3);
  cameraFly.up.set( 0, 1, 0 );

  // Enable mouse rotation, pan, zoom etc.
let trackballControls = new TrackballControls( cameraFly, renderer.domElement );

let flyCamera = new FlyControls( cameraFly, renderer.domElement );
   flyCamera.movementSpeed = 0.5;
   flyCamera.domElement = renderer.domElement;
   flyCamera.rollSpeed = 0.2;

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 7 );
scene.add( axesHelper );

window.addEventListener( 'resize', function(){onWindowResize(cameraFly, renderer)}, false );

// Create the loading manager
const manager = new THREE.LoadingManager( () => {
   const loadingScreen = document.getElementById( 'loading-screen' );
   loadingScreen.classList.add( 'fade-out' );
   loadingScreen.addEventListener( 'transitionend', (e) => {
     const element = e.target;
     element.remove();  
   });  
 });

//-- Create VR button and settings ---------------------------------------------------------------

// VR Camera
var cameraVR = setVRMode(renderer, scene, cameraFly)
    //cameraVR.position.copy(camera.position);


// create base plan
let basePlane = createGroundPlaneXZ(10, 10, 10, 10, 0, -0.01, 0.5)
    basePlane.material = setMaterial(null,'./assets/intertravado.jpg', 15, 15);
scene.add(basePlane);

//-- CREATING THE EQUIRECTANGULAR MAP ---------------------------------------------------------------------
const textureLoader = new THREE.TextureLoader();
let textureEquirec = textureLoader.load( './assets/panorama.jpg' );
	textureEquirec.mapping = THREE.EquirectangularReflectionMapping; // Reflection as default
	textureEquirec.encoding = THREE.sRGBEncoding;
// Set scene's background as a equirectangular map
scene.background = textureEquirec;

// Use this to show information onscreen
var controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");


loadOBJFile(path, layout, true, 2.0);

buildInterface();
animate();

function loadOBJFile(modelPath, modelName, visibility, desiredScale)
{
  var mtlLoader = new MTLLoader( manager );
  mtlLoader.setPath( modelPath );
  mtlLoader.load( modelName + '.mtl', function ( materials ) {
      materials.preload();

      var objLoader = new OBJLoader( manager );
      objLoader.setMaterials(materials);
      objLoader.setPath(modelPath);
      objLoader.load( modelName + ".obj", function ( obj ) {
         obj.name = modelName;
         obj.visible = visibility;
         obj.traverse( function (child)
         {
            if( child.isMesh ){
               child.castShadow = true;
               //child.receiveShadow = true;               
            }
            if( child.material ) 
            {
               child.material.side = THREE.DoubleSide; 
            }
         });

         var obj = normalizeAndRescale(obj, desiredScale);
         var obj = fixPosition(obj);

         scene.add ( obj );
         //assetManager[modelName] = obj;
      }, null, null);
  }, null, null);
}

// Normalize scale and multiple by the newScale
function normalizeAndRescale(obj, newScale)
{
  var scale = getMaxSize(obj); 
  obj.scale.set(newScale * (1.0/scale),
                newScale * (1.0/scale),
                newScale * (1.0/scale));
  return obj;
}

function fixPosition(obj)
{
  // Fix position of the object over the ground plane
  var box = new THREE.Box3().setFromObject( obj );
  console.log("Mínimo:" + box.max.x);
  if(box.min.y > 0)
    obj.translateY(-box.min.y);
  else
    obj.translateY(-1*box.min.y);
   obj.translateX(-box.max.x/2);
   obj.translateZ(-box.max.z/2);   
   return obj;
}


function buildInterface()
{
 
   // Interface
   var controls = new function ()
   {
      this.speed = flyCamera.movementSpeed;      
      this.flyMode = false;

      this.onFlyMode = function(){
         flyMode = this.flyMode;
         if(flyMode)
            axesHelper.visible = false;
         else
            axesHelper.visible = true;        
      };
      this.onUpdateSpeed = function(){
         flyCamera.movementSpeed = this.speed;
       };      
   }; 

   var gui = new GUI();
   gui.add(controls, 'flyMode', true)
      .onChange(function() { controls.onFlyMode() })
      .name("Fly Mode"); 
   gui.add(controls, 'speed', 0.01, 1.0)
      .name("Fly Speed")
      .onChange(function(e) { controls.onUpdateSpeed() });       
}

//-- Main loop -----------------------------------------------------------------------------------
function animate() 
{
	renderer.setAnimationLoop( render );
}

let justEntered = true;
function render()
{
  //stats.update(); // Update FPS

   if(!renderer.xr.isPresenting)
   {
      if(!justEntered)
         justEntered = true;
      if(flyMode)
      {
         flyCamera.update(clock.getDelta()); 
         renderer.render(scene, cameraFly) // Render scene
      }
      else
      {
         trackballControls.update(); // Enable mouse movements
         renderer.render(scene, cameraFly) // Render scene
      }
  }
  else
  {
     if(justEntered)
     {
        updateCameraPosition(cameraFly)
        flyCamera.movementSpeed = 0.2;
        justEntered = false;
     }
     moveVR( flyCamera.movementSpeed); 
     renderer.render(scene, cameraVR) // Render scene
  }
}
