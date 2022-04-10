import { CSG } from '../../libs/other/CSGMesh.js' 
import * as THREE from 'three';
import {degreesToRadians} from "../../libs/util/util.js";

// Function to set basic material or textures
// You can set just a color, just a texture or both
export function setMaterial(color, file = null, repeatU = 1, repeatV = 1) {
    let loader = new THREE.TextureLoader();
    if (!color) color = 'rgb(255,255,255)';

    let mat;
    if (!file) {
        mat = new THREE.MeshLambertMaterial({ color: color });
    } else {
        mat = new THREE.MeshLambertMaterial({ map: loader.load(file), color: color });
        mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
        mat.map.minFilter = mat.map.magFilter = THREE.LinearFilter;
        mat.map.repeat.set(repeatU, repeatV);
    }
    return mat;
}

function organizeMaterials(matx, matxneg, maty, matyneg, matz, matzneg)
{
   // There is only one material
   if(!matxneg) return matx;

   // If not, return the full list
   let newmat = [matx, matxneg, maty, matyneg, matz, matzneg];
   return newmat;
}

export function createFourBasicWallRoom(sizeX, sizeY, sizeZ, 
                                        moveX, moveY, moveZ, 
                                        material, location = null)
{
   let auxMat = new THREE.Matrix4();
   let sw = 0.25; // size of the wall will be 0.125

   let geometry1 = new THREE.Mesh(new THREE.BoxGeometry(sizeX, sizeY, sizeZ), new THREE.MeshPhongMaterial({color: 'lightgreen'}));
   let geometry2 = new THREE.Mesh(new THREE.BoxGeometry(sizeX-sw, sizeY-sw, sizeZ+sw),new THREE.MeshPhongMaterial({color: 'red'}));   

   // Execute subtraction
   let baseCSG = CSG.fromMesh(geometry1)  
   let cutCSG = CSG.fromMesh(geometry2)   
   let csgObject = baseCSG.subtract(cutCSG) // Execute subtraction
   let output = CSG.toMesh(csgObject, auxMat)
      output.receiveShadow = false;
      output.material = setMaterial(material)
      output.position.set(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0);
      updateObject(output)

   // Return the room if location is not set. Otherwise, add room to provided location
   if(!location) return output;
   else          location.add(output);
}

// Omitindo a parede com o menor Y para "encaixar" nos comodos de 4 paredes criados anteriormente
export function createThreeBasicWallRoom( sizex, sizey, sizez,  
                                          posx, posy, posz, 
                                          material, location){
   let room = new THREE.Object3D();
   // fundo
   createWallBasic(sizex, 0.12, sizez, posx, posy+sizey, posz, material); // fundo
   // frente
   createWallBasic(sizex, 0.12, sizez, posx, posy, posz, material); // fundo
   // esquerda
   createWallBasic(0.12, sizey, sizez, posx, posy, posz, material); // fundo
   // direita
   createWallBasic(0.12, sizey, sizez, posx+sizex, posy, posz, material); // fundo 

   // Return the room if location is not set. Otherwise, add room to provided location
   if(!location) return room;
   else          location.add(room);
}


// Parede com 0.12 de parede e 3m de altura.
// Orientação pode ser "H"orizontal ou "V"ertical
export function createWall(orientation, size, moveX, moveY, moveZ, 
                           material, location = null)
{
   let sizeX = 0.12, sizeY = 0.12, sizeZ = 3.0;
   if(orientation == 'H') sizeX = size;
   else                   sizeY = size;

   let geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ).toNonIndexed();
   geometry.translate(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0); 
   let wall = new THREE.Mesh(geometry, setMaterial(material));
      wall.castShadow = true;
      //wall.receiveShadow = true;  

   // Return the room if location is not set. Otherwise, add room to provided location
   if(!location) return wall;
   else          location.add(wall);
}

export function createWallComplex(
   sizeX, sizeY, sizeZ, 
   moveX, moveY, moveZ,
   matx, matxneg = null,
   maty = null, matyneg = null,
   matz = null, matzneg = null, location = null)
{
   let geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ).toNonIndexed();
   geometry.translate(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0); // To avoid conflict with the axeshelper
   let cubeMaterials = organizeMaterials(matx, matxneg, maty, matyneg, matz, matzneg);
   let wall = new THREE.Mesh(geometry, cubeMaterials);
   wall.castShadow = true;
   //wall.receiveShadow = true;
   location.add(wall);
}


export function createWallBasic(sizeX, sizeY, sizeZ, 
                                moveX, moveY, moveZ, 
                                material, location = null)
{
   let geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ).toNonIndexed();
      geometry.translate(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0); 
   let wall = new THREE.Mesh(geometry, setMaterial(material));
      wall.castShadow = true;
      //wall.receiveShadow = true;  
   
   // Return the room if location is not set. Otherwise, add room to provided location
   if(!location) return wall;
   else          location.add(wall);
}

export function createWallTextured(
   sizeX, sizeY, sizeZ, 
   moveX, moveY, moveZ, 
   material, location = null)
{
   let geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ).toNonIndexed();
   geometry.translate(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0); 
   let wall = new THREE.Mesh(geometry, material);
   wall.castShadow = true;
   //wall.receiveShadow = true;  

   // Return the room if location is not set. Otherwise, add room to provided location
   if(!location) return wall;
   else          location.add(wall);
}


