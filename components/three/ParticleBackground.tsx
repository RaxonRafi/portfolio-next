"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

interface ParticlesProps {
  count?: number
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

// Subtle floating particles
function Particles({ count = 800, mouse }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  
  useEffect(() => {
    if (!mesh.current) return
    
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 80
      positions[i3 + 1] = (Math.random() - 0.5) * 60
      positions[i3 + 2] = (Math.random() - 0.5) * 40 - 20
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    mesh.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    mesh.current.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  }, [count])
  
  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.getElapsedTime()
    
    // Subtle rotation
    mesh.current.rotation.y = time * 0.02
    
    // Mouse parallax
    mesh.current.position.x += (mouse.current.x * viewport.width * 0.05 - mesh.current.position.x) * 0.01
    mesh.current.position.y += (mouse.current.y * viewport.height * 0.05 - mesh.current.position.y) * 0.01
  })
  
  return (
    <points ref={mesh}>
      <bufferGeometry />
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

// Neon glowing frame/box - like in Framer Awards
function NeonFrame({ 
  position, 
  size = [4, 3, 0.1], 
  rotation = [0, 0, 0],
  color = "#00a8ff",
  glowIntensity = 0.8
}: { 
  position: [number, number, number]
  size?: [number, number, number]
  rotation?: [number, number, number]
  color?: string
  glowIntensity?: number
}) {
  const frameRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!frameRef.current) return
    const time = state.clock.getElapsedTime()
    frameRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3) * 0.05
    frameRef.current.rotation.y = rotation[1] + time * 0.1
    frameRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3
  })
  
  // Create frame edges
  const edges = useMemo(() => {
    const thickness = 0.04
    const [w, h, d] = size
    return [
      // Horizontal edges
      { pos: [0, h/2, d/2], scale: [w, thickness, thickness] },
      { pos: [0, h/2, -d/2], scale: [w, thickness, thickness] },
      { pos: [0, -h/2, d/2], scale: [w, thickness, thickness] },
      { pos: [0, -h/2, -d/2], scale: [w, thickness, thickness] },
      // Vertical edges
      { pos: [w/2, 0, d/2], scale: [thickness, h, thickness] },
      { pos: [-w/2, 0, d/2], scale: [thickness, h, thickness] },
      { pos: [w/2, 0, -d/2], scale: [thickness, h, thickness] },
      { pos: [-w/2, 0, -d/2], scale: [thickness, h, thickness] },
      // Depth edges
      { pos: [w/2, h/2, 0], scale: [thickness, thickness, d] },
      { pos: [-w/2, h/2, 0], scale: [thickness, thickness, d] },
      { pos: [w/2, -h/2, 0], scale: [thickness, thickness, d] },
      { pos: [-w/2, -h/2, 0], scale: [thickness, thickness, d] },
    ]
  }, [size])
  
  return (
    <group ref={frameRef} position={position}>
      {edges.map((edge, i) => (
        <mesh key={i} position={edge.pos as [number, number, number]} scale={edge.scale as [number, number, number]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={glowIntensity}
          />
        </mesh>
      ))}
      {/* Inner glow plane */}
      <mesh>
        <planeGeometry args={[size[0] * 0.95, size[1] * 0.95]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Large floating rectangle frame
function FloatingFrames() {
  return (
    <>
      {/* Main large frame - front left */}
      <NeonFrame 
        position={[-8, 0, -5]} 
        size={[6, 4, 0.3]} 
        rotation={[0.2, 0.3, 0.1]}
        color="#0066ff"
        glowIntensity={0.9}
      />
      
      {/* Secondary frame - right */}
      <NeonFrame 
        position={[10, 2, -8]} 
        size={[5, 3.5, 0.25]} 
        rotation={[-0.1, -0.4, 0.05]}
        color="#00aaff"
        glowIntensity={0.7}
      />
      
      {/* Small frame - bottom */}
      <NeonFrame 
        position={[0, -5, -10]} 
        size={[4, 3, 0.2]} 
        rotation={[0.3, 0.1, -0.1]}
        color="#0088ff"
        glowIntensity={0.6}
      />
      
      {/* Background frame - far */}
      <NeonFrame 
        position={[-5, 4, -15]} 
        size={[8, 5, 0.4]} 
        rotation={[0.1, 0.2, 0]}
        color="#0044ff"
        glowIntensity={0.4}
      />
    </>
  )
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!mounted) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Particles count={600} mouse={mouse} />
        <FloatingFrames />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}
