import * as THREE from 'three';
import {setMaterial,
        createThreeBasicWallRoom,
        createFourBasicWallRoom,
        cut,
        createCutMesh,
        createWallBasic,
        createFloor} from './util/util.js'

export function createSecondFloor(color)
{
   let secondFloor = new THREE.Object3D();

   let floor = createFloor(14.5, 19, 0.20,   0, 0, 3,  color.secondFloorMat,10,10); 
   let piscina = createCutMesh(3, 2, 2);
   floor = cut(floor, piscina, 11.5, 6.5, 3);

   let stairHole = createCutMesh(3, 1.10, 2);
   floor = cut(floor, stairHole, 6.12, 6.1, 3);

   secondFloor.add(floor);

   // paredes principais verticais (em y)
   let wall = createWallBasic(0.12, 17.5, 3,   0, 1.50, 3.20,  color.secondFloorWalls);
   let window2 = createCutMesh(1, 1, 1);
   wall = cut(wall, window2, 0, 2.5, 4.5, false);
   secondFloor.add(wall); // wall1 

   wall = createWallBasic(0.12, 17.5, 3,  5, 1.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall2

   wall = createWallBasic(0.12, 8.5, 3,  6.5, 10.5, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall3

   wall = createWallBasic(0.12, 13, 3,  10, 6, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall4

   // paredes principais horizontais (em x)
   wall = createWallBasic(8, 0.12, 3,   0, 1.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall5

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

   return secondFloor;
}
