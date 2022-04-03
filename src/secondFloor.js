import * as THREE from 'three';
import { CSG } from '../libs/other/CSGMesh.js' 
import {setMaterial,
        createThreeBasicWallRoom,
        createFourBasicWallRoom,
        updateObject,
        cut,
        createCutMesh,
        createWallBasic,
        createFloor,
        createWallTextured} from './util/util.js'

export function buildC(color, location = null)
{
   let material = setMaterial(null, color.cmat, 10, 3);
   // paredes principais verticais (em y)
   let base = createWallTextured(14.6, 0.2, 3.5,   0, -0.1, 3,  material);
   let cut1 = createCutMesh(15, 0.3, 2.5);
   base = cut(base, cut1, 0.5, -0.1, 3.5, false);
   base = cut(base, cut1, 10.6, -0.1, 4.5, false);
   base.material = material;
   location.add(base); // wall 1    
   // let auxMat = new THREE.Matrix4();

   // let geometry1 = new THREE.Mesh(new THREE.BoxGeometry(14, 0.2, 3.5), new THREE.MeshPhongMaterial({color: 'lightgreen'}));
   // let geometry2 = new THREE.Mesh(new THREE.BoxGeometry(14, 0.3, 2.5), new THREE.MeshPhongMaterial({color: 'red'}));   
   // geometry2.position.set(0.5, 0, 0)
   // updateObject(geometry2) // update internal coords

   // // Execute subtraction
   // let baseCSG = CSG.fromMesh(geometry1)  
   // let cutCSG = CSG.fromMesh(geometry2)   
   // let csgObject = baseCSG.subtract(cutCSG) // Execute subtraction
   // let output = CSG.toMesh(csgObject, auxMat)
   //    output.receiveShadow = false;
   //    //output.material = setMaterial(material)
   //    output.position.set(7, 0, 1.75+3);
   //    updateObject(output)
   
   // location.add(output)
   // let csgObject = baseCSG.subtract(cutCSG) // Execute subtraction
   // let output = CSG.toMesh(csgObject, auxMat)
   // output.receiveShadow = false;
   // output.material = setMaterial(material)
   // output.position.set(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0);
   // updateObject(output)

   // // Return the room if location is not set. Otherwise, add room to provided location
   // if(!location) return output;
   // else          location.add(output);
}

export function createSecondFloor(color)
{
   let secondFloor = new THREE.Object3D();

   let floor = createFloor(14.5, 19, 0.20,   0, 0, 3,  color.secondFloorMat,10,10); 
   let piscina = createCutMesh(3, 2, 2);
   floor = cut(floor, piscina, 11.5, 6.5, 3);

   let stairHole = createCutMesh(3, 1.10, 2);
   floor = cut(floor, stairHole, 6.12, 6.1, 3);

   secondFloor.add(floor);

   let greenFloor = createFloor(4.52, 13, 0.25,   10, 6, 3,  color.grass,2,6); 
   greenFloor = cut(greenFloor, piscina, 11.52, 6.49, 3);

   secondFloor.add(greenFloor);

   // paredes principais verticais (em y)
   let wall = createWallBasic(0.12, 17.5, 3,   0, 1.50, 3.20,  color.secondFloorWalls);
   let window2 = createCutMesh(1, 1, 1);
   wall = cut(wall, window2, 0, 2.5, 4.5, false);
   secondFloor.add(wall); // wall 1 

   wall = createWallBasic(0.12, 17.5, 3,  5, 1.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall 2

   wall = createWallBasic(0.12, 8.5, 3,  6.5, 10.5, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall 3

   wall = createWallBasic(0.12, 13, 3,  10, 6, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall 4

   // paredes principais horizontais (em x)
   wall = createWallBasic(8, 0.12, 3,   0, 1.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 5

   wall = createWallBasic(5, 0.12, 3,   0, 6.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 6

   wall = createWallBasic(5, 0.12, 3,   0, 8.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 7

   wall = createWallBasic(5, 0.12, 3,   0, 11.0, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 8

   wall = createWallBasic(5, 0.12, 3,   0, 12.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 9

   wall = createWallBasic(5, 0.12, 3,   0, 16.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 10   

   wall = createWallBasic(10, 0.12, 3,   0, 19.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 11

   wall = createWallBasic(3.5, 0.12, 3,   6.5, 16.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 12

   wall = createWallBasic(3.5, 0.12, 3,   6.5, 10.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 13

   wall = createWallBasic(0.12, 3.5, 3,  8, 1.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall 14

   buildC(color, secondFloor);

   return secondFloor;
}
