import * as THREE from 'three';
import {setMaterial,
        createFourBasicWallRoom} from './util/util.js'


export function createFirstFloor(color)
{
   let firstFloor = new THREE.Object3D();

   // create base plane
   var basePlaneGeometry = new THREE.PlaneGeometry(28, 28);
   basePlaneGeometry.translate(7, 7, -0.04); // To avoid conflict with the axeshelper
   var basePlaneMaterial = setMaterial(null,color.basePlaneTexture, 7, 7);
   var basePlane = new THREE.Mesh(basePlaneGeometry, basePlaneMaterial);
      basePlane.receiveShadow = true;
   // add the plane to the scene
   firstFloor.add(basePlane);   

   // create garage floor
   var planeGeometry = new THREE.PlaneGeometry(14, 12);
   planeGeometry.translate(7.0, 6.0, -0.02); // To avoid conflict with the axeshelper
   var planeMaterial = setMaterial(null,color.garageFloorTexture, 10, 10);
   var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;
   // add the plane to the scene
   firstFloor.add(plane);   

   // Bloco traseiro
   createFourBasicWallRoom(firstFloor, 14, 6, 3,  0, 6, 0, setMaterial(color.garageWalls));
   createFourBasicWallRoom(firstFloor, 3.5, 4, 3,  0, 2, 0, setMaterial(color.garageWalls));   

   return firstFloor;
}
