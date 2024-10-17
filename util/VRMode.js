// VR
import * as THREE from 'three';
import { VRButton } from '../../build/jsm/webxr/VRButton.js';
import {setFlyNonVRBehavior} from "./utilVR.js";

let moveCamera; // Move when a button is pressed 
let cameraHolder;
let cameraVR;

export function setVRMode(renderer, scene)
{
   cameraVR = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, .1, 1000 );

   //-- 'Camera Holder' to help moving the camera
   cameraHolder = new THREE.Object3D();
      cameraHolder.position.set(0, 1.5, 5.0);
   cameraHolder.add(cameraVR);
   scene.add( cameraHolder );
   
   document.body.appendChild( renderer.domElement );
   document.body.appendChild( VRButton.createButton( renderer ) );
   
   // controllers
   var controller1 = renderer.xr.getController( 0 );
      controller1.addEventListener( 'selectstart', onSelectStart );
      controller1.addEventListener( 'selectend', onSelectEnd );
   cameraVR.add( controller1 );

   return cameraVR;
}

export function moveVR(speed)
{
	if(moveCamera)
	{
		// Get Camera Rotation
		let quaternion = new THREE.Quaternion();
		quaternion = cameraVR.quaternion;

		// Get direction to translate from quaternion
		var moveTo = new THREE.Vector3(0.0, 0.0, -speed/10);
		moveTo.applyQuaternion(quaternion);

		// Move the camera Holder to the computed direction
		cameraHolder.translateX(moveTo.x);
		cameraHolder.translateY(moveTo.y);
		cameraHolder.translateZ(moveTo.z);
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