export function createFloor(sizeX, sizeY, sizeZ, 
                            moveX, moveY, moveZ,
                            mat, repU, repV, location = null)
{
   let geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ).toNonIndexed();
      geometry.translate(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0); // To avoid conflict with the axeshelper
   let floor = new THREE.Mesh(geometry, setMaterial(null, mat, repU, repV));
      floor.castShadow = true;
      floor.receiveShadow = true;  
   
   // Return the room if location is not set. Otherwise, add room to provided location
   if(!location) return floor;
   else          location.add(floor);
}

// Floor com texturas diferentes. Base e piso com texturas. Laterais com cores
// Esse floor NÃO PODE SER CORTADO VIA CSG (atrapalha os materiais)
export function createFloorSixMat(location,
   sizeX, sizeY, sizeZ, 
   moveX, moveY, moveZ,
   matSides, matTop, repTopU, repTopV, matBot, repBotU, repBotV)
{
   let geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ).toNonIndexed();
      geometry.translate(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0); // To avoid conflict with the axeshelper
   let cubeMaterials = [setMaterial(matSides),
                        setMaterial(matSides),
                        setMaterial(matSides),
                        setMaterial(matSides),
                        setMaterial(null, matTop, repTopU, repTopV),
                        setMaterial(null, matBot, repBotU, repBotV),]
   let floor = new THREE.Mesh(geometry, cubeMaterials);
      floor.castShadow = true;
      //wall.receiveShadow = true;
   
   //location.add(floor);

   return floor;
}

export function createCutMesh(sizeX, sizeY, sizeZ)
{
   let cut = new THREE.Mesh(new THREE.BoxGeometry(sizeX, sizeY, sizeZ));
      cut.receiveShadow = true;   
   return cut;
}

export function updateObject(mesh)
{
   mesh.matrixAutoUpdate = false;
   mesh.updateMatrix();
}


export function cut(base, cut, posx, posy, posz, receiveShadow = true, location = null)
{
   let auxMat = new THREE.Matrix4();

   // Get size of the cut to adjust position
   let box = new THREE.Box3().setFromObject( cut );
   let size = new THREE.Vector3();
   box.getSize(size);
   cut.position.set(posx+size.x/2, posy+size.y/2, posz+size.z/2)
   updateObject(cut) // update internal coords

   if(location) location.add(cut); // For debugging

   // Execute subtraction
   let baseCSG = CSG.fromMesh(base)  
   let cutCSG = CSG.fromMesh(cut)   
   let csgObject = baseCSG.subtract(cutCSG) // Execute subtraction
   let output = CSG.toMesh(csgObject, auxMat)

   // Recover material
   output.material = base.material;
   output.receiveShadow = receiveShadow;

   return output;
}

export function createCylinder(material, radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded = null)
{
  var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
  var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;

  return object;
}

export function createGuardaCorpo(diameter, size, seg, spacing, numberOfTubes,
                                  movex, movey, movez, color)
{
   let tubes = numberOfTubes - 1; // 3 inner tubes + 1 superior
   let mat = new THREE.MeshPhongMaterial({color: color, shininess:"50",specular:color});
   let guardaCorpo = new THREE.Object3D();
   let c1, i

   // Barras horizontais
   for(i = 0; i < spacing * tubes; i+=spacing )
   {
      c1 = createCylinder(mat, diameter, diameter, size, seg, seg, false)
      c1.translateZ(i)
      guardaCorpo.add(c1)
   }
   c1 = createCylinder(mat, diameter*2, diameter*2, size, seg, seg, false)
   c1.translateZ(spacing * tubes + spacing/4)
   guardaCorpo.add(c1)

   // Barras verticais
   let dist = 2
   let barrasVerticais = new THREE.Object3D();
   let sizeV = numberOfTubes*spacing+spacing
   for(i = 0; i <= size; i+=dist )
   {
      c1 = createCylinder(mat, diameter, diameter, sizeV, seg, seg)
      c1.translateY(i)
      c1.rotateX(degreesToRadians(90))
      barrasVerticais.add(c1)
   }
   barrasVerticais.translateZ(sizeV/2 - spacing*1.6)
   barrasVerticais.translateY(-size/2)

   guardaCorpo.add(barrasVerticais)


   guardaCorpo.translateX(movex)
   guardaCorpo.translateY(movey)
   guardaCorpo.translateZ(movez)
   guardaCorpo.rotateZ(degreesToRadians(90))
   
   return guardaCorpo
}

export function buildLowerTexture(
   location, sizex, sizey,  movex, movey, movez, 
   texture, repU, repV)
{
   movex += sizex/2;
   movey += sizey/2;
   
   // create base plane
   var basePlaneGeometry = new THREE.PlaneGeometry(sizex, sizey);
   basePlaneGeometry.translate(movex, movey, movez); // To avoid conflict with the axeshelper

   var basePlaneMaterial = setMaterial(null,texture, repU, repV);
      basePlaneMaterial.side = THREE.BackSide
   var basePlane = new THREE.Mesh(basePlaneGeometry, basePlaneMaterial);
   location.add(basePlane); 
}
