import * as THREE from 'three';
import { CSG } from '../libs/other/CSGMesh.js' 
import {setMaterial,
        createThreeBasicWallRoom,
        createFourBasicWallRoom,
        updateObject,
        cut,
        createWall,
        createCutMesh,
        createWallBasic,
        createFloor,
        createWallTextured} from './util/util.js'

import { door,
         doorVidro,
         doorMain,
         smallWindow50x70} from './util/settings.js'

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
}

export function createSecondFloor(color)
{
   let secondFloor = new THREE.Object3D();

   let floor = createFloor(14.5, 19, 0.20,   0, 0, 3,  color.secondFloorMat,10,10); 
   let piscina = createCutMesh(3, 2, 2);
   floor = cut(floor, piscina, 11.5, 1, 3);

   let stairHole = createCutMesh(3.5, 1.10, 2);
   floor = cut(floor, stairHole, 6.5, 6.1, 3);

   secondFloor.add(floor);

   let greenFloor = createFloor(4.5, 13, 0.25,   10.01, 6, 3,  color.grass,2,6); 

   secondFloor.add(greenFloor);

   let doorVidroH = createCutMesh(doorVidro.l, doorVidro.p, doorVidro.a);
   let doorVidroV = createCutMesh(doorVidro.p, doorVidro.l, doorVidro.a);
   let doorGH = createCutMesh(doorMain.l, doorMain.p, doorMain.a);
   let doorGV = createCutMesh(doorMain.p, doorMain.l, doorMain.a);
   let doorPH = createCutMesh(door.l, door.p, door.a);
   let doorPV = createCutMesh(door.p, door.l, door.a);
   let smallWindow = createCutMesh(smallWindow50x70.l, smallWindow50x70.p, smallWindow50x70.a);

   // paredes principais verticais (em y)
   let wall
   wall = createWall('V', 19,   0, 0, 3.20,  color.secondFloorWalls);
   let window2 = createCutMesh(1, 1, 1);
   wall = cut(wall, window2, 0, 2.5, 4.5, false);
   secondFloor.add(wall); // wall 1 

   wall = createWall('V', 17.5,  5, 1.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall 2

   wall = createWall('V', 8.5,  6.5, 10.5, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall 3

   wall = createWall('V', 13,  10, 6, 3.20,  color.secondFloorWalls);
   wall = cut(wall, doorVidroV, 10, 8, 3.20, false); // porta suite
   secondFloor.add(wall);  // wall 4

   // paredes principais horizontais (em x)
   wall = createWall('H', 8,  0, 1.50, 3.20,  color.secondFloorWalls);
   wall = cut(wall, doorVidroH, 0.5, 1.50, 3.20, false); // porta suite
   wall = cut(wall, doorVidroH, 5.5, 1.50, 3.20, false); // porta sala
   wall = cut(wall, smallWindow, 3.5, 1.50, 4.70, false); // porta sala
   secondFloor.add(wall); // wall 5

   wall = createWall('H' ,5,  0, 6.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 6

   wall = createWall('H',5,   0, 8.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 7

   wall = createWall('H',5,   0, 11.0, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 8

   wall = createWall('H',5,   0, 12.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 9

   wall = createWall('H',5,   0, 16.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 10   

   wall = createWall('H',10,  0, 19.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 11

   wall = createWall('H',3.5, 6.5, 16.00, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 12

   wall = createWall('H',3.5, 6.5, 10.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall); // wall 13

   // Outras paredes
   wall = createWall('V', 4.6,  8, 1.50, 3.20,  color.secondFloorWalls);
   secondFloor.add(wall);  // wall 14

   buildC(color, secondFloor);

   return secondFloor;
}
