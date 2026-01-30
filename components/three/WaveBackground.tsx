"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

interface LineWaveProps {
  count?: number
  separation?: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

function LineWave({ count = 25, separation = 0.5, mouse }: LineWaveProps) {
  const linesRef = useRef<THREE.Group>(null)
  
  const linePositions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => (i - count / 2) * separation)
  }, [count, separation])
  
  useFrame((state) => {
    if (!linesRef.current) return
    const time = state.clock.getElapsedTime()
    
    linesRef.current.children.forEach((line, i) => {
      const mesh = line as THREE.Line
      const positions = mesh.geometry.attributes.position.array as Float32Array
      
      for (let j = 0; j < positions.length / 3; j++) {
        const x = positions[j * 3]
        const mouseInfluence = Math.exp(-Math.pow((linePositions[i] - mouse.current.x * 5), 2) / 10)
        positions[j * 3 + 1] = 
          Math.sin(x * 0.5 + time * 2 + i * 0.3) * 0.3 * (1 + mouseInfluence * 0.5) +
          Math.sin(x * 0.3 + time * 1.5) * 0.2
      }
      mesh.geometry.attributes.position.needsUpdate = true
    })
  })
  
  const lines = useMemo(() => {
    return linePositions.map((zPos, i) => {
      const points: THREE.Vector3[] = []
      for (let x = -10; x <= 10; x += 0.2) {
        points.push(new THREE.Vector3(x, 0, zPos))
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      // Cyan gradient colors
      const hue = 0.5 + (i / linePositions.length) * 0.1 // Cyan to teal
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHSL(hue, 0.8, 0.5),
        transparent: true,
        opacity: 0.2 + (i / linePositions.length) * 0.3
      })
      return new THREE.Line(geometry, material)
    })
  }, [linePositions])
  
  return (
    <group ref={linesRef} rotation={[-Math.PI * 0.3, 0, 0]} position={[0, -2, 0]}>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  )
}

// DNA-like helix animation with cyan glow
function HelixSpiral() {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 100
  
  useEffect(() => {
    if (!pointsRef.current) return
    
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 4
      const radius = 1.5
      positions[i * 3] = Math.cos(t) * radius
      positions[i * 3 + 1] = (i / particleCount - 0.5) * 8
      positions[i * 3 + 2] = Math.sin(t) * radius
    }
    
    pointsRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
  }, [])
  
  useFrame((state) => {
    if (!groupRef.current || !pointsRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.2
    
    const posArray = pointsRef.current.geometry.attributes.position?.array as Float32Array
    if (posArray) {
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount) * Math.PI * 4 + time * 0.5
        const radius = 1.5 + Math.sin(time + i * 0.1) * 0.2
        posArray[i * 3] = Math.cos(t) * radius
        posArray[i * 3 + 2] = Math.sin(t) * radius
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <group ref={groupRef} position={[4, 0, -2]}>
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.15}
          color="#00d4ff"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

interface WaveBackgroundProps {
  className?: string
  showHelix?: boolean
}

export default function WaveBackground({ className = '', showHelix = true }: WaveBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-60 ${className}`}>
      <Canvas
        camera={{ position: [0, 3, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        <LineWave mouse={mouse} />
        {showHelix && <HelixSpiral />}
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  )
}
