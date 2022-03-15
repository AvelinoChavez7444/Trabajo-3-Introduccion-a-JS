import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10, 1, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0x0080FF});
const torus = new THREE.Mesh( geometry,material );

scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);

scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry,material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const linoTexture = new THREE.TextureLoader().load('lino.jpg');
const lino = new THREE.Mesh(new THREE.BoxGeometry(6,6,6), new THREE.MeshBasicMaterial({ map: linoTexture }));
scene.add(lino);

const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const earth = new THREE.Mesh(new THREE.SphereGeometry(3,32,32), new THREE.MeshStandardMaterial({ map: earthTexture }));  
scene.add(earth);

earth.position.x = 15;
earth.position.y = 0;
earth.position.z = 10;
///earth.position.setX(-10);





function animate(){
  requestAnimationFrame( animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  lino.rotation.x -= 0.01;
  lino.rotation.y -= 0.005;
  lino.rotation.z -= 0.01;
  earth.rotation.y += 0.01;

  controls.update(); 
  renderer.render(scene,camera);
}

animate();