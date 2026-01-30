"use client"

import { Float, MeshDistortMaterial } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

interface AnimatedShapeProps {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
  speed: number
  distort: number
  shape: 'sphere' | 'torus' | 'octahedron' | 'dodecahedron' | 'torusKnot'
}

function AnimatedShape({ position, rotation, scale, color, speed, distort, shape }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = rotation[0] + time * speed * 0.5
    meshRef.current.rotation.y = rotation[1] + time * speed * 0.3
    meshRef.current.rotation.z = rotation[2] + time * speed * 0.2
  })
  
  const geometry = useMemo(() => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 32]} />
      case 'octahedron':
        return <octahedronGeometry args={[1]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1]} />
      case 'torusKnot':
        return <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
      default:
        return <sphereGeometry args={[1, 32, 32]} />
    }
  }, [shape])
  
  return (
    <Float
      speed={speed * 2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.5}
          distort={distort}
          speed={speed}
          wireframe
        />
      </mesh>
    </Float>
  )
}

// Glowing ring effect - cyan theme
function GlowingRing({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.getElapsedTime()
    ringRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
    ringRef.current.rotation.y = time * 0.2
  })
  
  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[2, 0.03, 16, 100]} />
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

interface FloatingShapesCanvasProps {
  variant?: 'hero' | 'section' | 'minimal'
  className?: string
}

export default function FloatingShapes({ variant = 'section', className = '' }: FloatingShapesCanvasProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const shapes = useMemo(() => {
    // Cyan/teal color palette for black theme
    const baseShapes: AnimatedShapeProps[] = [
      {
        position: [-4, 2, -3],
        rotation: [0, 0, 0],
        scale: 0.8,
        color: '#00d4ff',
        speed: 0.5,
        distort: 0.3,
        shape: 'sphere'
      },
      {
        position: [4, -1, -2],
        rotation: [1, 0, 0],
        scale: 0.6,
        color: '#00ffcc',
        speed: 0.7,
        distort: 0.2,
        shape: 'octahedron'
      },
      {
        position: [0, 3, -4],
        rotation: [0, 1, 0],
        scale: 0.5,
        color: '#00aaff',
        speed: 0.6,
        distort: 0.4,
        shape: 'dodecahedron'
      },
      {
        position: [-3, -2, -3],
        rotation: [0.5, 0.5, 0],
        scale: 0.7,
        color: '#00e5ff',
        speed: 0.4,
        distort: 0.25,
        shape: 'torus'
      },
      {
        position: [3, 2, -5],
        rotation: [0, 0, 1],
        scale: 0.4,
        color: '#00ffd5',
        speed: 0.8,
        distort: 0.35,
        shape: 'torusKnot'
      }
    ]
    
    if (variant === 'minimal') {
      return baseShapes.slice(0, 2)
    }
    if (variant === 'hero') {
      return baseShapes
    }
    return baseShapes.slice(0, 3)
  }, [variant])
  
  if (!mounted) return null
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00d4ff" />
        
        {shapes.map((shape, index) => (
          <AnimatedShape key={index} {...shape} />
        ))}
        
        {variant === 'hero' && (
          <>
            <GlowingRing position={[0, 0, -6]} />
            <GlowingRing position={[-2, 1, -8]} />
          </>
        )}
      </Canvas>
    </div>
  )
}
