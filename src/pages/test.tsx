import * as THREE from "three";
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//引入性能监视器stats.js
import Stats from "three/addons/libs/stats.module.js";

import React, { useRef, useEffect } from "react";

// 引入dat.gui.js的一个类GUI
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

export default function Test() {
  const cubeEle = useRef(null);
  useEffect(() => {

    // 实例化一个gui对象
    const gui = new GUI();
    //改变交互界面style属性
    gui.domElement.style.right = "0px";
    gui.domElement.style.width = "300px";
    const obj = { x: 30 };
    gui.add(obj, "x", 0, 100);
  
    // 创建3D场景对象Scene
    const scene = new THREE.Scene();
  
    const customizeGeometry = new THREE.BufferGeometry();
    //类型化数组创建顶点数据
    const vertices = new Float32Array([
     0, 0, 0, //顶点1坐标
      80, 0, 0, //顶点2坐标
      80, 80, 0, //顶点3坐标
  
      0, 0, 0, //顶点4坐标   和顶点1位置相同
      80, 80, 0, //顶点5坐标  和顶点3位置相同
      0, 80, 0, //顶点6坐标
  
      80, 0, 0,
      0, 0, 0,
      0, 0, 80,
  
      0, 0, 80,
      80, 0, 80,
      80, 0, 0,
      0,0, 80,
      0, 0, 0,
      0, 80, 0,
  
      0, 80, 0,
      0, 80, 80,
      0, 0, 80,
  
      0, 0, 80,
      80, 80, 80,
      0, 80, 0,
  
      0, 80, 0,
      80, 80, 80,
      80, 80, 0
    ]);
    const attribute = new THREE.BufferAttribute(vertices, 3);
    // 设置几何体attributes属性的位置属性
    customizeGeometry.attributes.position = attribute;
    // 点渲染模式
    const pointMaterial = new THREE.PointsMaterial({
        color: 0xffff00,
        size: 10.0 //点对象像素尺寸
    }); 
    const customizedMesh = new THREE.Mesh(customizeGeometry, pointMaterial);
    scene.add(customizedMesh);
  
  
    
  
    //创建一个长方体几何对象Geometry
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    // SphereGeometry：球体
    // const sphereGeometry = new THREE.SphereGeometry(50);
    const sphereGeometry = new THREE.CylinderGeometry(50,50,100);
    // CylinderGeometry：圆柱
    // const geometry = new THREE.CylinderGeometry(50,50,100);
    // PlaneGeometry：矩形平面
    // const geometry = new THREE.PlaneGeometry(100,50);
    // CircleGeometry：圆形平面
    // const geometry = new THREE.CircleGeometry(50);
  
    //创建一个材质对象Material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000, //0xff0000设置材质颜色为红色
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      shininess: 20, //高光部分的亮度，默认30
      specular: 0xffffff, //高光部分的颜色
    });
  
    // const num = 10;
    // for (let i = 0; i < num; i++) {
    //   for (let j = 0; j < num; j++) {
    //     // 两个参数分别为几何体geometry、材质material
    //     const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    //     mesh.position.set(i * 200, 0, j * 200);
  
    //     mesh.rotateZ(0.01);
    //     scene.add(mesh);
    //   }
    // }
  
    // 添加球体几何对象
    const sphereMesh = new THREE.Mesh(sphereGeometry, material);
    sphereMesh.position.set(0, 100, 0);
    gui.add(sphereMesh.position, "x", 0, 180);
    gui.add(sphereMesh.position, "y", 0, 180);
    gui.add(sphereMesh.position, "z", 0, 180);
    scene.add(sphereMesh);
  
    // 光源
    // const pointLight = new THREE.PointLight(0xffffff, 10000.0);
    // const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
    // pointLight.decay = 0.0;//设置光源不随距离衰减
    // //点光源位置
    // // pointLight.position.set(400, 200, 300);
    // // pointLight.position.set(100, 60, 50);
    // pointLight.position.set(-400, -200, -300);
    // scene.add(pointLight); //点光源添加到场景中
    // scene.add(pointLightHelper); // 点光源辅助观察
  
    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(80, 100, 50);
    // 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
    // directionalLight.target = mesh;
    scene.add(directionalLight);
  
    //  gui相关配置
    gui.add(directionalLight, "intensity", 0, 2.0).name("平行光强度");
    const colorObj = {
      color: 0x00ffff,
    };
    gui
      .addColor(colorObj, "color")
      .name("颜色")
      .onChange((value) => {
        sphereMesh.material.color.set(value);
      });
    // 参数3数据类型：对象(下拉菜单)
    const rotateObj = {
      rotate: true
    }
    gui.add(rotateObj, 'rotate').name('是否旋转球体')
  
    // scene.add(mesh);
  
    // AxesHelper：辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(150);
    scene.add(axesHelper);
  
    // 实例化一个透视投影相机对象
    // width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
    // const width = document.body.clientWidth; //宽度
    // const height = document.body.clientHeight; //高度
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 8000);
  
    camera.position.set(2000, 2000, 2000);
    // camera.lookAt(0, 0, 0);
    camera.lookAt(1000, 0, 1000);
    // camera.lookAt(mesh.position);
  
    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x444444, 1); //
    // renderer.render(scene, camera);
  
    const clock = new THREE.Clock();
    const stats = new Stats();
    document.body.appendChild(stats.domElement); // 统计渲染帧率的面板
    function render() {
      const spt = clock.getDelta() * 1000;
      stats.update();
      renderer.render(scene, camera);
      // mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
      // mesh.rotateX(0.01)
      // mesh.rotateZ(0.01)
      // sphereMesh.translateX(1)
      // sphereMesh.translateY(1)
      // sphereMesh.translateZ(1)
      if (rotateObj.rotate) sphereMesh.rotateZ(Math.PI / 40);
      requestAnimationFrame(render);
    }
    render();
  
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.updateProjectionMatrix();
    });
  
    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.lookAt(1000, 0, 1000);
    controls.update();
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener("change", function () {
      // renderer.render(scene, camera); //执行渲染操作
    }); //监听鼠标、键盘事件

    cubeEle.current?.appendChild(renderer.domElement);

  }, [])


  return <div ref={cubeEle}></div>;
}
