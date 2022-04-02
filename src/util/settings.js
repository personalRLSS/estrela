import * as THREE from 'three';

export function colorPresetLight() {
   this.garageWalls = 'antiquewhite'
   this.basePlaneTexture = './assets/sand.jpg'
   this.garageFloorTexture = './assets/paper.png'
   this.floorSides = 'whitesmoke'
   this.secondFloorMat = './assets/wood.png'
//   this.secondFloorWalls = 'linen'
}

export function colorPresetDark() 
{
}

// Porta comum
export function doorSettings() {
   this.l = 0.74
   this.p = 0.40   
   this.a = 2.20
}

// Porta principal
export function doorMainSettings() {
   this.l = 0.94
   this.p = 0.40
   this.a = 2.20
}

// Export settings variables
export let door = new doorSettings()
export let doorMain = new doorMainSettings()
export let color = new colorPresetLight();
