import * as THREE from 'three';
import {setMaterial,
        createThreeBasicWallRoom,
        createFourBasicWallRoom,
        createWallBasic,
        createFloor} from './util/util.js'


export function createSecondFloor(color)
{
   let secondFloor = new THREE.Object3D();

   createFloor(secondFloor, 14.5, 19, 0.20,   0, 0, 3, 
               color.floorSides, color.secondFloorTop,10,10, color.secondFloorBottom,10,10); 

   createWallBasic(secondFloor, 0.12, 17.5, 3,   0, 1.50, 3.20,  color.secondFloorWalls);

   return secondFloor;
}
