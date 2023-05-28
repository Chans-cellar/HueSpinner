import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import './style.css'

const scene = new THREE.Scene();

//window sizes
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

// create and add a mesh
const geomatry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color : "#2ab7ca" ,
  roughness: 0.5

})
const mesh = new THREE.Mesh(geomatry, material)
scene.add(mesh)

//add a camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height)
camera.position.z = 20
scene.add(camera)

//add a light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0,10,10)
scene.add(light)


//add a renderer
const canvas = document.querySelector(".abcd")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setPixelRatio(3)
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)


//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 3



//responsive resizer
window.addEventListener("resize", ()=>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //updating camera
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()

  //update renderer
  renderer.setSize(sizes.width,sizes.height)
})


//real time updater
const loop = ()=>{
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

const timeline =  gsap.timeline({defaults: {duration: 1}})
timeline.fromTo(mesh.scale,{x:0, y:0, z:0},{x:1, y:1, z:1})

//mouse color animation
let mouseDown = false
let rgb = []
window.addEventListener("mousedown",()=>{mouseDown = true})
window.addEventListener("mouseup", ()=>{mouseDown = false})

window.addEventListener("mousemove", (e)=>{
  if(mouseDown){
    
    rgb = [
      Math.round((e.pageX/sizes.width) * 255),
      Math.round((e.pageY/sizes.height)*255),
      150
    ]
    const newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r: newColor.r, 
      g: newColor.g, 
      b: newColor.b
    })

  }
})

