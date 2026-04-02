import { useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
  z: number
  intensity?: number
}

function createMockPoints(count = 3000): Point[] {
  const points: Point[] = []
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2
    const radius = 1.5 + Math.random() * 8
    const height = (Math.random() - 0.5) * 1.5

    const x = Math.cos(angle) * radius
    const y = height
    const z = Math.sin(angle) * radius

    const intensity = Math.random()
    points.push({ x, y, z, intensity })
  }
  return points
}

const TwoDMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      const width = parent?.clientWidth || window.innerWidth
      const height = parent?.clientHeight || window.innerHeight
      const dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      draw()
    }

    const points = createMockPoints()

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#050709'
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2, height / 2)
      const scale = Math.min(width, height) / 30
      ctx.scale(scale, -scale)

      ctx.strokeStyle = '#222'
      ctx.lineWidth = 1 / scale
      const gridSize = 1
      const gridCount = 20
      ctx.beginPath()
      for (let i = -gridCount; i <= gridCount; i += 1) {
        ctx.moveTo(i * gridSize, -gridCount * gridSize)
        ctx.lineTo(i * gridSize, gridCount * gridSize)
        ctx.moveTo(-gridCount * gridSize, i * gridSize)
        ctx.lineTo(gridCount * gridSize, i * gridSize)
      }
      ctx.stroke()

      ctx.strokeStyle = '#555'
      ctx.lineWidth = 2 / scale
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(2, 0)
      ctx.moveTo(0, 0)
      ctx.lineTo(0, 2)
      ctx.stroke()

      points.forEach((p) => {
        const dist = Math.sqrt(p.x * p.x + p.z * p.z)
        const maxDist = 10
        const ratio = Math.min(dist / maxDist, 1)
        const intensity = p.intensity ?? 1
        const alpha = 0.3 + 0.7 * intensity * (1 - ratio)

        ctx.fillStyle = `rgba(${Math.floor(255 * intensity)}, ${Math.floor(
          180 * (1 - ratio),
        )}, 255, ${alpha})`

        const px = p.x
        const py = p.z

        const r = 0.12
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
    }

    resize()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#050709' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          backgroundColor: '#050709',
        }}
      />
    </div>
  )
}

export default TwoDMap

