'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

function FloatingShape({ position, color, children }: any) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })
  return (
    <mesh ref={ref} position={position}>
      {children}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.3}
      />
    </mesh>
  )
}

export default function FullstackScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.6} color="#00c6ff" />

        {/* Shapes — representing stack layers */}
        <FloatingShape position={[-3, 0, 0]} color="#0070f3">
          <boxGeometry args={[1.2, 1.2, 1.2]} />
        </FloatingShape>

        <FloatingShape position={[2, 1, -2]} color="#00ffb3">
          <sphereGeometry args={[0.9, 32, 32]} />
        </FloatingShape>

        <FloatingShape position={[0, -2, 1]} color="#9b5de5">
          <torusGeometry args={[1, 0.3, 16, 100]} />
        </FloatingShape>

        <FloatingShape position={[3, -1, 2]} color="#ff6b6b">
          <octahedronGeometry args={[1, 0]} />
        </FloatingShape>

        <FloatingShape position={[-2, 2, -1]} color="#feca57">
          <coneGeometry args={[0.8, 1.8, 32]} />
        </FloatingShape>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  )
}
