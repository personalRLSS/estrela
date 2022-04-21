import * as THREE from 'three';
import { setMaterial,
         cut,
         createWall,
         createWallComplex,
         createCutMesh} from './util/util.js'

// import {degreesToRadians,
//         createGroundPlane} from "../libs/util/util.js";

import { door,
         doorMain} from './util/settings.js'

function buildStairs(x, y, z, color)
{
   let stair = new THREE.Object3D();
   let geometry, step;
   for(let i = 0; i <= 16; i++)
   {
      geometry = new THREE.BoxGeometry(x, y, z);
      geometry.translate(-i*x, 0, i*z); // To avoid conflict with the axeshelper
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
   var groundPlaneGeometry = new THREE.PlaneGeometry(200, 200);
   groundPlaneGeometry.translate(7, 7, -0.06); // To avoid conflict with the axeshelper
   var groundPlaneMaterial = setMaterial(null,color.sand, 15, 15);
   var groundPlane = new THREE.Mesh(groundPlaneGeometry, groundPlaneMaterial);
      groundPlane.receiveShadow = true;
   firstFloor.add(groundPlane);

   // create base plane
   var basePlaneGeometry = new THREE.PlaneGeometry(28, 28);
   basePlaneGeometry.translate(7, 7, -0.04); // To avoid conflict with the axeshelper
   var basePlaneMaterial = setMaterial(null,color.basePlaneTexture, 15, 15);
   var basePlane = new THREE.Mesh(basePlaneGeometry, basePlaneMaterial);
      basePlane.receiveShadow = true;
   firstFloor.add(basePlane);   

   // create garage floor
   var planeGeometry = new THREE.PlaneGeometry(14, 12);
   planeGeometry.translate(7.0, 6.0, -0.02); // To avoid conflict with the axeshelper
   var planeMaterial = setMaterial(null,color.garageFloorTexture, 10, 10);
   var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;
   firstFloor.add(plane);   
   
   let stairs = buildStairs(0.27, 1.10, 0.18, color.garageWalls);
   stairs.position.set(10.9, 6+0.7, 0.09); // To avoid conflict with the axeshelper
   firstFloor.add(stairs);

   let doorGH = createCutMesh(doorMain.l, doorMain.p, doorMain.a);
   let doorGV = createCutMesh(doorMain.p, doorMain.l, doorMain.a);
   //let doorP = createCutMesh(door.l, door.p, door.a);

   // Começa com parede mais ao fundo e continua em sentido horário
   let wall = null

   createWall('H', 14,   0, 12, 0,  color.garageWalls, firstFloor)
   createWall('V', 12,  14,  0, 0,  color.garageWalls, firstFloor)

   wall = createWallComplex('H', 3.35,   10.84,  -0.05, 0,  
   setMaterial(null, color.stonewall,2,2))
   firstFloor.add(wall)   

   wall = createWallComplex('V', 6.25,   10.8,  -0.04, 0,  
   setMaterial(null, color.stonewallrot, 2, 3))
   wall = cut(wall, doorGV, 10.8, 4, 0, false);
   firstFloor.add(wall)

   wall = createWall('H', 10.9,   0.1, 6, 0,  color.garageWalls)
   wall = cut(wall, doorGH, 1, 5.9, 0, false);
   firstFloor.add(wall)

   createWall('V', 12,  0, 0, 0,  color.garageWalls, firstFloor)

   return firstFloor;
}
