'use client';

import { AdaptiveDpr, Preload } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════════════
// ✨ PARTICLE FIELD COMPONENT
// High-performance instanced particles with Beryl color scheme
// ═══════════════════════════════════════════════════════════════════════════

interface ParticleFieldProps {
  /** Number of particles */
  count?: number;
  /** Size of particles */
  size?: number;
  /** Spread radius */
  radius?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Color mode */
  colorMode?: 'beryl' | 'violet' | 'white' | 'mixed';
  /** Enable mouse interaction */
  interactive?: boolean;
  /** Particle shape */
  shape?: 'sphere' | 'point';
  /** Depth of field (z-spread) */
  depth?: number;
  /** Opacity */
  opacity?: number;
  /** Additional className for container */
  className?: string;
}

// Beryl color palette
const COLORS = {
  beryl: {
    primary: new THREE.Color('#00f0ff'),
    secondary: new THREE.Color('#00ff9d'),
  },
  violet: {
    primary: new THREE.Color('#7000ff'),
    secondary: new THREE.Color('#b366ff'),
  },
  white: {
    primary: new THREE.Color('#ffffff'),
    secondary: new THREE.Color('#888888'),
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// 🌟 INSTANCED PARTICLES
// ═══════════════════════════════════════════════════════════════════════════

interface ParticlesProps {
  count: number;
  size: number;
  radius: number;
  speed: number;
  colorMode: 'beryl' | 'violet' | 'white' | 'mixed';
  depth: number;
  opacity: number;
}

function Particles({
  count,
  size,
  radius,
  speed,
  colorMode,
  depth,
  opacity,
}: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate particle data once
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Spherical distribution for more natural look
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.5) * radius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = (Math.random() - 0.5) * depth;

      // Animation parameters
      const speedMultiplier = 0.5 + Math.random() * 0.5;
      const phase = Math.random() * Math.PI * 2;
      const floatAmplitude = 0.5 + Math.random() * 1;

      // Size variation
      const sizeVariation = 0.5 + Math.random() * 0.5;

      temp.push({
        position: new THREE.Vector3(x, y, z),
        initialPosition: new THREE.Vector3(x, y, z),
        speedMultiplier,
        phase,
        floatAmplitude,
        sizeVariation,
      });
    }
    return temp;
  }, [count, radius, depth]);

  // Generate colors for each particle
  const colors = useMemo(() => {
    const colorArray = new Float32Array(count * 3);
    const palette = COLORS[colorMode === 'mixed' ? 'beryl' : colorMode];

    for (let i = 0; i < count; i++) {
      let color: THREE.Color;

      if (colorMode === 'mixed') {
        // Mix between all colors
        const mixType = Math.floor(Math.random() * 3);
        if (mixType === 0) {
          color = COLORS.beryl.primary.clone().lerp(COLORS.beryl.secondary, Math.random());
        } else if (mixType === 1) {
          color = COLORS.violet.primary.clone().lerp(COLORS.violet.secondary, Math.random());
        } else {
          color = COLORS.white.primary.clone().lerp(COLORS.white.secondary, Math.random());
        }
      } else {
        // Lerp between primary and secondary
        const t = Math.random();
        color = palette.primary.clone().lerp(palette.secondary, t);
      }

      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    return colorArray;
  }, [count, colorMode]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime * speed;

    particles.forEach((particle, i) => {
      // Floating animation
      const floatY = Math.sin(time * particle.speedMultiplier + particle.phase) * particle.floatAmplitude;
      const floatX = Math.cos(time * particle.speedMultiplier * 0.5 + particle.phase) * particle.floatAmplitude * 0.3;

      dummy.position.set(
        particle.initialPosition.x + floatX,
        particle.initialPosition.y + floatY,
        particle.initialPosition.z
      );

      // Subtle rotation
      dummy.rotation.z = time * 0.1 * particle.speedMultiplier;

      // Size pulsing
      const scale = size * particle.sizeVariation * (0.9 + Math.sin(time * 2 + particle.phase) * 0.1);
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial
        transparent
        opacity={opacity}
        vertexColors
        toneMapped={false}
      >
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </meshBasicMaterial>
    </instancedMesh>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌌 POINT PARTICLES (Alternative - Even better performance)
// ═══════════════════════════════════════════════════════════════════════════

interface PointParticlesProps {
  count: number;
  size: number;
  radius: number;
  speed: number;
  colorMode: 'beryl' | 'violet' | 'white' | 'mixed';
  depth: number;
  opacity: number;
}

function PointParticles({
  count,
  size,
  radius,
  speed,
  colorMode,
  depth,
  opacity,
}: PointParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate positions and metadata
  const { positions, colors, metadata } = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const meta: Array<{ phase: number; speed: number; amplitude: number }> = [];

    const palette = COLORS[colorMode === 'mixed' ? 'beryl' : colorMode];

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.5) * radius;

      posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = (Math.random() - 0.5) * depth;

      // Colors
      let color: THREE.Color;
      if (colorMode === 'mixed') {
        const mixType = Math.floor(Math.random() * 3);
        if (mixType === 0) {
          color = COLORS.beryl.primary.clone().lerp(COLORS.beryl.secondary, Math.random());
        } else if (mixType === 1) {
          color = COLORS.violet.primary.clone().lerp(COLORS.violet.secondary, Math.random());
        } else {
          color = COLORS.white.primary.clone().lerp(COLORS.white.secondary, Math.random());
        }
      } else {
        color = palette.primary.clone().lerp(palette.secondary, Math.random());
      }

      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;

      // Animation metadata
      meta.push({
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
        amplitude: 0.3 + Math.random() * 0.7,
      });
    }

    return { positions: posArray, colors: colorArray, metadata: meta };
  }, [count, radius, depth, colorMode]);

  // Store initial positions for animation
  const initialPositions = useMemo(() => new Float32Array(positions), [positions]);

  // Animation
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime * speed;
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const meta = metadata[i];
      const floatY = Math.sin(time * meta.speed + meta.phase) * meta.amplitude;
      const floatX = Math.cos(time * meta.speed * 0.5 + meta.phase) * meta.amplitude * 0.3;

      posAttr.array[i * 3] = initialPositions[i * 3] + floatX;
      posAttr.array[i * 3 + 1] = initialPositions[i * 3 + 1] + floatY;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        transparent
        opacity={opacity}
        vertexColors
        sizeAttenuation
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎬 SCENE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface SceneProps {
  count: number;
  size: number;
  radius: number;
  speed: number;
  colorMode: 'beryl' | 'violet' | 'white' | 'mixed';
  shape: 'sphere' | 'point';
  depth: number;
  opacity: number;
}

function Scene({
  count,
  size,
  radius,
  speed,
  colorMode,
  shape,
  depth,
  opacity,
}: SceneProps) {
  return (
    <>
      {/* Ambient light for sphere particles */}
      {shape === 'sphere' && <ambientLight intensity={1} />}

      {/* Particles */}
      {shape === 'sphere' ? (
        <Particles
          count={count}
          size={size}
          radius={radius}
          speed={speed}
          colorMode={colorMode}
          depth={depth}
          opacity={opacity}
        />
      ) : (
        <PointParticles
          count={count}
          size={size * 20} // Points need larger size
          radius={radius}
          speed={speed}
          colorMode={colorMode}
          depth={depth}
          opacity={opacity}
        />
      )}

      {/* Performance optimization */}
      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🖼️ MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export function ParticleField({
  count = 500,
  size = 1,
  radius = 10,
  speed = 0.3,
  colorMode = 'beryl',
  interactive = false,
  shape = 'point',
  depth = 20,
  opacity = 0.8,
  className = '',
}: ParticleFieldProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          background: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          <Scene
            count={count}
            size={size}
            radius={radius}
            speed={speed}
            colorMode={colorMode}
            shape={shape}
            depth={depth}
            opacity={opacity}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌠 HERO PARTICLE FIELD
// Pre-configured for hero sections
// ═══════════════════════════════════════════════════════════════════════════

export function HeroParticleField() {
  return (
    <ParticleField
      count={800}
      size={1.2}
      radius={15}
      speed={0.2}
      colorMode="beryl"
      shape="point"
      depth={30}
      opacity={0.6}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔮 DENSE PARTICLE FIELD
// For sections needing more visual density
// ═══════════════════════════════════════════════════════════════════════════

export function DenseParticleField() {
  return (
    <ParticleField
      count={1500}
      size={0.8}
      radius={12}
      speed={0.4}
      colorMode="mixed"
      shape="point"
      depth={25}
      opacity={0.5}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 💜 VIOLET PARTICLE FIELD
// For violet-accented sections
// ═══════════════════════════════════════════════════════════════════════════

export function VioletParticleField() {
  return (
    <ParticleField
      count={600}
      size={1}
      radius={12}
      speed={0.25}
      colorMode="violet"
      shape="point"
      depth={20}
      opacity={0.7}
    />
  );
}

export default ParticleField;
