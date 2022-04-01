import * as THREE from 'three';
import {setMaterial,
        cut,
        createCutMesh,
        createWallBasic,
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
   let bloco1 = createFourBasicWallRoom(14, 6, 3,  0, 6, 0, color.garageWalls);
   let doorMain = createCutMesh(1.2, 2, 2.50);
   bloco1 = cut(bloco1, doorMain, 4, 5, 0, false);   
   firstFloor.add(bloco1)

   // Front block
   let frontBlock = createFourBasicWallRoom(3.5, 4, 3,  0, 2, 0, color.garageWalls);   
   let doorTest = createCutMesh(0.80, 2, 2.50);
   frontBlock = cut(frontBlock, doorTest, 1.25, 0.5, 0, false);
   firstFloor.add(frontBlock);
   
   return firstFloor;
}
