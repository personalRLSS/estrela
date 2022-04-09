import * as THREE from 'three';
import {setMaterial,
        createThreeBasicWallRoom,
        createFourBasicWallRoom,
        cut,
        createCutMesh,
        createWallBasic,
        createFloor} from './util/util.js'

export function createThirdFloor(color)
{
   let thirdFloor = new THREE.Object3D();

   let floor = createFloor(10.5, 19, 0.20,   0, 0, 6.20,  color.thirdFloorMat,5,5); 
   thirdFloor.add(floor);

   return thirdFloor;
}
