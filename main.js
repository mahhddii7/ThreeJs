import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'




const scene = new THREE.Scene()
const box1 = new THREE.BoxGeometry(1, 1, 1)
const canvas = document.querySelector('.cube')

function degToRad(degrees) {
    return degrees * (Math.PI / 180)
}


const size = {
    width: window.innerWidth,
    height: window.innerHeight
}


const grid = new THREE.GridHelper()
scene.add(grid)

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(box1, material)
cube.rotation.x = degToRad(40)
cube.position.set(2, 2, 2)
scene.add(cube)

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.01, 1000)

camera.position.set(2, 3, 0)
scene.add(camera)
scene.background = new THREE.Color(0xCCCCCC)
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)

const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)
const lightDirection = new THREE.DirectionalLight(0xffffff, 1)
scene.add(lightDirection)


const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()


const rgbLoader = new RGBELoader()
rgbLoader.load('src hdri Env', (hdrTexture) => {
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = hdrTexture;
    scene.environment = hdrTexture
})

// load custom shap
const loader = new GLTFLoader()
loader.load(
    'model/apple_ii_computer.glb',
    (gltf) => {
        console.log('Model loaded:', gltf); 
        gltf.scene.scale.set(3, 3, 3); 
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}`)
    },
    (error) => {
        console.log('An error occurred while loading  the model:', error);

    }
)