import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

type Point = {
  x: number
  y: number
  z: number
  intensity?: number
}

function createMockPoints(count = 5000): Point[] {
  const points: Point[] = []
  for (let i = 0; i < count; i += 1) {
    // 随机一个近似圆柱区域，模拟机器人周围激光雷达点云
    const angle = Math.random() * Math.PI * 2
    const radius = 1.5 + Math.random() * 3
    const height = (Math.random() - 0.5) * 1.5

    const x = Math.cos(angle) * radius
    const y = height
    const z = Math.sin(angle) * radius

    const intensity = Math.random()
    points.push({ x, y, z, intensity })
  }
  return points
}

function pointsToBufferGeometry(points: Point[]): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(points.length * 3)
  const colors = new Float32Array(points.length * 3)

  const color = new THREE.Color()

  points.forEach((p, i) => {
    const idx = i * 3
    positions[idx] = p.x
    positions[idx + 1] = p.y
    positions[idx + 2] = p.z

    const intensity = p.intensity ?? 1
    // 用强度映射为颜色，从蓝到红
    color.setHSL((1 - intensity) * 0.7, 1, 0.5)
    colors[idx] = color.r
    colors[idx + 1] = color.g
    colors[idx +2] = color.b
  })

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geometry
}

const ThreeDMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050709)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 3, 8)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const axesHelper = new THREE.AxesHelper(2)
    scene.add(axesHelper)

    const gridHelper = new THREE.GridHelper(10, 20, 0x444444, 0x222222)
    scene.add(gridHelper)

    const points = createMockPoints()
    const geometry = pointsToBufferGeometry(points)
    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      sizeAttenuation: true,
    })
    const pointCloud = new THREE.Points(geometry, material)
    scene.add(pointCloud)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.enablePan = true
    controls.minDistance = 1
    controls.maxDistance = 30
    controls.target.set(0, 0, 0)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(5, 10, 7)
    scene.add(dirLight)

    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const newWidth = container.clientWidth || window.innerWidth
      const newHeight = container.clientHeight || window.innerHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      controls.dispose()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#050709' }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      />
    </div>
  )
}

export default ThreeDMap

