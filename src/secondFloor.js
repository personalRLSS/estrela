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
   let piscina = createCutMesh(4, 2, 2);
   floor = cut(floor, piscina, 10.5, 8, 3);
   secondFloor.add(floor);

   let leftwall = createWallBasic(0.12, 17.5, 3,   0, 1.50, 3.20,  color.secondFloorWalls);
   let window2 = createCutMesh(1, 1, 1);
   leftwall = cut(leftwall, window2, 0, 2.5, 4.5);
   secondFloor.add(leftwall);

   return secondFloor;
}
