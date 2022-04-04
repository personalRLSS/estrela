import * as THREE from 'three';
import { setMaterial,
         cut,
         createCutMesh,
         createWallBasic,
         createFourBasicWallRoom} from './util/util.js'

import {degreesToRadians,
        createGroundPlane} from "../libs/util/util.js";

import { door,
         doorMain} from './util/settings.js'

function buildStairs(x, y, z, color)
{
   let stair = new THREE.Object3D();
   let geometry, step;
   for(let i = 0; i < 16; i++)
   {
      geometry = new THREE.BoxGeometry(x, y, z);
      geometry.translate(i*x, 0, i*z); // To avoid conflict with the axeshelper
      step = new THREE.Mesh(geometry, setMaterial(color));
      step.castShadow = true;
      stair.add(step);
   }
   return stair;
}

export function createFirstFloor(color)
{
   let firstFloor = new THREE.Object3D();

   // create base plane

   // var basePlaneGeometry = new THREE.PlaneGeometry(28, 28);
   //    basePlaneGeometry.rotateX(degreesToRadians(-90));
   //    basePlaneGeometry.translate(7, -0.04, -7); // To avoid conflict with the axeshelper
   // var basePlaneMaterial = setMaterial(null,color.basePlaneTexture, 7, 7);
   //    var basePlane = new THREE.Mesh(basePlaneGeometry, basePlaneMaterial);
   //       basePlane.receiveShadow = true;
   // firstFloor.add(basePlane);   

   var basePlaneGeometry = new THREE.PlaneGeometry(28, 28);
   basePlaneGeometry.translate(7, 7, -0.04); // To avoid conflict with the axeshelper
   var basePlaneMaterial = setMaterial(null,color.basePlaneTexture, 7, 7);
   var basePlane = new THREE.Mesh(basePlaneGeometry, basePlaneMaterial);
      basePlane.receiveShadow = true;
   // // add the plane to the scene
   firstFloor.add(basePlane);   

   // create garage floor
   var planeGeometry = new THREE.PlaneGeometry(14, 12);
   planeGeometry.translate(7.0, 6.0, -0.02); // To avoid conflict with the axeshelper
   var planeMaterial = setMaterial(null,color.garageFloorTexture, 10, 10);
   var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;
   // add the plane to the scene
   firstFloor.add(plane);   

   // TODO
   // TEM QUE MUDAR ISSO AQUI.
   // MELHOR FAZER PAREDE A PAREDE MESMO PARA TER APENAS 
   // UM OBJETO PARA CORTAR AS PORTAS

   let doorG = createCutMesh(doorMain.l, doorMain.p, doorMain.a);
   let doorP = createCutMesh(door.l, door.p, door.a);

   // Bloco traseiro
   let bloco1 = createFourBasicWallRoom(14, 6, 3,  0, 6, 0, color.garageWalls);
   bloco1 = cut(bloco1, doorG, 4, 6, 0, false);
   bloco1 = cut(bloco1, doorP, 1.25, 6-0.12, 0, false);  
   firstFloor.add(bloco1)

   // Front block
   let frontBlock = createFourBasicWallRoom(3.5, 4, 3,  0, 2.12, 0, color.garageWalls);   
   frontBlock = cut(frontBlock, doorP, 1.25, 6-0.12, 0, false);
   firstFloor.add(frontBlock);
   
   let stairs = buildStairs(0.27, 1.10, 0.18, color.garageWalls);
   stairs.position.set(5, 6+0.7, 0.09); // To avoid conflict with the axeshelper
   firstFloor.add(stairs);

   return firstFloor;
}
