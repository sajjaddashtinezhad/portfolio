import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const container = document.getElementById('threejs-container');

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 3.3, 1.6);
camera.lookAt(0, 2.8, 0);


// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight); // Set size based on container
container.appendChild(renderer.domElement); // Append renderer to the container


// Add lighting
const mainlight = new THREE.DirectionalLight(0xffffff, 7);
mainlight.position.set(1, 1, 1).normalize();
const firstRimLight = new THREE.DirectionalLight(0xFFC600, 12);
firstRimLight.position.set(-5, 0, -5).normalize();
const secondRimLight = new THREE.DirectionalLight(0x0084FF, 12);
secondRimLight.position.set(5, 0, -3).normalize();
scene.add(mainlight, firstRimLight, secondRimLight);

// Point light that will follow the mouse
const pointLight = new THREE.PointLight(0xDC2626, 100, 100); // Red color
pointLight.visible = false; // Initially not visible
scene.add(pointLight);

// Initialize clock for animations
const clock = new THREE.Clock();

let mixer;

// Load FBX model
const loader = new FBXLoader();
loader.load('src/assets/Happy.fbx', function (object) {
    object.scale.set(2, 2, 2); // Adjust scale as necessary
    scene.add(object);

    // Set up the animation mixer
    mixer = new THREE.AnimationMixer(object);

    // Access and play the first animation in the FBX file
    const action = mixer.clipAction(object.animations[0]);
    action.play();

});




// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update the animation mixer (if available)
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
}
animate();

/*
// Handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
*/

// Mouse move event
window.addEventListener('mousemove', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Update point light position based on mouse coordinates
    pointLight.position.set(mouseX * 10, mouseY * 10, 1); // Adjust the multiplier as needed
    pointLight.visible = true; // Keep the light visible when mouse is over the canvas
});

// Mouse leave event
window.addEventListener('mouseleave', () => {
    pointLight.visible = false; // Hide the light when the mouse leaves the canvas
});
