import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple Brain Particles Component
const BrainParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);
  
  const { positions, brainConnections } = useMemo(() => {
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const connections: Array<[THREE.Vector3, THREE.Vector3]> = [];
    
    // Generate brain-like structure on the right side
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 1.2 + Math.random() * 0.8;
      
      // Position brain on right side
      const x = 3 + radius * Math.sin(theta) * Math.cos(phi) * 0.7;
      const y = radius * Math.sin(theta) * Math.sin(phi) * 0.8;
      const z = radius * Math.cos(theta) * 0.5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Create some connections
      if (i > 0 && Math.random() > 0.8) {
        const prevIndex = Math.floor(Math.random() * i);
        connections.push([
          new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
          new THREE.Vector3(positions[prevIndex * 3], positions[prevIndex * 3 + 1], positions[prevIndex * 3 + 2])
        ]);
      }
    }
    
    return { positions, brainConnections: connections };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      
      // Animate positions slightly
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArray.length; i += 3) {
        posArray[i + 2] += Math.sin(time * 2 + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Brain particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#9d4edd"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
      
      {/* Brain connections */}
      <group ref={linesRef}>
        {brainConnections.slice(0, 30).map((connection, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  connection[0].x, connection[0].y, connection[0].z,
                  connection[1].x, connection[1].y, connection[1].z
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#9d4edd" transparent opacity={0.3} />
          </line>
        ))}
      </group>
    </group>
  );
};

// Data Flow Particles
const DataFlow = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = -6 + Math.random() * 2; // Start from left
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += delta * (0.5 + Math.random() * 0.5); // Move right
        
        // Reset particle when it reaches the brain
        if (pos[i3] > 5) {
          pos[i3] = -6 + Math.random() * 2;
          pos[i3 + 1] = (Math.random() - 0.5) * 6;
          pos[i3 + 2] = (Math.random() - 0.5) * 3;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff6b6b"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
};

// Neural Network on Left
const NeuralNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, connections } = useMemo(() => {
    const nodeCount = 40;
    const pos = new Float32Array(nodeCount * 3);
    const conn: Array<[THREE.Vector3, THREE.Vector3]> = [];
    
    // Create layered network on left side
    const layers = [8, 12, 8, 6];
    let nodeIndex = 0;
    
    layers.forEach((layerSize, layerIdx) => {
      const x = -5 + layerIdx * 1.5;
      for (let i = 0; i < layerSize; i++) {
        const y = (i - layerSize / 2) * 1.2;
        const z = (Math.random() - 0.5) * 2;
        
        pos[nodeIndex * 3] = x;
        pos[nodeIndex * 3 + 1] = y;
        pos[nodeIndex * 3 + 2] = z;
        
        // Connect to some previous layer nodes
        if (layerIdx > 0 && Math.random() > 0.4) {
          const prevLayerStart = layers.slice(0, layerIdx).reduce((sum, size) => sum + size, 0);
          const prevLayerSize = layers[layerIdx - 1];
          const connectTo = prevLayerStart + Math.floor(Math.random() * prevLayerSize);
          
          if (connectTo < nodeIndex) {
            conn.push([
              new THREE.Vector3(pos[nodeIndex * 3], pos[nodeIndex * 3 + 1], pos[nodeIndex * 3 + 2]),
              new THREE.Vector3(pos[connectTo * 3], pos[connectTo * 3 + 1], pos[connectTo * 3 + 2])
            ]);
          }
        }
        
        nodeIndex++;
      }
    });
    
    return { positions: pos, connections: conn };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 2] = Math.sin(time * 2 + i) * 0.05;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ffff"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
      
      {connections.slice(0, 25).map((connection, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                connection[0].x, connection[0].y, connection[0].z,
                connection[1].x, connection[1].y, connection[1].z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00ffff" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
};

// Main Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      
      <NeuralNetwork />
      <DataFlow />
      <BrainParticles />
    </>
  );
};

const NeuralNetworkBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkBackground;