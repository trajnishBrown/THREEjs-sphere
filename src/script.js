import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
const gui = new dat.GUI();

var customContainer = document.getElementById("my-gui-container");
customContainer.appendChild(gui.domElement);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials
// const material = new THREE.MeshBasicMaterial();
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.5;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
// const pointLight = new THREE.PointLight(0xffffff, 0.1);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-2.51, 0.8, 0.67);
pointLight2.intensity = 10;
scene.add(pointLight2);

const light1 = gui.addFolder("Light 1");

light1.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
light1.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
light1.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
light1.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper2);

// Light 3
const pointLight3 = new THREE.PointLight(0xfff, 2);
pointLight3.position.set(0.67, 1.06, 1.13);
pointLight3.intensity = 10;
scene.add(pointLight3);

const light2 = gui.addFolder("Light 2");

const light2Color = {
  color: 0xfff,
};

light2.addColor(light2Color, "color").onChange(() => {
  pointLight3.color.set(light2Color.color);
});

light2.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
light2.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
light2.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
light2.add(pointLight3, "intensity").min(0).max(10).step(0.01);

// Light 4
const pointLight4 = new THREE.PointLight(0x8e0279, 2);
pointLight4.position.set(0.41, -0.46, 0.93);
pointLight4.intensity = 10;
scene.add(pointLight4);

const light3 = gui.addFolder("Light 3");

const light3Color = {
  color: 0x8e0279,
};

light3.addColor(light3Color, "color").onChange(() => {
  pointLight4.color.set(light3Color.color);
});

light3.add(pointLight4.position, "y").min(-3).max(3).step(0.01);
light3.add(pointLight4.position, "x").min(-6).max(6).step(0.01);
light3.add(pointLight4.position, "z").min(-3).max(3).step(0.01);
light3.add(pointLight4, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}

const updateSphere = (event) => {
  sphere.position = window.scrollY * 0.001;
};

window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.z += -0.1 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
