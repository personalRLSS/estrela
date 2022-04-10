import * as THREE from 'three';
import {setMaterial,
        createThreeBasicWallRoom,
        createFourBasicWallRoom,
        cut,
        createCutMesh,
        createWallBasic,
        createFloor,
        buildLowerTexture} from './util/util.js'

import {degreesToRadians,
        createGroundPlane} from "../libs/util/util.js";

export function createThirdFloor(color)
{
   let thirdFloor = new THREE.Object3D();

   let floor = createFloor(10.5, 19, 0.20,   0, 0, 6.19,  color.thirdFloorMat,5,5); 
   thirdFloor.add(floor);

   buildLowerTexture(thirdFloor, 10.5, 19,  0, 0, 6.18,  color.secondFloorTeto, 3, 3)
   buildLowerTexture(thirdFloor, 8, 17.5,  0, 1.50, 6.17,  color.gesso, 6, 6)



   return thirdFloor;
}
