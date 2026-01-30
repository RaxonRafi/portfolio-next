"use client"

import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

// Animated gradient sphere - cyan theme
function GradientSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00a8cc"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

// Orbiting particles around the sphere
function OrbitingParticles() {
  const groupRef = useRef<THREE.Group>(null)
  const particleCount = 50
  
  const particleData = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      radius: 2 + Math.random() * 1.5,
      speed: 0.3 + Math.random() * 0.7,
      offset: Math.random() * Math.PI * 2,
      y: (Math.random() - 0.5) * 2,
      size: 0.02 + Math.random() * 0.04
    }))
  }, [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.children.forEach((particle, i) => {
      const mesh = particle as THREE.Mesh
      const data = particleData[i]
      const angle = time * data.speed + data.offset
      mesh.position.x = Math.cos(angle) * data.radius
      mesh.position.z = Math.sin(angle) * data.radius
      mesh.position.y = data.y + Math.sin(time * 2 + data.offset) * 0.3
    })
  })
  
  return (
    <group ref={groupRef}>
      {particleData.map((data, i) => (
        <mesh key={i}>
          <sphereGeometry args={[data.size, 8, 8]} />
          <meshBasicMaterial 
            color="#00d4ff"
            transparent 
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// Connecting lines between particles
function ConnectingLines() {
  const lineRef = useRef<THREE.LineSegments>(null)
  
  const lineObject = useMemo(() => {
    const pointCount = 20
    const positions = new Float32Array(pointCount * 3)
    
    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2
      const radius = 2.5
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    
    const indices: number[] = []
    for (let i = 0; i < pointCount; i++) {
      indices.push(i, (i + 1) % pointCount)
      if (i < pointCount - 2) {
        indices.push(i, (i + 3) % pointCount)
      }
    }
    
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setIndex(indices)
    
    const material = new THREE.LineBasicMaterial({
      color: "#00d4ff",
      transparent: true,
      opacity: 0.3
    })
    
    return new THREE.LineSegments(geometry, material)
  }, [])
  
  useFrame((state) => {
    if (!lineRef.current) return
    const time = state.clock.getElapsedTime()
    lineRef.current.rotation.y = time * 0.1
    lineRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
  })
  
  return <primitive ref={lineRef} object={lineObject} />
}

interface AnimatedGlobeProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function AnimatedGlobe({ className = '', size = 'md' }: AnimatedGlobeProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-72 h-72',
    lg: 'w-96 h-96'
  }
  
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#00ffcc" />
        
        <Suspense fallback={null}>
          <GradientSphere />
          <OrbitingParticles />
          <ConnectingLines />
        </Suspense>
      </Canvas>
    </div>
  )
}
