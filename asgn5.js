import * as THREE from 'https://cdn.skypack.dev/three@0.131.3'
//import {OBJLoader} from './resources/three.js-master/examples/jsm/loaders/OBJLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/MTLLoader.js';
//import {GUI} from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/libs/lil-gui.module.min.js';
function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 50;;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0,0,10);
  const scene = new THREE.Scene();
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue
  const loader = new THREE.TextureLoader();
  //const loader = new THREE.TextureLoader();
  var bg_texture = loader.load('resources/images/sky.jpg', () => {
		const rt = new THREE.WebGLCubeRenderTarget(bg_texture.image.height);
		rt.fromEquirectangularTexture(renderer, bg_texture);
		scene.background = rt.texture;
	});
  loader.load('resources/images/wall.jpg', (texture) => {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });

  {
    const planeSize = 100;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('resources/images/ground.jpg');
    texture.encoding = THREE.sRGBEncoding;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
  };

  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = 0;
  //scene.add(cube);
  //cubes.push(cube);  // add to our list of cubes to rotate
  });

  function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});
  const intensity = 1;
  const cube = new THREE.Mesh(geometry, material);
  const AmbLight = new THREE.AmbientLight(color, intensity);
  //scene.add(AmbLight);
  scene.add(cube);
  scene.add(AmbLight);

  cube.position.x = x;
  cube.position.y = 1;
  return cube;
  }


  const cubes = [
  //makeInstance(geometry, 0x44aa88,  0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
  ];
  //cones
  const radius = 6;  // ui: radius
  const height = 8;  // ui: height
  const radialSegments = 16;  // ui: radialSegments
  const geometry1 = new THREE.ConeGeometry(radius, height, radialSegments)
  loader.load('resources/images/traphik.jpg', (texture) => {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const planeSize = 40;
    //cone.position.x = 4;
    //const cone = new THREE.Mesh(geometry1, material);
    for(let x = 0; x < planeSize; x++){
      const cone = new THREE.Mesh(geometry1, material);
      cone.scale.set(0.1,0.1,0.1);
      cone.position.z = 0;
      cone.position.x = 4;
      cone.position.z += x;
      cone.position.y = 0.2;
      scene.add(cone);
    }
    for(let x = 0; x < planeSize; x++){
      const cone = new THREE.Mesh(geometry1, material);
      cone.scale.set(0.1,0.1,0.1);
      cone.position.z = 0;
      cone.position.x = 4;
      cone.position.z -= x;
      cone.position.y = 0.2;
      scene.add(cone);
    }
    for(let x = 0; x < planeSize; x++){
      const cone = new THREE.Mesh(geometry1, material);
      cone.scale.set(0.1,0.1,0.1);
      cone.position.z = 0;
      cone.position.x = -4;
      cone.position.z += x;
      cone.position.y = 0.2;
      scene.add(cone);
    }
    for(let x = 0; x < planeSize; x++){
      const cone = new THREE.Mesh(geometry1, material);
      cone.scale.set(0.1,0.1,0.1);
      cone.position.z = 0;
      cone.position.x = -4;
      cone.position.z -= x;
      cone.position.y = 0.2;
      scene.add(cone);
    }
  });
// Cylinder/ ChumBucket
// {
// const material = new THREE.MeshStandardMaterial({
//   metalness: 1,
//   roughness: 0.5,
//   map: texture,
// });
{
loader.load('resources/images/squid.png', (texture) => {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
const radiusTop = 4;  // ui: radiusTop
const radiusBottom = 4;  // ui: radiusBottom
const height = 8;  // ui: height
const radialSegments = 12;  // ui: radialSegments
const geometry = new THREE.CylinderGeometry(
radiusTop, radiusBottom, height, radialSegments);
const cylinder = new THREE.Mesh(geometry, material);
cylinder.position.z = 20;
cylinder.position.y = 12;
cylinder.scale.set(0.5,3,1);
scene.add(cylinder);
});
}
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
  
  const AmbLight = new THREE.AmbientLight(color, intensity);
  //scene.add(AmbLight);

  {
  const skyColor = 0xB1E1FF;  // light blue
  const groundColor = 0xB97A20;  // brownish orange
  const HemLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(HemLight);
  }

  {
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();
    mtlLoader.load('resources/objects/sponge/boat.mtl', (mtl) => {
      mtl.preload();
      objLoader.setMaterials(mtl);
    //const objLoader = new OBJLoader();
    objLoader.load('resources/objects/sponge/boat.obj', (root) => {
      scene.add(root);
      root.scale.set(1.5,1.5,1.5);
      root.position.set(0,1,0);
    });
  });
  };
  {
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();
    mtlLoader.load('resources/objects/shark.mtl', (mtl) => {
      mtl.preload();
      objLoader.setMaterials(mtl);
    //const objLoader = new OBJLoader();
    objLoader.load('resources/objects/shark.obj', (root) => {
      scene.add(root);
      root.scale.set(0.1,0.1,0.1);
      root.rotateX(-90);
      root.position.set(0,1,-5);
    });
  });
  };
  renderer.render(scene, camera);
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
  function render(time) {
    time *= 0.001;  // convert time to seconds
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }


  //camera controls
  const controls = new OrbitControls( camera, canvas );
  controls.target.set(0, 5, 0);
  controls.update();
  requestAnimationFrame(render);
}

main();
