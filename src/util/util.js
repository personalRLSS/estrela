import * as THREE from  'three';

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

export function createFourBasicWallRoom(location, 
                                        sizex, sizey, sizez, 
                                        posx, posy, posz, 
                                        material)
{
   let room = new THREE.Object3D();
   // fundo
   createWallBasic(room, sizex, 0.12, sizez, posx, posy+sizey, posz, material); // fundo
   // frente
   createWallBasic(room, sizex, 0.12, sizez, posx, posy, posz, material); // fundo
   // esquerda
   createWallBasic(room, 0.12, sizey, sizez, posx, posy, posz, material); // fundo
   // direita
   createWallBasic(room, 0.12, sizey, sizez, posx+sizex, posy, posz, material); // fundo 
   
   location.add(room);
}

export function createWallBasic(location, sizeX, sizeY, sizeZ, 
                                moveX, moveY, moveZ, material)
{
   let geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ).toNonIndexed();
   geometry.translate(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0); 
   let wall = new THREE.Mesh(geometry, material);
   wall.castShadow = true;
   location.add(wall);
}

export function createWall(location,
                           sizeX, sizeY, sizeZ, 
                           moveX, moveY, moveZ,
                           matx, matxneg = null,
                           maty = null, matyneg = null,
                           matz = null, matzneg = null)
{
   let geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ).toNonIndexed();
   geometry.translate(moveX+sizeX/2.0, moveY+sizeY/2.0, moveZ+sizeZ/2.0); // To avoid conflict with the axeshelper
   let cubeMaterials = organizeMaterials(matx, matxneg, maty, matyneg, matz, matzneg);
   let wall = new THREE.Mesh(geometry, cubeMaterials);
      wall.castShadow = true;
      //wall.receiveShadow = true;
   
   location.add(wall);
}


